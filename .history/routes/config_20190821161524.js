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

// module.exports=connectionPool;

module.exports={prod:connectionPool};

