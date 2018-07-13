var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = require('../models/user');
var DualboxExports = require('../models/DualboxExports');
var bcrypt = require('bcryptjs');

//Check Auth
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

//Check admin
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin == true) {
    return next();
  } else {
    req.flash('error_msg', 'This part is reserved to admin');
    res.redirect('/users/login');
  }
}

router.get('/admin-edit-profile:id', ensureAuthenticated, ensureAdmin,  function(req, res) {
  var id = req.params.id;
  User.find({_id : id},
    function(err, db_user) {
      if (err) {
        res.send(err);
      }
      var data = {
        layout: 'layout3',
        db_User: db_user
      };
  res.render('admin-edit-profile', data);
});
});

router.post('/admin-edit-profile:id',ensureAuthenticated, ensureAdmin, function(req, res) {
  var id= req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) res.send(err);
      if (name == "") { name = db_user.name;}
      else {db_user.name = req.body.name;}
      if (username == "") { username = db_user.username;}
      else {db_user.username = req.body.username;}
      if (email == "") { email = db_user.email;}
      else {db_user.email = req.body.email;}
      db_user.save(function(err, majdata) {
        if (err) {
          res.send(err);
        }
        req.flash('success_msg', 'Modicication terminer');
        res.redirect('/admin/admin-edit-profile'+id);
      });
    });
});


router.get('/admin', ensureAuthenticated, ensureAdmin,  function(req, res) {  //  redirection to administration
  res.render('admin', {layout:'layout3'});
});

router.get('/userlist', ensureAuthenticated, ensureAdmin,  function(req, res) {  //  redirection to the list of users
  User.find({},
    function(err, userlist) {
      if (err) {
        res.send(err);
      }
      var data = {
        layout: 'layout3',
        db_User: userlist
      };
      res.render('userlist', data);
    });
});

router.get('/admin-edit-user:id', ensureAuthenticated, ensureAdmin,  function(req, res) {
  var id =req.params.id;
  User.find({_id : id},
    function(err, userdetail) {
      if (err) {
        res.send(err);
      }
      DualboxExports.find({ownerId : id},
        function(err, db_export) {
          if (err) {
            res.send(err);
          }
      var data = {
        layout : 'layout3',
        db_User : userdetail,
        db_Data : db_export
      };
      res.render('admin-edit-user', data);
    });
  });
});


module.exports = router;
