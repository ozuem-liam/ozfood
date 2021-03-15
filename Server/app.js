require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors')
const router = express.Router();
const passport = require('passport');
// var LocalStratgy = require('passport-local').Strategy;

var pg = require('pg');

// var conString = 
// "" //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log("Connected to database");
//     // >> output: 2018-08-23T14:02:57.117Z
//     // client.end();
//   });
// });

dotenv.config();

// Set up the express app
const app = express();

app.use(cors());

// Log request to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('secret', process.env.TOKEN_SECRET);

// Setup a default catch-all route that sends back a welcome message in JSON format
// Setup a default catch-all route that sends back a welcome message in JSON format
require('./server/routes').default(app); // Require our routes into the application
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to OZ Food Restaurant..',
}));

app.listen( console.log('Server as started at port 8000') );

module.exports = app;
