var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');

var formaDate = function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

router.get('/register', function(req, res) { //  redirection vers la page Register
  res.render('register');
});


router.get('/profile', ensureAuthenticated,  function(req, res) {  //  redirection vers la page profile
  res.render('profile');
});

router.get('/eprofile', ensureAuthenticated,  function(req, res) {  //  redirection vers la page edit profile
  res.render('eprofile');
});


router.get('/login', function(req, res) { // redirection vers la page Login
  res.render('login');
});



// recupération des information envoyer via page register//
router.post('/register', function(req, res) {
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
    res.render('register', {
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
          res.render('register', {
            user: user,
            mail: mail
          });
        } else {
          var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            registerdate: formaDate(new Date()),
          });
          User.createUser(newUser, function(err, user) {
            if (err) throw err;
          });
          req.flash('success_msg', 'You are registered and can now login');
          res.redirect('/users/login');
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

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

router.post('/eprofile', function(req, res) {
  var Id= req.user._id;
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;

  User.findById({
      _id: Id
    },
    function(err, db_user) {
      if (err) res.send(err);
      if (name == "") { name = req.user.name;}
      else {db_user.name = req.body.name;}
      if (username == "") { username = req.user.username;}
      else {db_user.username = req.body.username;}
      if (email == "") { email = req.user.email;}
      else {db_user.email = req.body.email;}
      db_user.save(function(err, majdata) {
        if (err) {
          res.send(err);
        }
        req.flash('success_msg', 'Modicication terminer');
        res.redirect('/users/profile');
      });
    });
});
module.exports = router;
