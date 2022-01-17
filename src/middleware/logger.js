'use strict';

function logger(req, res, next){
  console.log('LOG: method:', req.method, ' path: ', req.path);
  next();
}

module.exports = logger;