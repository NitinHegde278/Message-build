var express = require('express');
var router = express.Router();
// const config = require("config");
const pool = require("./dbconnection");

router.post('/login', async (req, res, next)=> {
  let email=req.body.username ? req.body.username : '';
  let password=req.body.password ? req.body.password : '';
  let getquery = "SELECT * FROM login where username=? and password=?";
  let vals = [email,password];
  let response = await runQuery(getquery, vals);
  if (response.length==0) {
    res.send(response);
  }else{
    res.send('404');
  }
});
let runQuery = async (Query, vals) => {
  return new Promise((resolve, reject) => {
    pool.query(Query, vals, function(error, response, fields) {
      if (error) {
        // console.log(error,'errrr')
        reject({ status: "NOK"});
      } else {
        resolve(response);
      }
    });
  });
};
module.exports = router;
