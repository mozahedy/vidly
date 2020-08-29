module.exports = function(err, req, res, next){
    // Log errors
    res.status(500).send('Server failure');
  };