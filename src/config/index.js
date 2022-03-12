
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = require ('dotenv').config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {

  applicationName: process.env.APPLICATION_NAME,

  applicationDescription: process.env.APPLICATION_DESCRIPCION,

  applicationVersion: process.env.npm_package_version,

  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MYSQL_URI,
  databaseDB: process.env.MYSQL_DB,
  databaseUSER: process.env.MYSQL_USER,
  databasePASS: process.env.MYSQL_PASSWORD,
  databasePORT: process.env.MYSQL_PORT,


  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    path: process.env.LOG_PATH
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  }
};

module.exports = config;