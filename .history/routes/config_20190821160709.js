/**
 * Created by nishu on 30-march-18.
 */
 var mysql=require('mysql');

// var connectionPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'PHPBasics',
//     database: 'qb'
// })

// //connection qa database
// var qaConnectionPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'PHPBasics',
//     database: 'qb_qa'
// });

// //connection dev database
// var devConnectionPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'PHPBasics',
//     database: 'qb_dev'
// });

var connectionPool = mysql.createPool({
    connectionLimit : 10000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mpm_layout_db'
})

var superSecreate= {
    'secret': 'QB@2018'
  };
// module.exports=connectionPool;

module.exports={qa:qaConnectionPool,dev:devConnectionPool,prod:connectionPool,key:superSecreate};

