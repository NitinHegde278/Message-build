var express = require('express');
var router = express.Router();
// const config = require("config");
const pool = require("./dbconnection");

/* GET users listing. */
router.get('/users', async (req, res, next)=> {
  let response = await runQuery("SELECT * FROM users", []);
  if (response) {
    res.status(200).json({ status: "OK", message: "ok", data: response });    
  }else{
    res.status(200).json({ status: "NOK", message: "NO DATA", data: [] });  
  }
});
router.post('/useradd', async (req, res, next)=> {
  console.log(req.body,'ddddddddd')
  let getquery = "insert into users set ?";
  let vals = req.body;
  let response = await runQuery(getquery, vals);
  console.log(response)
  // // if (response) {
    res.send(response);
  // // }
});
router.post('/useredit', async (req, res, next)=> {
  console.log(req.body,'ddddddddd')
  let email =req.body.email ? req.body.email : '';
  //let mobile=req.body.mobile ? req.body.mobile : '';
  let name=req.body.name ? req.body.name : '';
  let id=req.body.id ? req.body.id : '';
  let getquery = "update users set email=?,name=? where id=?";
  let vals = [email,name,id];
  let response = await runQuery(getquery, vals);
  console.log(response)
  // // if (response) {
    res.send(response);
  // // }
});
router.post('/addcordinate', async (req, res, next)=> {
  console.log(req.body,'ddddddddd')
  let getquery = "insert into cordinates set ?";
  let vals = req.body;
  let response = await runQuery(getquery, vals);
  console.log(response)
  // // if (response) {
    res.send(response);
  // // }
});


// app.get('/dashboard', function (request, response) {
// 	if (request.session.loggedin) {
// 		response.render('dashboard');
// 	} else {
// 		response.redirect('localhost:3000');
// 	}
// 	response.end();
// });

let runQuery = async (Query, vals) => {
  return new Promise((resolve, reject) => {
    pool.query(Query, vals, function(error, response, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
module.exports = router;
