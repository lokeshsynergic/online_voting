const LoginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const moment = require("moment");
const { db_Select,db_Insert,db_Select_using_param } = require("../modules/MasterModule");

LoginRouter.get("/login", (req, res) => {
  res.render("login/login");
});

    LoginRouter.post("/logincheck_19112025", async (req, res) => {
      var data = req.body,
        result;
      var ip = req.clientIp;
      var date_ob = moment();
      var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
      var select = "*",
        table_name = "md_user",
        // Use a placeholder for `user_id` in the `whr` clause
        whr = "user_id = ? AND user_status = ?",
        order = null;
      var params = [data.user_id, "A"];
      var res_dt = await db_Select_using_param(
        select,
        table_name,
        whr,
        order,
        params,
      );
      var captchaInput = req.body.captchaInput
      // Pass user_id and 'A' (for active status) as parameters to bind to the placeholders
      if (captchaInput == req.session.captcha) {
    
      if (res_dt.suc > 0) {
            if (res_dt.msg.length > 0) {
                if (await bcrypt.compare(data.password, res_dt.msg[0].password)) {
                    req.session.range_name_for_topbar = "Head Office";
                  
                  const sessionId = req.sessionID;
                  res_dt.msg[0]['session_version_id']= sessionId
                  req.session.user = res_dt.msg[0];
                  var save_data = await db_Insert("md_user", `session_version_id='${sessionId}'`, null, `user_id ='${data.user_id}'`, 1);
                var logfields = `(operation_unique_id,operation_type,operation_module,operation,created_by,created_at,created_ip)`;
                var logvalues = `('${sessionId}','L','U','Login','${data.user_id}','${formattedDate}','${ip}')`;
              //  var save_log = await db_Insert("td_log", logfields, logvalues, null, 0);
                
                  res.redirect("/dashn/dash");
                } else {
                  result = {
                    suc: 0,
                    msg: "Please check your userid or password",
                    dt: res_dt,
                  };
                  // res.send(result)
                  req.session.errorMsg = "Please check your userid or password";
                  res.redirect(
                    "/login?error=true&msg=Please check your userid or password",
                  );
                }
              } else {
                //  result = { suc: 0, msg: "No data found", dt: res_dt };
                req.session.errorMsg = "Please check your userid or password";
                res.redirect(
                  "/login?error=true&msg=Please check your userid or password",
                );
              }
          } else {
            // result = { suc: 0, msg: res_dt.msg, dt: res_dt };
            req.session.errorMsg = "Please check your userid or password";
            res.redirect("/login?error=true&msg=Please check your userid or password");
          }
        }else {
          res.redirect("/login?error=true&msg=CAPTCHA verification failed");
        }
      
    });


  LoginRouter.post("/logincheck", async (req, res) => {
    try {

      const data = req.body;
      const captchaInput = data.captchaInput;
      if (captchaInput !== req.session.captcha) {
        console.log(captchaInput, req.session.captcha);
        return res.json({ suc: 0, msg: "CAPTCHA verification failed" });
      }

      const select = "*",
        table_name = "md_user",
        whr = "user_id = ? AND user_status = ?",
        params = [data.user_id, "A"];

      const res_dt = await db_Select_using_param(select, table_name, whr, null, params);

      if (res_dt.suc <= 0 || res_dt.msg.length === 0) {
        return res.json({ suc: 0, msg: "Please check your userid or password" });
      }

      const user = res_dt.msg[0];

      if (!(await bcrypt.compare(data.password, user.password))) {
        return res.json({ suc: 0, msg: "Please check your userid or password" });
      }

      // SUCCESS
      const sessionId = req.sessionID;
      user.session_version_id = sessionId;
      req.session.user = user;

      await db_Insert("md_user", `session_version_id='${sessionId}'`, null, `user_id ='${data.user_id}'`, 1);

      var date_ob = moment();
      var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
      var ip = req.clientIp;

      var logfields = `(operation_unique_id,operation_type,operation_module,operation,created_by,created_at,created_ip)`;
      var logvalues = `('${sessionId}','L','U','Login','${data.user_id}','${formattedDate}','${ip}')`;
      await db_Insert("td_log", logfields, logvalues, null, 0);

      return res.json({ suc: 1, msg: "Login successful" });

    } catch (error) {
      console.error(error);
      res.json({ suc: 0, msg: "Internal server error" });
    }
  });


module.exports = { LoginRouter };
