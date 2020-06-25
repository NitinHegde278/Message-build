const mysql = require("mysql");
const config = require('config');

const pool = mysql.createPool(config.get('connectionPool'))

pool.on('connection', function (connection) {
    console.log('DB Connection established');

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });

    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });

});
  
module.exports = pool;