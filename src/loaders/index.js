const { expressLoader } = require("./express");
const { sql } = require('../services/mysql/index');
const { Logger } = require("./logger");

const Up = async (expressApp ) => {
  sql.connect(err => {
    err
      ? Logger.error(`Connection Failed ${err.stack}`)
      : Logger.info('✌️ DB loaded and connected!');
  });

  await expressLoader(expressApp );
  Logger.info('✌️ Express loaded');
};

module.exports = {
  expressApp: Up
}