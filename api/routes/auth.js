const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-github');

const users = require('../db/services/user');
const JWT_KEY = "something_private_and_long_enough_to_secure"

const router = express();

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://localhost:3001/github/callback`
},

function (accessToken, refreshToken, profile, cb) {
  users.findOrCreate(profile);
  return cb(null, profile);
}
));

router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', { scope: [], state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  next();
});

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
    const token = jwt.sign({id: data}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      if (err) return next(err); ;
      res.set('token', token);
      res.redirect('/profile')
    });
        
  },
);
module.exports = router;