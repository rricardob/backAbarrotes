const winston = require("winston");
const config = require("../config/index");
const Utils = require("../util");
const path = require('path')

const { format, transports } = winston


const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

//const transports = []
const AppName = config.applicationName

/*if (process.env.NODE_ENV !== 'development') {
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
        winston.format.simple(),
        winston.format.json()
    ),
    transports
});*/

const LoggerInstance = winston.createLogger({
    level: config.node.env === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        }),
        new transports.File({
            filename: `${config.logs.path}${AppName}-${Utils.getCurrentTimeStamp()}.log`,
            format: format.combine(
                format.json(),
                format.prettyPrint()
            )
        })
    ],
    exitOnError: false
})

module.exports = {
    Logger: LoggerInstance
}