var express = require('express');
var router = express.Router();
// const config = require("config");
const pool = require("./dbconnection");

/* GET users listing. */
router.get('/users', async (req, res, next)=> {
  let userdata={
    data:[],
    total:''
  }
  let email=req.body.email ? req.body.email : '';
  let mobile=req.body.mobile ? req.body.mobile : '';
  let name=req.body.name ? req.body.name : '';
  let password=req.body.password ? req.body.password : '';
  let getquery = "SELECT * FROM users";
  let vals = [];
  let response = await runQuery(getquery, vals);
  if (response) {
    userdata.data=response;
    userdata.total=response.length;
    // res.send(response);
    res.status(200).json({ status: "OK", message: "ok", data: userdata });    
  }else{
    
  }
});
router.post('/login', async (req, res, next)=> {
  let email=req.body.email ? req.body.email : '';
  let mobile=req.body.mobile ? req.body.mobile : '';
  let name=req.body.name ? req.body.name : '';
  let password=req.body.password ? req.body.password : '';
  let getquery = "SELECT * FROM users";
  let vals = [];
  let response = await runQuery(getquery, vals);
  // if (response) {
    res.send(response);
  // }
});
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
