'use strict';

// const dogRoutes = require('./routes/dog.routes');
const foodRoutes = require('./routes/food.routes');

const logger = require('./middleware/logger');
const express = require('express');

const app = express();

//-------------------------- Middleware --------------------------

app.use(express.json()); // Turn a JSON String into valid JSON
app.use(logger); //Console log the method and path
// app.use(dogRoutes);
app.use(foodRoutes);


module.exports = {
  start: (port) => {
    app.listen(port, () => console.log('listening on: ', port));
  },
  app,
};