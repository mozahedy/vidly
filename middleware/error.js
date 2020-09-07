const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log errors
    //winston.error(err.message, err);
    // Set locals only, providing error in development

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //winston.error(`${err.status || 500 } - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    winston.error(err.message, err);
    res.status(500).send('Server failure');
    res.render('error');
  };