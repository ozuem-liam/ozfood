require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
// var LocalStratgy = require('passport-local').Strategy;

// Set up the express app
const app = express();

// Log request to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Setup a default catch-all route that sends back a welcome message in JSON format
require('./server/routes')(app); // Require our routes into the application
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to OZ Food Restaurant..',
}));

app.listen( console.log('Server as started at port 8000') );

module.exports = app;
