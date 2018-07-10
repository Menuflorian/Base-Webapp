var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');


//  redirection vers la page Register
router.get('/Register', function(req, res) {
  res.render('Register');
});
//fin de redirection//

// redirection vers la page Login
router.get('/Login', function(req, res) {
  res.render('Login');
});
//fin de redirection//


// recupération des information envoyer via page register//
router.post('/Register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('Register', {
      errors: errors
    });
  } else {
    //checking for email and username are already taken
    User.findOne({
      username: {
        "$regex": "^" + username + "\\b",
        "$options": "i"
      }
    }, function(err, user) {
      User.findOne({
        email: {
          "$regex": "^" + email + "\\b",
          "$options": "i"
        }
      }, function(err, mail) {
        if (user || mail) {
          res.render('Register', {
            user: user,
            mail: mail
          });
        } else {
          var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
          });
          User.createUser(newUser, function(err, user) {
            if (err) throw err;
          });
          req.flash('success_msg', 'You are registered and can now login');
          res.redirect('/users/Login');
        }
      });
    });
  }
});
//fin de traitement//


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/Login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/Login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/Logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/Login');
});

module.exports = router;
