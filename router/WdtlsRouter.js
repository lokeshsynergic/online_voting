const WdtlsRouter = require("express").Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const pdfParse = require("pdf-parse");


const bcrypt = require("bcrypt");
const fs = require("fs");
const {
  db_Select,
  db_Insert,
  db_Delete,
  SendNotification,
} = require("../modules/MasterModule");

const {smallEncrypt, smallDecrypt,encrypt} = require("../helper/helper");
const { chkUserIputFunc } = require("../middleware/chekUserInputMiddleware");
WdtlsRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

   WdtlsRouter.get("/candidatelist", async (req, res) => {
        try {
          const voter_id = req.session.user.id;
          const election_id = 1;  // if you store it in session

          // 1. Check if user already voted
          const voteCheck = await db_Select(
            "*", 
            "td_voter_status", 
            `election_id = ${election_id} AND voter_id = ${voter_id}`, 
            null
          );

          if (voteCheck.suc > 0 && voteCheck.msg.length > 0) {
            // User has voted
            return res.render("candidate/vote", {
              voted: true,          // send flag to view
              data: []              // no candidates
            });
          }

          // 2. User has NOT voted → Show candidate list
          var select = `a.*`;
          var table = `md_user a`;
          const where = `a.elec_status = 1`;

          const userlist = await db_Select(select, table, where, null);

          res.render("candidate/vote", {
            voted: false,           // send flag to view
            data: userlist.suc > 0 ? userlist.msg : [],
          });

        } catch (error) {
          console.error("Error during candidate list:", error);
          return res.render("candidate/faqlist");
        }
  });


 WdtlsRouter.get("/cand_vote_rec", async (req, res) => {
  try {
      var select = `a.id,a.user_id,a.user_name,a.user_email,COUNT(b.candidate_id) AS total_vote`;
      var table = `md_user a LEFT JOIN td_votes b ON a.id = b.candidate_id GROUP BY a.id`;
      const userlist = await db_Select(select, table, null, null);
      // Prepare data for rendering
      const res_dt = {
        data: userlist.suc > 0 ? userlist.msg : "",
      };
      res.render("candidate/candidate_vote_gain", res_dt);
    } catch (error) {
        // Log the error and send an appropriate response
        console.error("Error during dashboard rendering:", error);
        res.render("candidate/faqlist");
    }
});

WdtlsRouter.post("/savevote", async (req, res) => {
  try {
    const selectedUsers = req.body.selected_users;  // array of user IDs
    const election_id = 1;       // coming from hidden input or backend
    const user = req.session.user;
    const ip = '0000.0000.0000';

    const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

    // If nothing selected
    if (!selectedUsers || selectedUsers.length === 0) {
      return res.send("Please select at least one user to vote.");
    }

    // === INSERT MULTIPLE VOTES === //
    for (let candidate_id of selectedUsers) {

      const table = "td_votes";

      const fields = `(election_id, voter_id_enc, candidate_id, created_at, created_ip)`;

      // candidate_id can come from backend or req.body
      const values = `(
        '${election_id}',
        '${smallEncrypt(user.id)}',
        '${candidate_id}',
        '${formattedDate}',
        '${ip}'
      )`;

      await db_Insert(table, fields, values, null, 0);
    }
    // === INSERT VOTER STATUS === //
     const vote_fields = `(election_id, voter_id, has_voted, vote_dttime)`;
     const vote_values = `('${election_id}', '${user.id}', 1, '${formattedDate}')`;
     var vote_status = await db_Insert('td_voter_status', vote_fields, vote_values, null, 0);
    res.redirect("/wdtls/candidatelist");

  } catch (error) {
    console.error("Error saving vote:", error);
    res.status(500).send("Error saving votes.");
  }
});


  ////     ********  Code start for User Management      *******   ///
  WdtlsRouter.get("/sec_registration", async (req, res) => {
    try {
         const user_id = req.session.user.user_id;

          var select = `*`;
          var table = `md_security_questions`;
          const questionlist = await db_Select(select, table, null, null);
          // Prepare data for rendering
          const res_dt = {
            data: questionlist.suc > 0 ? questionlist.msg : "",
          };
         res.render("security_reg/question_ans", res_dt);
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
      //res.status(500).send('An error occurred while loading the dashboard.');
      res.render("security_reg/faqlist");
    }
  });

  WdtlsRouter.post("/sec_registration", async (req, res) => {
     try {
       
        const {  answer1, answer2, answer3 } = req.body;
        const user_id = req.session.user.user_id;
        if ( !answer1 || !answer2 || !answer3) {
            return res.status(400).json({ message: "All fields required" });
        }
        const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
        // Normalize before hash
        const a1 = answer1.trim().toLowerCase();
        const a2 = answer2.trim().toLowerCase();
        const a3 = answer3.trim().toLowerCase();
        const ans_enc_key = 10;

        const ans1Hash = encrypt(a1);
        const ans2Hash = encrypt(a2);
        const ans3Hash = encrypt(a3);

       
       const table = "td_security_answers";
       const fields = `(user_id, answer1_hash, answer2_hash, answer3_hash, answered_at)`;
       const values = `('${user_id}','${ans1Hash}','${ans2Hash}','${ans3Hash}','${formattedDate}')`;

       var result = await db_Insert(table, fields, values, null, 0);

       
      console.log('--------------------------hdsjahdahs------------------sbada');
       if(result.suc == 1){
           const fields = `security_answered=1 `;
           const values = null;
           const whr = `user_id='${user_id}'`;
           await db_Insert('md_user', fields, values, whr, 1);
       }
      // console.log(result);
        //  req.session.user.security_answered = 1;
          const res_dt = {
              page: 1,
              success_msg : 'Security answers saved successfully',
              error_msg : ''
              
            };

    
      res.redirect("/dashn/dash");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
  });
WdtlsRouter.get("/adddoc", async (req, res) => {
  try {
    // Extract range_id from session
    const soc_id = req.query.id;
    const range_id = req.session.user.range_id;
    const doctyperes = await db_Select("*", "md_document", null, null);
    // Prepare data for rendering
    var res_dt = {
      doctypelist: doctyperes.suc > 0 ? doctyperes.msg : "",
    };
    const rootDirectory = path.join(__dirname, '..', 'uploads');
    console.log(rootDirectory);
    // Render the view with data
    res.render("websitedtls/doc/add_doc", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});

WdtlsRouter.get("/doclist_for_approve", async (req, res) => {
  try {
    // Extract range_id from session
    const doclist = await db_Select(
      "a.*,b.doc_type as doc_type_name",
      "td_document_upload a,md_document b",
      `a.doc_type = b.doc_type_id`,
      null,
    );
    // Prepare data for rendering
    const res_dt = {
      data: doclist.suc > 0 ? doclist.msg : "",
    };
    res.render("websitedtls/doc/document_list_for_approve", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("websitedtls/doc/document_list");
  }
});
WdtlsRouter.get("/doc_for_approve", async (req, res) => {
  try {
    // Extract range_id from session
    var id = req.query.id;
    var whr = `id=${id}`;
    const doclist = await db_Select("*", "td_document_upload", whr, null);
    // Prepare data for rendering
    const res_dt = {
      data: doclist.suc > 0 ? doclist.msg[0] : "",
    };
    res.render("websitedtls/doc/document_for_approve", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("websitedtls/doc/document_list");
  }
});
WdtlsRouter.get("/doc_for_view", async (req, res) => {
  try {
    // Extract range_id from session
    var id = req.query.id;
    var whr = `id=${id}`;
    const doclist = await db_Select("*", "td_document_upload", whr, null);
    // Prepare data for rendering
    const res_dt = {
      data: doclist.suc > 0 ? doclist.msg[0] : "",
    };
    res.render("websitedtls/doc/document_for_view", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("websitedtls/doc/document_list");
  }
});
WdtlsRouter.get("/deldock", async (req, res) => {
  try {
    var data = req.body;
    var id = req.query.id,
      doc_type = req.query.doc_type;
    var where = `id = '${id}' `;
    const filename = req.query.file;
    if (doc_type == 1) {
      var filePath = path.join(__dirname, "uploads/notifications/", filename);
    } else if (doc_type == 2) {
      var filePath = path.join(__dirname, "uploads/tenders/", filename);
    } else if (doc_type == 3) {
      var filePath = path.join(__dirname, "uploads/announcement/", filename);
    } else {
      var filePath = path.join(__dirname, "uploads/downloads/", filename);
    }
    console.log(doc_type);
    fs.unlink(filePath, (err) => {
      // if (err) {
      //     console.error('Error deleting file:', err);
      //     return res.status(500).send('Error deleting file');
      // }
      // res.redirect('/');
    });
    var res_dt = await db_Delete("td_document_upload", where);
    res.redirect("/wdtls/doclist");
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    res.redirect("/wdtls/doclist");
  }
});

WdtlsRouter.post("/approve_document", async (req, res) => {
  try {
    // Extract range_id from session
    var user_id = req.session.user.user_id;
    var date_ob = moment();
    // Format it as YYYY-MM-DD HH:mm:ss
    var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
    //   ********   Code For Getting Ip   *********   //
    // var ipresult = await fetchIpData();
    // var ip = ipresult.ipdata;
    var ip = req.clientIp;
    //   ********   Code For Getting Ip   *********  //
    var data = req.body;
    var table_name = "td_document_upload";
    var values = null;

    var fields = `status='A',approved_by='${user_id}',
      approved_at = '${formattedDate}',approved_ip='${ip}' `;
    var whr = `id = '${data.doc_id}'`;
    var flag = 1;
    var save_data = await db_Insert(table_name, fields, values, whr, flag);

    req.flash("success_msg", "Update successful!");
    res.redirect("/wdtls/doclist_for_approve");
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("wdtls/doclist_for_approve", res_dt);
  }
});


const storages = multer.memoryStorage();

// Multer upload setup with memory storage
const upload_pdf = multer({ storage: storages });

// Custom middleware to check for malicious content in the file buffer
const checkForMaliciousContent = async (req, res, next) => {
  const file = req.file;
    
  if (!file) {
    return next();
  }

  if (hasMultipleExtensions(file.originalname)) {
    return res.status(400).send('Suspicious file name detected (multiple extensions)');
  }

  const fileTypes = /pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    // Check for PDF header (%PDF)
    const pdfHeader = file.buffer.toString('utf8', 0, 4); // Read first 4 bytes for PDF header
    if (pdfHeader !== '%PDF') {
      return res.status(400).send('Invalid PDF file');
    }
    // Check for forbidden patterns in file content (malicious content)
    // const forbiddenPatterns = [
    //   /<\?php/i,        // PHP opening tag
    //   /<script>/i,      // Script tags
    //   /eval\(/i,        // eval() function
    //   /base64_decode/i  // base64_decode function
    // ];
    // console.log('File Buffer')
    // console.log(file.buffer.toString('utf8'));
    // console.log('File Buffer')
    // for (const pattern of forbiddenPatterns) {
    //   if (pattern.test(file.buffer.toString('utf8'))) {
    //     return res.status(400).send('Malicious content detected');
    //   }
    // }

    var content = await pdfParse(file.buffer)
    const forbiddenPatterns = [/<\?php/i, /<script>/i, /eval\(/i, /base64_decode/i];
    var chk_mal_content =  forbiddenPatterns.some(pattern => pattern.test(content.text.trim()));

    if(chk_mal_content){
      return res.status(400).send('Malicious content detected.');
    }
    next()
  } else {
    return res.status(400).send('Only PDF files are allowed');
  }

  // next(); // Proceed to the next middleware (your upload route)
};



WdtlsRouter.post("/uploaddoc", upload_pdf.single("document"), checkForMaliciousContent, async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const user = req.session.user;
  const range_id_ = req.session.user.range_id;
  const cheuserinput = await chkUserIputFunc(req.body);

  if (cheuserinput > 0) {
    const date_ob = moment();
    const formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");

    // Get client IP address
    // const ipresult = await fetchIpData();
    // const ip = ipresult.ipdata;
    const ip = req.clientIp;
    const rootDirectory = path.join(__dirname, '..');
      const typeId = req.body.doc_type;  // Assuming doc_type is coming from the body
      let uploadDir;
      if (typeId == 1) {
        uploadDir = path.join(rootDirectory, 'uploads/notifications/');
      } else if (typeId == 2) {
        uploadDir = path.join(rootDirectory, 'uploads/tenders/');
      } else if (typeId == 3) {
        uploadDir = path.join(rootDirectory, 'uploads/announcement/');
      } else {
        uploadDir = path.join(rootDirectory, 'uploads/downloads/');
      }
      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    const newFilename = Date.now() + path.extname(req.file.originalname);
    const filePath = path.join(uploadDir, newFilename);

    console.log(filePath);
    fs.writeFile(filePath, req.file.buffer, (err) => {
      if (err) {
        console.error('Error saving file:', err); // Log the actual error message to the console
        return res.status(500).send('Error saving the file.');
      }
      console.log('File saved successfully!');
      // Optionally respond with success (you can uncomment the response if needed)
      // res.send('File uploaded successfully with filename: ' + newFilename);
    });
    
   
    const data = req.body;
    const table_name = "td_document_upload";
    const fields = `(doc_type, doc_title, document, folder_name, created_at, created_by, created_ip)`;
    const values = `('${data.doc_type}', '${data.doc_title.split("'").join("\\'")}', '${newFilename}', '', '${formattedDate}', '${user.user_id}', '${ip}')`;

    const sa_data = await db_Insert(table_name, fields, values, null, 0);
    const message = `Document uploaded by ${user.user_id}.`;

    const noti_fields = `(type, message, wrk_releated_id, user_type, view_status, range_id, created_by, created_at, created_ip)`;
    const noti_values = `('D', '${message}', '${sa_data.lastId.insertId}', 'S', '1', '${range_id_}', '${user.user_id}', '${formattedDate}', '${ip}')`;

    const res_dt = await db_Insert("td_notification", noti_fields, noti_values, null, false);

    if (res_dt && res_dt.suc > 0) {
      const notification_dtls = await SendNotification();
      req.io.emit("notification", { message: notification_dtls.msg });
    }

    if (user.user_type == "S") {
      res.redirect("/wdtls/adddoc");
    } else {
      res.redirect("/wdtls/announcelist");
    }
  } else {
    if (user.user_type == "S") {
      res.redirect("/wdtls/adddoc");
    } else {
      res.redirect("/wdtls/announcelist");
    }
  }
});

WdtlsRouter.get("/announcelist", async (req, res) => {
  try {
    // Extract range_id from session
    var whr = `doc_type = 3 `;
    const doclist = await db_Select("*", "td_document_upload", whr, null);
    // Prepare data for rendering
    const res_dt = {
      data: doclist.suc > 0 ? doclist.msg : "",
    };
    res.render("websitedtls/doc/document_list", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("websitedtls/doc/document_list");
  }
});
WdtlsRouter.get("/addannouncement", async (req, res) => {
  try {
    // Extract range_id from session
    const soc_id = req.query.id;
    const range_id = req.session.user.range_id;
    var whr = `upload_auth = 'A' `;
    const doctyperes = await db_Select("*", "md_document", whr, null);
    // Prepare data for rendering
    var res_dt = {
      doctypelist: doctyperes.suc > 0 ? doctyperes.msg : "",
    };
    // Render the view with data
    res.render("websitedtls/add_doc", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});



WdtlsRouter.get("/gallerylist", async (req, res) => {
     try {
      let page = parseInt(req.query.page) || 1;  // current page
      let limit = 16;                            // items per page
      let offset = (page - 1) * limit;
      // fetch paginated data
      const doclist = await db_Select(
        "*", 
        "td_gallery LIMIT ? OFFSET ?", 
        null, 
        null, 
        [limit, offset]
      );

      // fetch total count
      const countResult = await db_Select("COUNT(*) as count", "td_gallery", null, null);
      let totalItems = countResult.msg[0].count;
      let totalPages = Math.ceil(totalItems / limit);

      // prepare response data
      const res_dt = {
        data: doclist.suc > 0 ? doclist.msg : [],
        currentPage: page,
        totalPages: totalPages
      };

      res.render("websitedtls/gallery/list", res_dt);

      } catch (error) {
        console.error("Error in /wdtls/gallery:", error);
        res.status(500).send("Something went wrong while fetching gallery data.");
      }
});
  WdtlsRouter.get("/addgallery", async (req, res) => {
    try {
      res.render("websitedtls/gallery/add");
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
    }
  });
// Set storage engine

// Set storage engine
const storage_gallery = multer.memoryStorage({
  destination: "./uploads/profile_pic/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});
const hasMultipleExtensions = (filename) => {
  const extCount = filename.split('.').length - 1;
  return extCount > 1; // If more than one dot, it's suspicious
};

// Initialize multer
const upload_profile_pic = multer({
  storage: multer.memoryStorage(),
}).single("profile_pic"); // 'profile_pic' is the name of the input field in the form
const checkForMaliciousContentforimage = (req, res, next) => {
  const file = req.file;

  // If no file exists, skip the validation
  if (!file) {
    return next();
  }

  // Check if filename has multiple extensions (suspicious file)
  if (hasMultipleExtensions(file.originalname)) {
    return res.status(400).send('Suspicious file name detected (multiple extensions)');
  }

  // Define forbidden patterns for all file types (image, pdf, etc.)
  const forbiddenPatterns = [
    /<\?php/i,        // PHP opening tag
    /<script>/i,      // Script tags
    /eval\(/i,        // eval() function
    /base64_decode/i, // base64_decode function
    /<iframe>/i,      // Malicious iframe
    /<object>/i,      // Object injection
  ];

  // Check for forbidden patterns in the content of the file (malicious content)
  // For images (JPEG/PNG), content is binary and will not have human-readable content
  try {
    // For non-image files, we will try to read the buffer as a string.
    const content = file.buffer.toString("utf8");

    // Check forbidden patterns in content
    if (forbiddenPatterns.some(pattern => pattern.test(content))) {
      return res.status(400).send('Malicious content detected');
    }
  } catch (err) {
    // If we cannot read the file as text (e.g., it's a binary file like image), we skip the content check.
    console.log('Non-text file, skipping content check:', file.originalname);
  }

  // Continue to the next middleware if no malicious content was detected
  return next();
};
// File upload route
  
  WdtlsRouter.get("/delgallery", async (req, res) => {
    try {
      var data = req.body;
      var id = req.query.id,
        where = `id = '${id}' `;
      var res_dt = await db_Delete("td_gallery", where);
      res.redirect("/wdtls/gallerylist");
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
      res.redirect("/wdtls/gallerylist");
    }
  });
//  ******  Code for Statistic  ******  //
  WdtlsRouter.get("/statistic", async (req, res) => {
    try {
      const doclist = await db_Select("*", "td_statistic", null, null);
      const res_dt = { datas: doclist.msg[0] };
      res.render("websitedtls/statistic", res_dt);
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
    }
  });
  WdtlsRouter.post("/update_statistic", async (req, res) => {
    try {
      var data = req.body;
      var user = req.session.user;
      var date_ob = moment();
      // Format it as YYYY-MM-DD HH:mm:ss
      var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
      var values = "";
      const ip = req.clientIp;
      var table_name = "td_statistic";
      var fields = `title1 = '${data.title1.split("'").join("\\'")}',num1 = '${data.num1}',title2 = '${data.title2}',num2 = '${data.num2}',
                  title3 = '${data.title3}',num3='${data.num3}',modified_by='${user.user_id}',modified_dt='${formattedDate}',
                  modified_ip = '${ip}' `;
      var whr = `id = '${data.id}'`;
      var flag = 1;
      var save_data = await db_Insert(table_name, fields, values, whr, flag);
      res.redirect("/wdtls/statistic");
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
    }
  });


////     ********  Code start for User Management      *******   ///
WdtlsRouter.get("/userlist", async (req, res) => {
  try {
    const range_id = req.session.user.range_id;
    var cntr_auth_type = req.session.user.cntr_auth_type;
    if(req.session.user.user_type == 'S'){
         var select = `a.*,b.range_name,c.controlling_authority_type_name`;
         var table = `md_user a LEFT JOIN md_range b ON a.range_id = b.range_id LEFT JOIN md_controlling_authority_type c ON a.cntr_auth_type =c.controlling_authority_type_id`;
    }else{
    
      if(cntr_auth_type == 1){
        var select = `a.*,b.range_name,c.controlling_authority_type_name`;
        if (req.session.user.user_type == 'M') {
          var table = `md_user a JOIN md_range b ON a.range_id = b.range_id JOIN md_controlling_authority_type c ON a.cntr_auth_type =c.controlling_authority_type_id WHERE a.range_id='${range_id}' AND a.cntr_auth_type='${cntr_auth_type}' AND user_type in('M','U','E')`;
        } else {
          var table = `md_user a LEFT JOIN md_range b ON a.range_id = b.range_id LEFT JOIN md_controlling_authority_type c ON a.cntr_auth_type =c.controlling_authority_type_id AND a.cntr_auth_type='${cntr_auth_type}' AND user_type in('M','U','A','E')`;
        }
      }else{
        if(req.session.user.user_type == 'M'){
          var select = `a.*,b.dist_name as range_name,c.controlling_authority_type_name`;
          var table = `md_user a JOIN md_district b ON a.range_id = b.dist_code JOIN md_controlling_authority_type c ON a.cntr_auth_type =c.controlling_authority_type_id AND a.range_id='${range_id}' AND a.cntr_auth_type='${cntr_auth_type}' AND user_type in('M','U','E') `;
        }else{
          var select = `a.*,b.dist_name as range_name,c.controlling_authority_type_name`;
          var table = `md_user a JOIN md_district b ON a.range_id = b.dist_code JOIN md_controlling_authority_type c ON a.cntr_auth_type =c.controlling_authority_type_id AND a.cntr_auth_type='${cntr_auth_type}' AND user_type in('M','U','A','E') `;
        }
      }
    }
    
    const userlist = await db_Select(select, table, null, null);
    // Prepare data for rendering
    const res_dt = {
      data: userlist.suc > 0 ? userlist.msg : "",
    };
    res.render("websitedtls/user/list", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    //res.status(500).send('An error occurred while loading the dashboard.');
    res.render("websitedtls/faqlist");
  }
});
WdtlsRouter.get("/adduser", async (req, res) => {
  try {
    var cntr_auth_type = req.session.user.cntr_auth_type;
    var user_type = cntr_auth_type > 1 ? 'District' : 'Range';
    var range_dist_id = req.session.user.range_id;
    var ranze = await db_Select("*", "md_range", null, null);
    var distlist = await db_Select("*", "md_district", null, null);
    var cnt_type = await db_Select(
      "*",
      "md_controlling_authority_type",
      null,
      null,
    );
    const res_dt = {
      data: ranze.suc > 0 ? ranze.msg : "",user_ty:user_type,range_dist:range_dist_id,
      distl:distlist.suc > 0 ? distlist.msg : "",
      cnt_type: cnt_type.suc > 0 ? cnt_type.msg : "",cntr_auth_type:cntr_auth_type
    };
    res.render("websitedtls/user/add", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});

WdtlsRouter.post("/saveuser", async (req, res) => {
  try {
    var data = req.body;
    var user = req.session.user;
    var date_ob = moment();
    var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
    // var ipresult = await fetchIpData();
    // var ip = ipresult.ipdata;
    //const userIp = req.clientIp; // This will work
    var ip = req.clientIp;
    var pass_string = "";
    if (data.id > 0) {
      if (data.password.length > 0) {
        var pass = bcrypt.hashSync(data.password, 10);
        pass_string = `password = '${pass}',`;
      }
    } else {
      var pass = bcrypt.hashSync("1234", 10);
    }
    var values = `('${data.user_id}','${data.user_name}','${data.user_email}','${data.user_mobile ?data.user_mobile : 0}','${data.designation}','${data.user_type}','${pass}','A','${data.cntr_auth_type}','${data.range_id}','${formattedDate}','${user.user_id}','${ip}')`;

    var table_name = "md_user";
    var fields =
      data.id > 0
        ? `user_name = '${data.user_name.split("'").join("\\'")}',user_email = '${data.user_email}',user_mobile = '${data.user_mobile ? data.user_mobile : 0}',designation = '${data.designation}',user_type = '${data.user_type}', ${pass_string} user_status='${data.user_status}',cntr_auth_type='${data.cntr_auth_type}',range_id='${data.range_id}',modified_by='${user.user_id}',modified_at='${formattedDate}',modified_ip = '${ip}' `
        : `(user_id,user_name,user_email,user_mobile,designation,user_type,password,user_status,cntr_auth_type,range_id,created_at,created_by,created_ip)`;
    var whr = `id = '${data.id}'`;
    var flag = data.id > 0 ? 1 : 0;
    var save_data = await db_Insert(table_name, fields, values, whr, flag);
    res.redirect("/wdtls/userlist");
  } catch (error) {
    // Log the error and send an appropriate response
    res.redirect("/wdtls/userlist");
    //console.error("Error during dashboard rendering:", error);
  }
});
WdtlsRouter.get("/edituser", async (req, res) => {
  var id = req.query.id;
  try {
    var cntr_auth_type = req.session.user.cntr_auth_type;
    var user_type = cntr_auth_type > 1 ? 'District' : 'Range';
    var range_dist_id = req.session.user.range_id;
    var cnt_type = await db_Select(
      "*",
      "md_controlling_authority_type",
      null,
      null,
    );
    var ranze = await db_Select("*", "md_range", null, null);
    var userres = await db_Select("*", "md_user", `id='${id}'`, null);
    var distlist = await db_Select("*", "md_district", null, null);
    const res_dt = {
      data: ranze.suc > 0 ? ranze.msg : "",user_ty:user_type,range_dist:range_dist_id,
      usersd: userres.suc > 0 ? userres.msg[0] : "",distl:distlist.suc > 0 ? distlist.msg : "",
      cnt_type: cnt_type.suc > 0 ? cnt_type.msg : "",cntr_auth_type:cntr_auth_type
    };
    res.render("websitedtls/user/edit", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});
WdtlsRouter.get("/deluser", async (req, res) => {
  try {
    var id = req.query.id,
      where = `modified_by = '${id}' OR created_by = '${id}' `;
    var wrk_dtl = await db_Select("*", "md_society", where, null);

    if (wrk_dtl.msg.length == 0) {
      var res_dt = await db_Delete("md_user", `user_id = '${id}' `);
      req.flash("success_msg", "Deleted successful!");
    } else {
      req.flash(
        "error_msg",
        "Since the user has entered some data,so it cannot be deleted.",
      );
    }

    res.redirect("/wdtls/userlist");
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
    res.redirect("/wdtls/faqlist");
  }
});
////     ********  Code End for User Management      *******   ///

WdtlsRouter.get("/changepass", async (req, res) => {
  try {
    var user = req.session.user;
    const res_dt = {
      user_id: user.user_id,
    };
    res.render("websitedtls/user/change_password", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});
WdtlsRouter.post("/changepass", async (req, res) => {
  try {
    var user = req.session.user;
    var data = req.body,
      result;
      if(data.old_pass != data.pass){
    var select = "*",
      table_name = "md_user",
      whr = `user_id='${user.user_id}' AND user_status='A'`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);

    if (res_dt.msg.length > 0) {
      const hasLowercase = /[a-z]/.test(data.pass);
      const hasUppercase = /[A-Z]/.test(data.pass);
      const hasNumber = /[0-9]/.test(data.pass);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.pass);
      const hasMinLength = data.pass.length >= 8;
      if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar && hasMinLength) {
        if (await bcrypt.compare(data.old_pass, res_dt.msg[0].password)) {
          var pass = bcrypt.hashSync(data.pass, 10);

          var date_ob = moment();
          var formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
          // var ipresult = await fetchIpData();
          // var ip = ipresult.ipdata;
          var ip = req.clientIp;
          var values = null;
          var table_name = "md_user";
          var fields = `password = '${pass}',must_change_password=1,modified_at='${formattedDate}',modified_by='${user.user_id}',modified_ip='${ip}'`;
          var whr = `user_id = '${user.user_id}'`;
          var save_data = await db_Insert(table_name, fields, values, whr, 1);
          req.flash("success_msg", "Update successful!");
          res.redirect("/logout");
        } else {
          result = {
            suc: 0,
            msg: "Please check your userid or password",
            dt: res_dt,
          };
          req.flash("error_msg", "Old Password Is Wrong!");
          res.redirect("/wdtls/changepass");
        }
      }else{
        req.flash("error_msg", "Password does not meet the requirements");
        res.redirect("/wdtls/changepass");
      }
    } else {
      result = { suc: 0, msg: "No data found", dt: res_dt };
      res.redirect("/wdtls/changepass");
    }
     }else{
        req.flash("error_msg", "Old Password And New Password is Same!");
        res.redirect("/wdtls/changepass");
     }
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});

WdtlsRouter.get("/editprofile", async (req, res) => {
  var user = req.session.user;
  try {
    var userres = await db_Select(
      "*",
      "md_user",
      `user_id='${user.user_id}'`,
      null,
    );
    const res_dt = {
      usersd: userres.suc > 0 ? userres.msg[0] : ""
    };
    res.render("user/profile", res_dt);
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});



WdtlsRouter.post("/editprofile", upload_profile_pic, checkForMaliciousContentforimage, async (req, res) => {
    try {
    const user = req.session.user;
    const data = req.body;

    const date_ob = moment();
    const formattedDate = date_ob.format("YYYY-MM-DD HH:mm:ss");
    const ip = req.clientIp;

    let newFilename = data.old_profile_pic;  // default → keep old image

    // #############################
    // 1️⃣ If a new file is uploaded
    // #############################
      if (req.file) {
          const rootDirectory = path.join(__dirname, '..');
          const uploadDir = path.join(rootDirectory, 'uploads/profile_pic/');

          // Create directory if not exists
          if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
          }

          // Create new filename
          newFilename = Date.now() + path.extname(req.file.originalname);
          const filePath = path.join(uploadDir, newFilename);

          // Save file
          fs.writeFileSync(filePath, req.file.buffer);
          console.log("File uploaded:", newFilename);
      } else {
          console.log("No new file uploaded — keeping old image:", newFilename);
      }

      // #############################
      // 2️⃣ Update Database
      // #############################

      const fields = `
          user_name = '${data.user_name}',
          profile_pic = '${newFilename}',
          modified_by = '${user.user_id}',
          elec_status = '${data.elec_status}',
          must_update_profile = '1',
          modified_at = '${formattedDate}',
          modified_ip = '${ip}'
      `;

      const whr = `id = '${data.id}' AND user_id = '${user.user_id}'`;

      const save_data = await db_Insert("md_user", fields, null, whr, 1);

      if (!save_data) {
          return res.status(500).send("Database error: Unable to save the data.");
      }
      req.flash("success_msg", "Profile updated successfully!");
      return res.redirect("/wdtls/editprofile");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
  });
WdtlsRouter.post("/editprofile_cc", async (req, res) => {
  var user = req.session.user;
  var data = req.body;
  try {
    var fields = `user_name = '${data.user_name}',elec_status = '${data.elec_status}',must_update_profile= '1',designation='${data.designation}',user_email='${data.user_email}'`;
    var whr = `id = '${data.id}' AND user_id = '${user.user_id}'`;
    var save_data = await db_Insert("md_user", fields, null, whr, 1);
    req.flash("success_msg", "Updated successful!");
    res.redirect("/dash/editprofile");
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
  }
});

module.exports = { WdtlsRouter };