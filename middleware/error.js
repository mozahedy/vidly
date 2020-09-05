const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log errors
    winston.error(err.message, err);
    // error
    // warning
    // info
    // verbose
    // debug
    // silly
    res.status(500).send('Server failure');
  };