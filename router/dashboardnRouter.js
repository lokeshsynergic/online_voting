const DashboardnRouter = require("express").Router();
const ExcelJS = require("exceljs");
const requestIp = require("request-ip");
const { db_Select, db_Insert } = require("../modules/MasterModule");
DashboardnRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

DashboardnRouter.get("/dash", async (req, res) => {
  try {
    const user_type = req.session.user.user_type;
    // Prepare data for rendering
    const select = "ifnull(COUNT(*) , 0) AS total_voter";
    const voterResult = await db_Select(select, "md_user", null, null);
    const total_voter = voterResult.msg[0].total_voter;
  
    const select2 = "ifnull(COUNT(*) , 0) AS total_candidate";
    const candidateResult = await db_Select(select2, "md_user", "elec_status = 1", null);
    const total_candidate = candidateResult.msg[0].total_candidate;


    const select3 = "ifnull(COUNT(a.voter_id), 0 ) AS total_vote";
    const voteResult = await db_Select(select3, `td_voter_status a 
                JOIN md_election_details b ON a.election_id = b.id`, "b.status = 0", null);
    const total_vote = voteResult.msg[0].total_vote;


     
      const res_dt = {
      page: 1,
      success_msg : '',
      error_msg : '',
      total_voter: total_voter,
      total_candidate: total_candidate,
      total_vote: total_vote,
      
    };
    res.render("dashboard/dashboard", res_dt);
    
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error during dashboard rendering:", error);
     res.render("dashboard/dashboard", res_dt);
  }
});

DashboardnRouter.post("/get_rular_urban", async (req, res) => {
  try {
    // Extract query parameter 'claims'
    var data = req.body;
    var con1 = data.cntr_auth_id > 0 ? `AND a.cntr_auth_type = '${data.cntr_auth_id}'` :  ``;
    var con1s = data.cntr_auth_id > 0 ? `AND cntr_auth_type = '${data.cntr_auth_id}'` :  ``;
     //data.rangedist == 'RANGE'
    var range_dist = data.rangedist == 'DIST' ? 'dist_code':'range_code';

    var select = `SUM(CASE WHEN urban_rural_flag = 'U' THEN 1 ELSE 0 END) AS urban_tot,SUM(CASE WHEN urban_rural_flag = 'R' THEN 1 ELSE 0 END) AS rular_tot,SUM(CASE WHEN urban_rural_flag = 'D' THEN 1 ELSE 0 END) AS devauth_tot`,
      table_name = `md_society`,
      where =
        data.range_code > 0
          ? `functional_status = 'Functional' AND ${range_dist} ='${data.range_code}'`
          : `functional_status = 'Functional'`,
      order = null;
    var res_dt = await db_Select(select, table_name, where + con1s, order);
   

    const select_election = "count(*) as month_before";

    var range_code = data.range_code;
    if (range_code > 0) {
      var table_name6 = `md_society a WHERE a.functional_status='Functional' AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL 6 MONTH) AND a.${range_dist} = "${range_code}" ${con1}`;
      var table_name3 = `md_society a WHERE a.functional_status='Functional' AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL 3 MONTH) AND a.${range_dist} = "${range_code}" ${con1}`;
    } else {
      var select_range =
        range_code > 0 ? `AND a.${range_dist} = '${range_code}'` : "";
      var table_name6 = `md_society a WHERE a.functional_status='Functional' ${select_range} ${con1} AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL 6 MONTH) `;
      var table_name3 = `md_society a WHERE a.functional_status='Functional' ${select_range} ${con1} AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL 3 MONTH) `;
    }
    var res_dt6 = await db_Select(select_election, table_name6, null, null);
    var res_dt3 = await db_Select(select_election, table_name3, null, null);

    var select_ele = `SUM(CASE WHEN election_status = 'DUE' THEN 1 ELSE 0 END) AS due_tot,SUM(CASE WHEN election_status = 'ONGOING' THEN 1 ELSE 0 END) AS ongoing_tot, SUM(CASE WHEN election_status = 'DONE' THEN 1 ELSE 0 END) AS done_tot`,
      where_ele =
        data.range_code > 0
          ? `functional_status = 'Functional' AND approve_status = 'A' AND ${range_dist} ='${data.range_code}'`
          : `functional_status = 'Functional' AND approve_status = 'A' `;
    var res_dt_ele = await db_Select(select_ele, `md_society`, where_ele +con1s, null);

    const responseData = {
      soctot: res_dt.suc > 0 ? res_dt.msg[0] : "",
      six_month_data: res_dt6.suc > 0 ? res_dt6.msg[0] : "",
      three_month_data: res_dt3.suc > 0 ? res_dt3.msg[0] : "",
      election_result_data: res_dt_ele.suc > 0 ? res_dt_ele.msg[0] : "", // Echoing the received claims
    };
    // Send response back to the client
    res.json(responseData);
  } catch (err) {
    console.error("Error handling /regauth request:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

DashboardnRouter.get("/society_download", async (req, res) => {
  try {
    var range_id = req.session.user.range_id;
    var cntr_auth_ty = req.session.user.cntr_auth_type;
    var zone_code = "";
    var range_code_for_name = 0;
     var range_or_dist = cntr_auth_ty > 1 ? 'dist_code':'range_code';
    if (range_id > 0) {
      range_code_for_name = req.session.user.range_id;
      var range =
        range_id > 0 ? `AND a.${range_or_dist}=${req.session.user.range_id} ` : "";
    } else {
      range_code_for_name = req.query.range_code > 0 ? req.query.range_code : 0;
      var range =
        req.query.range_code > 0
          ? `AND a.${range_or_dist}=${req.query.range_code} `
          : "";
      zone_code =
        req.query.zone_code > 0
          ? `AND a.zone_code=${req.query.zone_code} `
          : "";
    }
    if(cntr_auth_ty > 1){
      var cntr_auth_type = `AND (a.cntr_auth_type=${cntr_auth_ty} OR a.cntr_auth_type=0)`;
    }else{
      if (range_id > 0) {
        var cntr_auth_type = `AND (a.cntr_auth_type=${cntr_auth_ty} OR a.cntr_auth_type=0)`;
      }else{
        var cntr_auth_type =
        req.query.cntr_auth_type > 0
          ? `AND a.cntr_auth_type=${req.query.cntr_auth_type} `
          : "";
      }
    }
    
    // var dist_code = req.query.dist_code > 0 ? `AND a.dist_code=${req.query.dist_code} ` : '';

    var soc_tier =
      req.query.soc_tier > 0 ? `AND a.soc_tier=${req.query.soc_tier} ` : "";
    var urban_rural_flag =
      req.query.urban_rural_flag > 0
        ? `AND a.urban_rural_flag=${req.query.urban_rural_flag} `
        : "";
    var soc_type_id =
      req.query.soc_type_id > 0
        ? `AND a.soc_type=${req.query.soc_type_id}`
        : "";
    if (req.query.soc_data_status) {
      var soc_data_status =
        req.query.soc_data_status.length > 0
          ? `AND a.approve_status= '${req.query.soc_data_status}' `
          : "";
    } else {
      var soc_data_status = "";
    }
    if (req.query.functional_status) {
      var functional_status =
        req.query.functional_status.length > 0
          ? `AND a.functional_status= '${req.query.functional_status}' `
          : "";
    } else {
      var functional_status = "";
    }

    const select =
      "a.cop_soc_name, a.reg_no, a.reg_date, b.soc_type_name, f.soc_tier_name, h.controlling_authority_type_name AS reg_cont_auth, g.controlling_authority_name AS returning_officer, st.state_name, c.dist_name, d.zone_name, e.range_name, a.urban_rural_flag, ulcat.ulb_catg_name, ulb.ulb_name, wa.ward_name, mb.block_name, gp.gp_name, vill.vill_name, a.pin_no, a.address, mms.manage_status_name, mot.officer_type_name, a.num_of_memb, a.audit_upto, a.last_elec_date, a.tenure_ends_on, a.contact_name AS key_person, a.contact_designation AS key_person_desig, a.contact_number, a.email, a.case_id, a.case_num, a.functional_status";
    const table_name = `md_society a 
          LEFT JOIN md_society_type b ON a.soc_type = b.soc_type_id 
          LEFT JOIN md_district c ON a.dist_code = c.dist_code 
          LEFT JOIN md_controlling_authority_type h ON a.cntr_auth_type = h.controlling_authority_type_id 
          LEFT JOIN md_controlling_authority g ON a.cntr_auth = g.controlling_authority_id 
          LEFT JOIN md_state st ON a.state_code = st.state_id 
          LEFT JOIN md_ulb_catg ulcat ON a.ulb_catg = ulcat.ulb_catg_id 
          LEFT JOIN md_ulb ulb ON a.ulb_id = ulb.ulb_catg_id 
          LEFT JOIN md_ward wa ON a.ward_no = wa.ward_id 
          LEFT JOIN md_block mb ON a.block_id = mb.block_id 
          LEFT JOIN md_gp gp ON a.gp_id = gp.gp_id 
          LEFT JOIN md_village vill ON a.vill_id = vill.vill_id 
          LEFT JOIN md_management_status mms ON a.mgmt_status = mms.manage_status_id 
          LEFT JOIN md_officer_type mot ON a.officer_type = mot.officer_type_id 
          LEFT JOIN md_zone d ON a.zone_code = d.zone_id 
          LEFT JOIN md_range e ON a.range_code = e.range_id 
          LEFT JOIN md_soc_tier f ON a.soc_tier = f.soc_tier_id`;
    var con = `a.functional_status = 'Functional' `;

    const where = `${con + range + cntr_auth_type + zone_code + soc_tier + urban_rural_flag + soc_type_id + soc_data_status + functional_status}`; // Ensure these variables are properly defined
    const res_dt = await db_Select(select, table_name, where, null);
    if(cntr_auth_ty > 1 ){
      var res_dt_range = await db_Select(
        "range_name",
        "md_range",
        `range_id = '${range_code_for_name}' `,
        null,
      );
    }else{
      var res_dt_range = await db_Select(
        "dist_name as range_name",
        "md_district",
        `dist_code = '${range_code_for_name}' `,
        null,
      );
    }
    
    var range_name = res_dt_range.msg[0].range_name;
    console.log(res_dt_range);
    //}
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Define column headers
    worksheet.columns = [
      { header: "Society Name", key: "cop_soc_name" },
      { header: "Registration No", key: "reg_no" },
      { header: "Registration Date", key: "reg_date" },
      { header: "Society Type", key: "soc_type_name" },
      { header: "Tier Name", key: "soc_tier_name" },
      { header: "Controlling Authority Type", key: "reg_cont_auth" },
      { header: "Returning Officer", key: "returning_officer" },
      { header: "State", key: "state_name" },
      { header: "District", key: "dist_name" },
      { header: "Zone", key: "zone_name" },
      { header: "Range", key: "range_name" },
      { header: "Urban/Rural", key: "urban_rural_flag" },
      { header: "ULB Category", key: "ulb_catg_name" },
      { header: "ULB Name", key: "ulb_name" },
      { header: "Ward", key: "ward_name" },
      { header: "Block", key: "block_name" },
      { header: "Gram Panchayat", key: "gp_name" },
      { header: "Village", key: "vill_name" },
      { header: "PIN No", key: "pin_no" },
      { header: "Address", key: "address" },
      { header: "Management Status", key: "manage_status_name" },
      { header: "Officer Type", key: "officer_type_name" },
      { header: "Number of Members", key: "num_of_memb" },
      { header: "Audit Up To", key: "audit_upto" },
      { header: "Last Election Date", key: "last_elec_date" },
      { header: "Tenure Ends On", key: "tenure_ends_on" },
      { header: "Key Person", key: "key_person" },
      { header: "Designation", key: "key_person_desig" },
      { header: "Contact Number", key: "contact_number" },
      { header: "Email", key: "email" },
      { header: "Case ID", key: "case_id" },
      { header: "Case Number", key: "case_num" },
      { header: "Functional Status", key: "functional_status" },
    ];
    var result = res_dt.suc > 0 ? res_dt.msg : "";
    // Add rows to the worksheet
    result.forEach((item) => {
      worksheet.addRow(item);
    });

    // Set response headers for the Excel file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=society_list_of${range_name}.xlsx`,
    );

    // Write the Excel file to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error during Excel generation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the report." });
  }
});

  DashboardnRouter.post(
    "/get_society_election_due_monthwise",
    async (req, res) => {
      try {
        // Extract query parameter 'claims'
        var data = req.body;
        //var ctr_auth_type = req.session.user.cntr_auth_type;
        var ctr_auth_type = data.cntr_auth_id;
        var rangedist = data.rangedist;
        if(rangedist == 'DIST' ){
          var range_dist = 'dist_code';
        }else{
          var range_dist = 'range_code';
        }
        var month_interval = data.month_interval;
        const select = "count(*) as month_before";
        var range_code = data.range_code;
        var select_crtauth =
        ctr_auth_type > 0 ? ` AND a.cntr_auth_type = '${ctr_auth_type}'` : "";
        if (range_code > 0) {
          var table_name = `md_society a WHERE a.functional_status='Functional' AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL ${month_interval} MONTH) AND a.${range_dist} = "${range_code}" ${select_crtauth}`;
        } else {
          var select_range =
            range_code > 0 ? `AND a.${range_dist} = '${range_code}'` : "";
          var table_name = `md_society a WHERE a.functional_status='Functional' ${select_range} ${select_crtauth} AND a.approve_status = 'A' AND a.tenure_ends_on >= CURDATE() AND a.tenure_ends_on < DATE_ADD(CURDATE(), INTERVAL ${month_interval} MONTH) `;
        }
        var res_dt = await db_Select(select, table_name, null, null);
        const responseData = {
          soctot: res_dt.suc > 0 ? res_dt.msg[0] : "", // Echoing the received claims
        };
        // Send response back to the client
        res.json(responseData);
      } catch (err) {
        console.error("Error handling /regauth request:", err);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    },
  );
  DashboardnRouter.get("/editprofile", async (req, res) => {
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
  DashboardnRouter.post("/editprofile", async (req, res) => {
    var user = req.session.user;
    var data = req.body;
    try {
      var fields = `user_name = '${data.user_name}',designation='${data.designation}',user_email='${data.user_email}'`;
      var whr = `id = '${data.id}' AND user_id = '${user.user_id}'`;
      var save_data = await db_Insert("md_user", fields, null, whr, 1);
      req.flash("success_msg", "Updated successful!");
      res.redirect("/dash/editprofile");
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error during dashboard rendering:", error);
    }
  });

module.exports = { DashboardnRouter };
