'use strict';

//use .env file 
require('dotenv').config();

//import db
const { db } = require('./src/models');

//import server
const { start } = require('./src/server.js');

//set PORT to .env PORT
const PORT =  process.env.PORT;

//connect to db then start server
db.sync()
  .then(() => start(PORT))
  .catch(err => console.log(err));