const winston = require('winston');
const appRoot = require('app-root-path');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {

    // For handling the rejections during application life
    process.on('unhandledRejection', (ex)=>{
        throw ex;
    });
    
    winston.exceptions.handle(
        new winston.transports.Console({ 
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
        ) }),
        new winston.transports.File({ filename: `${appRoot}/logs/app.log` }),
        );

    winston.add(new winston.transports.File({filename: `${appRoot}/logs/app.log`}));
    winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info'
    }));
    //winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true}));
}

