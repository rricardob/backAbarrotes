const winston = require("winston");
const config = require("../config/index");
const Utils = require("../util");

const transports = []
const AppName = config.applicationName

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${config.logs.path}${AppName}-${Utils.getCurrentTimeStamp()}.log` })
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            )
        }),
        new winston.transports.File({ filename: `${config.logs.path}${AppName}-${Utils.getCurrentTimeStamp()}.log` })
    )
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
});

module.exports = {
    Logger: LoggerInstance
}