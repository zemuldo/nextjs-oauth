const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')

require('dotenv').config()
require('./db/mongoose');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

// allow cors from all - no hustle and never safe
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})

app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))

// start server
app.listen(3001, () => console.log("Server listening on http://localhost:3001"))