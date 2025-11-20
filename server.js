const express = require("express"),
  session = require("express-session"),
  app = express(),
  expressLayouts = require("express-ejs-layouts"),
  path = require("path"),
  https = require("http"),
  fs = require("fs"),
  cors = require("cors"),
  port = process.env.PORT || 3013;
const flash = require("connect-flash");
const requestIp = require('request-ip');
const moment = require("moment");
const logger = require('./logger'); 
const bcrypt = require("bcrypt");
const socketIo = require("socket.io");
const MemoryStore = require('express-session').MemoryStore;
const { db_Select,db_Insert } = require("./modules/MasterModule");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SET VIEW ENGINE AND PATH //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.use(requestIp.mw());
app.set("layout", "templates/layout");

// SET ASSETS AS A STATIC PATH //
app.use(express.static(path.join(__dirname, "assets/")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//app.set("trust proxy", 1);
// Set up the session middleware
app.use(
  session({
    secret: "WB_CB_OFF_LTD", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000         // Only send over HTTPS
   
     }
  }),
);
app.use((err, req, res, next) => {
  logger.error(err); // log the error
  res.status(500).send('Internal Server Error');
});


var server = https.createServer(app);

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.path = req.path;
  res.locals.message = req.session.message;

  //   Code for Flash Message
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  //req.io = io;
  delete req.session.message;
  res.set('Cache-Control', 'no-store');
  next();
});

async function checkUserFlow(req, res, next) {
    if (!req.session.user) return res.redirect('/login');

    try {

        const result = await db_Select("must_change_password, must_update_profile, security_answered", "md_user",`id = '${req.session.user.id}'`, null,null);
        const rows = result.msg[0];
        console.log(rows);
       // 1️⃣ Force password change first
        if (rows.must_change_password == 0) {
          console.log("Redirecting to password change...");
          return res.redirect("/wdtls/changepass");
         }

        // // 2️⃣ After password → profile (image + security)
        if (rows.must_update_profile == 0) {
            return res.redirect('/wdtls/editprofile');
        }

        // // 3️⃣ Optional: Force security Q
        if (rows.security_answered == 0) {
            return res.redirect('/wdtls/sec_registration');
        }

        // If all conditions done → allow access
        next();

    } catch (err) {
        console.error(err);
        return res.redirect('/login');
    }
}


//const { DashboardRouter } = require("./router/dashboardRouter");
const { DashboardnRouter } = require("./router/dashboardnRouter");
const { LoginRouter } = require("./router/loginRouter");

const { WdtlsRouter } = require("./router/WdtlsRouter");
// const { reportRouter } = require("./router/reportRouter");
const { Cronjobrouter } = require("./router/cronjobrouter");
const { validateSession } = require("./middleware/authMiddleware");
const { checkUserInput } = require("./middleware/chekUserInputMiddleware");

app.use("/login", LoginRouter);

app.use("/dashn", validateSession,checkUserFlow,checkUserInput, DashboardnRouter);

app.use("/wdtls", validateSession, (req, res, next) => {

    const bypassRoutes = [
        "/changepass",
        "/editprofile",
        "/sec_registration"
    ];

    if (bypassRoutes.includes(req.path)) {
        return next();
    }

    return checkUserFlow(req, res, next);

}, checkUserInput, WdtlsRouter);
//app.use("/report",validateSession,checkUserInput, reportRouter);
app.use("/crn", Cronjobrouter);


app.get("/dashboard", async (req, res) => {
  var res_dt = {
    user_data: req.session.user,
  };
  var user = req.session.user;

  if (user) {
    res.redirect("dash/dashboard");
  } else {
    res.redirect("/login");
  }
});

function generateCaptcha() {
  const length = 4;  // Length of CAPTCHA
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let captcha = '';
  // Ensure that the CAPTCHA has at least one letter
  let hasLetter = false;
  // Generate the CAPTCHA
  for (let i = 0; i < length; i++) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    captcha += randomChar;
    if (/[a-zA-Z]/.test(randomChar)) { // Check if the character is a letter
      hasLetter = true;
    }
  }

  return captcha;
}
app.get("/login", (req, res) => {
  //const captchaNumber = Math.floor(1000 + Math.random() * 9000);
  const captchaNumber = generateCaptcha();
  // Store the CAPTCHA number in the session for later validation
  req.session.captcha = captchaNumber;
  console.log(req.session.captcha);
  // Render the login page and pass the CAPTCHA image data to the view
  res.render("login/login", { captcha: captchaNumber });
});
app.get("/logout", async (req, res) => {
  var ip = req.clientIp;
  var date_ob = moment();
  var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
  if (req.session.user) {
  var user_id = req.session.user.user_id;
  var save_data = await db_Insert("md_user", `session_version_id='NULL'`, null, `user_id ='${user_id}'`, 1);
  }
  req.session.destroy();
  res.redirect("/login");
});
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("*", function (req, res) {
  res.redirect("404");
});


// Catch unhandled exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  // Don't call process.exit(1) if you want the app to stay running
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't call process.exit(1)
});

server.listen(port, (err) => {
 var pass = bcrypt.hashSync('1234', 10);
  if (err) throw err;
  else console.log(`App is running at port ${port}`);
   
  console.log(pass);
});
