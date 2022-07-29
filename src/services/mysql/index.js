const mysql = require('mysql2');
const config = require('../../config');

const dbconnection = mysql.createConnection({
  host: config.databaseURL,
  user: config.databaseUSER,
  password: config.databasePASS,
  database: config.databaseDB,
  port: config.databasePORT,
  multipleStatements: config.multipleStatements
});

module.exports = {
  sql: dbconnection
}