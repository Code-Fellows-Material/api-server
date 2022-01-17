'use strict';

function notFound(req, res, next){
  console.error('NOT FOUND ERROR: no route found');
  res.status(404).send('Not Found');
}

module.exports = notFound;