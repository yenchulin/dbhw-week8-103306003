var mysql = require('mysql');
var debug = require('debug')('MYSQL');

var pool = mysql.createPool(process.env.DB_PATH || 'mysql://root:root@localhost:8889/blog');

module.exports = pool;
