const express = require('express');
const router = express.Router();
const upload = require('../../../utils/upload-multer');
const config = require('config');
var session = require('express-session');
const pool = require('../../dbconnection');
const nodemailer = require("nodemailer");
const fs = require('fs');
const jwt = require('jsonwebtoken');
var crypto = require("crypto");
// var md5 = require('md5')
var Activestate = "Active";
var InActivestate = "New";
var Deactivestate = "Deactive";
var Archievedstate = "Archived";


const privateKEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAvYJT5HsAdyH+Z+Zsoy5oXhlKQ8jaycOHa6k1tiW9NZXFQCws
jcOiPYzavilFsXiFqq5rFTwBpPDtzk4wRleBkAh3aR7QdujVC+9XiskSaQfMdjDW
o/5fySbn7K2IWikq8IgL1074qFrBVadoqdGeMyoQpAapiijDjma2SNE3k45/9Gc5
6KmnB4nHfNGsxI6l2vM8Afx782WYejxbV96opqo81M76NUgmpdR53B2qIGK9TZfc
EL7HfHFIlmfNQ5m1Ek6tKDpgBtUT659bN6J0FqObJ+eUPGMnBityZWcsH4xcdLTm
364nTvUNqEb5Pm9ADGCWtl6xkm+Mn/fNUZguuwIDAQABAoIBAGp5D9Nd/Dvy4HHV
t5HTIBZGVUBSWAJmFe66KhBFkdHKbQGKEBoyITQ9sCSJIbv9P/ROfKF4jl/ycVmo
+lx7C7M13ok0I+G7HP/QoDm8kNhr5kc9V0raP0zPzBxgvywQ1yw+85ArsW89VkRe
g2JuAFk0uBbAG38hOgYG1UGCMpx2yw+z5cGOR2PLJfjLGklmdZcB9AUa3+4IaSSj
3INQCsFyeX+lyBdesHQjOmKhKp8BMQtCoFHKUsm4ycDfpFjfyr/I10pmH220qZv1
9B4ApoReG3hS1AF95E90ZJPGG5WHj+4qkYhRpxFN6xC3lPacv2xn5W+2VqSK1myO
ntVGW9kCgYEA3kzMEwETKRA6qWsyXnkOrdNv1ZOT7h6xmCS+bCXfoRcUQ+gcv0PK
vmqvwrJj8YDGiiCgGA4d1jCHGarXrgIYM3UZ9B0uq2GzhPD68FX1M0wgaoaNGycc
d8Lrfp2C7QmbPykAu/naNdQVCmfqqXBhUmIhhxJxBiTJgOMBS1nMZsUCgYEA2jz0
REFTAQVtCvo/Te4NZ51WSOkLlZAQrXkaVoQYVhuBHz1A5gKGcJNGtbfE7xTmqxqk
qGKHGlSILUEACvNp8JRtfzI8AZjb9E0fmjGpGxLF4UcdN/vvTKGgN5S63MIdJ9oB
VECZYtzPD09Gue1mBiFHXti4gED32Y8ODaN3l38CgYEAqhc22p+q6nOJfxIPgyu7
aJNscY2u1bbUiiYrMZK1DowbLG5QeKRFX/c/rohSYnn2779Q37cFa1rMNH588p6V
p+HEzvz5NZbXBjRgvT34FJz9/KQhGZKOfLA/Ai1A/V+pUuVrs2jUZvV0d/bVHXpo
bOG655/brSi+qYiH+AConkUCgYBPHFt7xqZdL2dY3GBIUqwfTGSz527gl6nECKto
g1gDFtNWzLCS8IVll63BP82u0UfQ7MaVl6nb/JqktPRcA+L6aAPNYRtphMzvIWn8
TlY7zzFWOZ445iXYBJr8qviV//Prt1ZWAVjZAqw4o4dC7PDX9gZWNn+jVmnCPt5c
SU6X5wKBgQC26hTaHhBrcev5Xkx3mRDh39JrIapUjQTSlI4sgIUK/LEir7DhB+SZ
ColChaktQx5t/vQQsFN66gi5OsS2+cnNK4lbdWwvYW5g/RW/3C6T++UjtUuKXClH
FQKm3eVBEN5lpTxWrKfIDzbIi0XZbUPYx9L+SY+qexaqYzZ68bczlg==
-----END RSA PRIVATE KEY-----`;



const jwssecret = config.get('privatekey');
const i = 'AppBee Tech';
const s = 'some@user.com';
const a = 'appBee';
const signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: config.get('expiresIn'),
  algorithm: "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
};
const key = config.get('gkey')


// function encrypt(text){
//   console.log(text)
// var mykey = crypto.createCipher('aes-128-cbc', key);
// var mystr = mykey.update(text, 'utf8', 'hex')
// mystr += mykey.final('hex');
// return mystr
// }
// router.post('/cryptopass', async(req,res,next) => {
//   console.log("crypto api calling")

//   let clipass = req.body.password;
//   let password = encrypt(clipass)
//   let test_email = 'nhnitinhegde24@gmail.com';
//   console.log(password)
//   let insertdata = `update gmail_info set password = '${password}' where id=3`;
//   let datares = await runQuery(insertdata)
//   console.log("password updated")
//   if (datares > 0) {
//       let emailContent = {
//         title: "",
//         subject: "SMTP-test",
//         html: "Hello,<br> Your SMTP gmail account credentials have been set successfully on  portal",
//         email: test_email
//       }
//       sendemail(emailContent).then((emailres) => {
//         console.log(emailres)
//         res.send("200");
//       }).catch(error => {
//         res.send("400");
//         next(error || new Error('unknown'));
//       })
//   }
// });


function decrypt(text){
  var decipher = crypto.createDecipher('aes-128-cbc',key)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
/*email sent*/
let sendemail = async (emailContent) => {
  let ginfo = `select gmail_id,password from gmail_info`;
  let infores = await runQuery(ginfo)
  let gmail = infores[0].gmail_id;
  let password = decrypt(infores[0].password);
  // let password = infores[0].password;
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmail,
        pass: password
      }
    });
    var mailOptions = {
      from: gmail,
      to: emailContent.email,
      subject: emailContent.subject,
      html: emailContent.html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });

  })
}


// login api
router.post('/isAuhtenticated', async (req, res) => {
  console.log(req.session.user)
  return req.session.user ? ture : false;
});

router.post('/logout', async (req, res) => {
  console.log(req.session.user)
  req.session.destroy();
});


router.post('/login', async (req, res) => {
  console.log("api calling",req.body)

  if (!req.body.email || !req.body.password) return res.status(400).send("Invalid email or password");
  var Active = "Active";
  let loginquery = 'SELECT id,status,name ,role_id,email,mobile FROM t_portal_users  WHERE email = ? and password=md5(?) and status=? and ustatus = ? ';
  let response = await runQuery(loginquery, [req.body.email, req.body.password, Active, 'A']);
  console.log("response",response)
  if (response.length) {
    let payload = {
      id: response[0].id,
      email: response[0].email,
      role_id: response[0].role_id,
      status: response[0].status
      // org_category:response.org_category
    }
    let token = jwt.sign(payload, privateKEY, signOptions);
    res.json({
      success: true,
      message: 'Login success',
      token: token,
      RawData: response,
      // orgcount:response.length
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid credentials',
      token: "",
      RawData: response,
    });
  }
});





router.post('/getroles', async (req, res, next) => {
  console.log("get role api calling")

  let role_id = 0;
  let role_session = req.body.role ? req.body.role : "";
  let data = req.body.role;
  // if (data == 1) {
  //   if (role_session == 0) {
  //     role_id = 0;
  //   }
    let getrole = `SELECT id,role FROM t_roles `;
    // let rolevals = [role_id];
    let roleresponse = await runQuery(getrole);
    res.status("200").json(roleresponse);
  // } else if (data == 2) {
  //   if (role_session == 0) {
  //     role_id = 0;
  //   }
  //   let getrole = `SELECT id,role FROM t_roles where id != 1 and id != 2 `;
  //   // let rolevals = [role_id];
  //   let roleresponse = await runQuery(getrole);
  //   res.status("200").json(roleresponse);
  // }


});


router.post('/getcat', async (req, res, next) => {
  console.log("get cat api calling")
  let role_id = 0;
  let cat_session = req.body.org_name ? req.body.org_name : "";
  // console.log("Session ", req.session);
  if (cat_session == 0) {
    role_id = 0;
  }
  let getrole = `SELECT org_id,org_name FROM cat_1_level_1 where org_id >= ${role_id} `;
  // let rolevals = [role_id];
  let roleresponse = await runQuery(getrole);
  res.status("200").json(roleresponse);
});

router.post('/get', async (req, res, next) => {
  console.log("get cat api calling")

  let role_id = 0;
  let cat_session = req.body.org_name ? req.body.org_name : "";
  // console.log("Session ", req.session);
  if (cat_session == 0) {
    role_id = 0;
  }
  let getrole = `SELECT org_id,org_name FROM cat_1_level_1 `;
  // let rolevals = [role_id];
  let roleresponse = await runQuery(getrole);
  res.status("200").json(roleresponse);
});

router.post('/getsub', async (req, res, next) => {
  console.log("get sub api calling")

  let role_id = 0;
  let sub_session = req.body.state_name ? req.body.state_name : "";
  // console.log("Session ", req.session);
  if (sub_session == 0) {
    role_id = 0;
  }
  let getrole = `SELECT state_id,state_name FROM cat_1_level_2 where state_id >= ${role_id} `;
  // let rolevals = [role_id];
  let roleresponse = await runQuery(getrole);
  res.status("200").json(roleresponse);
});


// adding users
router.post('/addupdateuser', async (req, res, next) => {
  // console.log(req.body, "requested par")

  let user = req.body.name ? req.body.name : "";
  let email = req.body.email ? req.body.email : "";
  let mobile = req.body.mobile ? req.body.mobile : "";
  let organization_name = req.body.organization_name ? req.body.organization_name : "";
  let role = req.body.role ? req.body.role : "";
  let Active = "Active"
  let ustatus = 'A'
  //console.log("name", user)
  let date = new Date();
  let rand = date.getTime() * (Math.floor(100000 + Math.random() * 900000));
  let usrchck = await runQuery("Select * from t_portal_users where email= '" + email + "' ");
  console.log('email', usrchck)
  if (usrchck == '') {
    // let insertdata = { name: name, mobile: mobile , email: email, role_id: role, token: rand };
    let insertQuery = "INSERT INTO t_portal_users (name,mobile,email,organization_name,role_id,token,status,ustatus) VALUES ('" + user + "','" + mobile + "','" + email + "','" + organization_name + "','" + role + "','" + rand + "','" + Active + "','" + ustatus + "')"
    let insresponse = await runQuery(insertQuery);
    console.log('new user added')
    if (insresponse) {
      let host = config.get('host_link');
      let link = host + "/setpassword?id=" + rand + "&email=" + email;
      console.log('hosting', link)


      let emailContent = {
        title: "",
        subject: "Set-password for online messaging-Portal",
        html: "Hello "+user+",<br> To Set your password first time,click the URL below.<br><a href='" + link + "'>CLICK HERE</a><br>If you did not request for your password to be set for the first time, Please ignore this email",
        email: email
      }
      sendemail(emailContent).then((emailres) => {
        console.log(emailres)
        res.send("200");
      }).catch(error => {
        next(error || new Error('unknown'))
      });
    } else {
      res.send("404");
    }
  } else {
    res.send('404')
  }

});
/***********************CRUD FOR USERS*********************/

router.post('/status', async (req, res) => {

  let id = req.body.user_id ? req.body.user_id : "";
  let active_status = req.body.Active_status ? req.body.Active_status : "";
  let sql = `UPDATE t_portal_users SET status = '${active_status}' WHERE id = ${id}`;
  console.log(sql)
  let response = await runQuery(sql)
  if (response) {
    res.send('200');
  }
  console.log(response);
});




// listing user data
router.post('/getuserlist', async (req, res) => {

  let data = req.body.role;
  console.log("data", req.body)
  // let userquery = `select * from t_portal_users`
  // let queryres = await runQuery(userquery)
  // res.send(queryres)
  let A = 'A';
  // if (data == 3) {
    let userquery = `SELECT  tpu.id, tpu.name, tpu.mobile, tpu.email, tpu.organization_name, tpu.status, tr.role FROM t_portal_users as tpu INNER JOIN t_roles as tr ON tpu.role_id = tr.id where ustatus = '${A}' and role_id != 3`;
    let response = await runQuery(userquery);
    if (response) {
      res.status("200").json(response)
    }
  // } else if (data == 2) {
  //   let userquery = `SELECT  tpu.id, tpu.name, tpu.mobile, tpu.email, tpu.status, tr.role FROM t_portal_users as tpu INNER JOIN t_roles as tr ON tpu.role_id = tr.id where [ustatus] = '${A}' and role_id != 3 and role_id != 2`;
  //   let response = await runQuery(userquery);
  //   if (response) {
  //     res.status("200").json(response)
  //   }
  // }
});

//verify reset
router.post('/verifyreset', async (req, res) => {
  console.log("verify")
  let token = req.body.id ? req.body.id : "";
  let email = req.body.email ? req.body.email : "";
  let resetquery = `SELECT * FROM t_portal_users where token= '${token}' and email='${email}'`;
  console.log(resetquery)
  // let resetvals = [token, email];
  let response = await runQuery(resetquery);
  if (response == 0) {

    res.send('404');
  } else {
    res.send('200');
  }
})


// update password
router.post('/updatepassword', async (req, res) => {
  //console.log("update",req)

  let token = req.body.token ? req.body.token : "";
  let email = req.body.email ? req.body.email : "";
  let password = req.body.password ? req.body.password : "";
  password = password.toString();
  token = token.toString();
  let updatepasswordquery = `UPDATE t_portal_users SET token = '', password=md5('${password}') WHERE email = '${email}' AND token = '${token}' `;
  console.log("sql", updatepasswordquery)
  // let vals = [password, '', email, token];
  let response = await runQuery(updatepasswordquery);
  if (response) {
    res.send("200");
  } else {
    res.send('404');
  }
})

// update user info
router.post('/updateportal', async (req, res) => {
  console.log("update")

  let id = req.body.userid ? req.body.userid : "";
  let name = req.body.name ? req.body.name : "";
  let role = req.body.role ? req.body.role : "";
  let mobile = req.body.mobile ? req.body.mobile : "";
  let email = req.body.email ? req.body.email : "";
  let organization_name = req.body.organization_name ? req.body.organization_name: "";
  let updatepasswordquery = `UPDATE t_portal_users
  SET
     name = '${name}',
     role_id = ${role},
     mobile = ${mobile},
     email = '${email}',
     organization_name = '${organization_name}'

WHERE id = ${id} `;
  console.log("sql", updatepasswordquery)
  let vals = { name: name, name, role_id: role, mobile: mobile, email: email};
  let response = await runQuery(updatepasswordquery, vals);
  if (response) {
    res.send("200");
  } else {
    res.send('404');
  }
})

let resetpassword = async (email, token) => {
  console.log("ftoken", token)

  return new Promise((resolve, reject) => {
    let qwq = runQuery(`UPDATE t_portal_users SET token= ${token}  where email='${email}'`, function (error, response, fields) {
      if (error) {
        reject(error);
      } else {
        if (response) {
          resolve(response);
        } else {
          resolve('error')
        }
      }
    })
  })
}

//forgot password
router.post('/forgotpassword', async (req, res, next) => {

  let email = req.body.email ? req.body.email : "";
  let date = new Date();
  let rand = date.getTime() * (Math.floor(100000 + Math.random() * 900000));
  rand = rand.toString();
  let usrchck = await runQuery("Select * from t_portal_users where email= '" + email + "' ");
  console.log(usrchck)
  if (usrchck != 0) {
    // res.send('200');
    // let insertdata = { token: rand };
    let insertQuery = `UPDATE t_portal_users
        SET
           token = '${rand}'
        WHERE email = '${email}' `;
    let insresponse = await runQuery(insertQuery)
    resetpassword(email, rand).then((reset) => {
      console.log(reset, "email reset");
      // let host=req.get('host');
      let host = config.get('host_link');
      let link = host + "/resetpassword?id=" + rand + "&email=" + email;

      let emailContent = {
        title: "",
        subject: "Reset-password for Online Messaging-Portal",
        html: "Hello,<br> To reset your password, click the URL below.<br><a href=" + link + ">CLICK HERE</a><br>If you did not request your password to be reset, just ignore this email and your password will continue the same.",
        email: email
      }
      // console.log(link,'qqqqqqq');
      sendemail(emailContent).then((emailres) => {
        console.log(emailres, "email sent successfully");
        res.send('200');
      }).catch(error => {
        next(error || new Error('unknown'))
      })
    }).catch(error => {
      next(error || new Error('unknown'))
    })
  } else {
    res.send('404');
  }
}
);


//delete user
router.post('/deleteuser', async (req, res) => {
  let id = req.body.userid ? req.body.userid : "";
  console.log('deleteing user', req.body)
  var sql = `update t_portal_users set ustatus = 'D' WHERE id=${id}`;
  let response = await runQuery(sql)
  console.log(response)
  if (response.affectedRows) {
    res.send('200')
  } else {
    res.send('error')
  }
});

/***********************CATEGORY CRUD OPERATION*********************/

// add category
router.post('/addcat', async (req, res, next) => {
  console.log(req.body, "requested par")

  let org_name = req.body.org_name ? req.body.org_name : "";
  let usrchck = await runQuery(`Select * from cat_1_level_1 where org_name = '${org_name}'`);
  console.log('org', usrchck)
  if (usrchck == 0) {
    let insertQuery = "INSERT INTO cat_1_level_1 (org_name) VALUES ( '" + org_name + "')"
    let insresponse = await runQuery(insertQuery);
    console.log("effected rows", insresponse, "numberrrrrrrr")
    if (insresponse) {

      res.send("200")
    }
  }else{
    res.send("404")
  }
});

//list category

router.post('/getcatlist', async (req, res) => {
  let userquery = 'SELECT  org_id,org_name FROM cat_1_level_1';
  let response = await runQuery(userquery);
  if (response) {
    res.send(response);
  }
  console.log(response);

});

//update category

router.post('/updatecat', async (req, res) => {
  console.log("update")

  let org_id = req.body.org_id ? req.body.org_id : "";
  let org_name = req.body.org_name ? req.body.org_name : "";
  let updatepasswordquery = `UPDATE cat_1_level_1
  SET
     org_name = '${org_name}' 
WHERE org_id = ${org_id} `;
  console.log("sql", updatepasswordquery)
  let response = await runQuery(updatepasswordquery);
  console.log(response, "abhi")
  if (response) {
    res.send("200");
    
  } else {
    res.send('404');
  }
});

//delete category

router.post('/deletecat', async (req, res) => {
  console.log("delete cat")

  let org_id = req.body.org_id ? req.body.org_id : "";
  console.log('deleteing cat', req.body)
  var sql = `DELETE FROM cat_1_level_1 WHERE org_id=${org_id}`;
  let response = await runQuery(sql)
  if (response.affectedRows > 0) {
    res.send("200")

  } else {
    res.send('error')
  }
});
//cat crud operation ends

/***********************SUB CATEGORY*********************/
//sub category crud operation

router.post('/addsubcat', async (req, res, next) => {

  // let cat_id = req.body.role ? req.body.role : "";
  let state_name = req.body.state_name ? req.body.state_name : "";
  // console.log(cat_id, "requested par")
  // let insertQuery = `INSERT INTO cat_1_level_2 (cat_id,sub_name) VALUES ( ${cat_id},'${sub_name}')`;
  // console.log(insertQuery)
  let usrchck = await runQuery(`Select * from cat_1_level_2 where state_name = '${state_name}'`);
  console.log('state', usrchck)
  if (usrchck == 0) {
    let insertQuery = `INSERT INTO cat_1_level_2 (state_name) VALUES ( '${state_name}')`;
    console.log(insertQuery);
    let insresponse = await runQuery(insertQuery);
  console.log("effected rows", insresponse, "numberrrrrrrr");
  if (insresponse) {

    res.send("200")
  }
  }else{
    res.send("404");
  }

});



router.post('/getsubcatlist', async (req, res) => {

  let userquery = 'SELECT * FROM cat_1_level_2'
  // let userquery = 'SELECT  sub.sub_id, sub.sub_name, cat.cat_name FROM cat_1_level_2 AS sub INNER JOIN cat_1_level_1 as cat on cat.cat_id = sub.cat_id';
  let response = await runQuery(userquery);
  if (response) {
    console.log("mmmm", response)
    res.status("200").json(response);
  }
  console.log(response);
});


router.post('/updatesubcat', async (req, res) => {
  console.log("update")

  let state_id = req.body.state_id ? req.body.state_id : "";
  let state_name = req.body.state_name ? req.body.state_name : "";

  let updatepasswordquery = `UPDATE cat_1_level_2
  SET
     state_name = '${state_name}' 
WHERE state_id = ${state_id} `;
  console.log("sql", updatepasswordquery)
  // let vals = {sub_name: sub_name};
  let response = await runQuery(updatepasswordquery);
  if (response) {
    res.send("200");
  } else {
    res.send('404');
  }
})



router.post('/deletesubcat', async (req, res) => {
  console.log("delete subcat")

  let state_id = req.body.state_id ? req.body.state_id : "";
  var sql = `DELETE FROM cat_1_level_2 WHERE state_id=${state_id}`;
  let response = await runQuery(sql)
  if (response.affectedRows > 0) {
    res.send("200")

  } else {
    res.send('error')
  }
});

//sub category ends

/***********************VIDEOS*********************/
// sending video info



//update title and description


let runQuery = async (Query, vals) => {
  return new Promise((resolve, reject) => {
    pool.query(Query, vals, function (error, response, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = router;