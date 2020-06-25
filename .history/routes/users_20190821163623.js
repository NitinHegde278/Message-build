var express = require('express');
var router = express.Router();
const config = require("config");
const pool = require("../dbconnection");

/* GET users listing. */
router.get('/', function(req, res, next) {
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
