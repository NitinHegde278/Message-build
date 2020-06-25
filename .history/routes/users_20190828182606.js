var express = require('express');
var router = express.Router();
// const config = require("config");
const pool = require("./dbconnection");

/* GET users listing. */
router.get('/users', async (req, res, next)=> {
  let userdata={
    data:[],
    total:0
  }
  let response = await runQuery("SELECT * FROM users", []);
  if (response) {
    userdata.data=response;
    userdata.total=response.length;
    res.status(200).json({ status: "OK", message: "ok", data: response });    
  }else{
    res.status(200).json({ status: "NOK", message: "NO DATA", data: [] });  
  }
});
router.post('/delete', async (req, res, next)=> {
  let  =req.body.email ? req.body.email : '';
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
