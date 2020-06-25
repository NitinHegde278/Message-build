/**
 * Created by Siddharth on 20-Aug-19.
 */
 var mysql=require('mysql');

var connectionPool = mysql.createPool({
    connectionLimit : 10000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

var superSecreate= {
    'secret': 'QB@2018'
  };
// module.exports=connectionPool;

module.exports={qa:qaConnectionPool,dev:devConnectionPool,prod:connectionPool,key:superSecreate};

