var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = require('../models/user');
var DualboxExports = require('../models/DualboxExports');
var bcrypt = require('bcryptjs');


//-------------------------Function----------------------------

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

//-------------------------get----------------------------

//Get access to a specific user profile.
router.get('/admin-edit-profile/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  User.find({
      _id: id
    },
    function(err, db_user) {
      if (err) {
        res.send(err);
      }
      var data = {
        layout: 'layout3',
        db_user: db_user
      };
      res.render('admin-edit-profile', data);
    });
});

//Redirection to index admin
router.get('/admin', ensureAuthenticated, ensureAdmin, function(req, res) {
  res.render('admin', {
    layout: 'layout3'
  });
});

//Redirection to the table user list.
router.get('/admin-userlist', ensureAuthenticated, ensureAdmin, function(req, res) {
  User.find({},
    function(err, userlist) {
      if (err) {
        res.send(err);
      }
      var data = {
        layout: 'layout3',
        db_user: userlist
      };
      res.render('admin-userlist', data);
    });
});


//Render a menu to administrate a profile.
router.get('/admin-edit-user/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  User.find({
      _id: id
    },
    function(err, userdetail) {
      if (err) {
        res.send(err);
      }
    DualboxExports.find({
     	ownerId: id
        },
        function(err, db_export) {
          if (err) {
            res.send(err);
          }
          var data = {
            layout: 'layout3',
            db_user: userdetail,
            db_data: db_export
          };
          res.render('admin-edit-user', data);
        });
    });
});

//Redirection to change password of a specific user.
router.get('/admin-change-password/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  User.find({
      _id: id
    },
    function(err, userdetail) {
      if (err) {
        res.send(err);
      }
      var data = {
        layout: 'layout3',
        db_user: userdetail,
      };
      res.render('admin-change-password', data);
    });
});

//-------------------------post----------------------------

//Change the users information in Db.
router.post('/admin-edit-profile/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) res.send(err);
      if (name == "") {
        name = db_user.name;
      } else {
        db_user.name = req.body.name;
      }
      if (username == "") {
        username = db_user.username;
      } else {
        db_user.username = req.body.username;
      }
      if (email == "") {
        email = db_user.email;
      } else {
        db_user.email = req.body.email;
      }
      db_user.save(function(err, majdata) {
        if (err) {
          res.sendStatus(404);
        }
      res.sendStatus(200);
        //req.flash('success_msg', 'Modicication terminer');
        //res.redirect('/admin/admin-edit-profile/'+id);
      });
    });
});

//Change password userpassword in Db.
router.post('/admin-change-password/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  var password = req.body.password;
  var password2 = req.body.password2;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) {
        res.sendStatus(200);
      }
      if (password != password2) {
        res.sendStatus(404);
        //req.flash('error_msg', "New password don't match with cofirm password");
        //res.render('admin-change-password', {
        //  layout: 'layout3'
        //});
      } else {
        db_user.password = bcrypt.hashSync(password, 10);
        db_user.save(function(err) {
          if (err) {
            res.sendStatus(404);
          }
          res.sendStatus(200);
          //req.flash('success_msg', "Password has been changed");
          //res.redirect('/admin/admin-edit-use/'+id);
        });
      }
    }
  );
});


//validate users
router.post('/admin-validate-user/:id', ensureAuthenticated, function(req, res) {
  var id = req.params.id;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) {
        res.send(err);
      }
      db_user.validated = true;
      db_user.save(function(err) {
        if (err) {
          res.sendStatus(404);
        }
        res.sendStatus(200);
        //req.flash('success_msg', 'User is now validated');
        //res.redirect('/admin/admin-userlist');
      });
    });
});

//Make a user an admin.
router.post('/admin-makeadmin-user/:id', ensureAuthenticated, function(req, res) {
  var id = req.params.id;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) {
        res.sendStatus(err);
      }
      db_user.isAdmin = true;
      db_user.save(function(err) {
        if (err) {
          res.sendStatus(404);
        }
        res.sendStatus(200);
        //req.flash('success_msg', db_user.name + ' is now an admin');
        //res.redirect('/admin/admin-userlist');
      });
    });
});

//Remove admin right.
router.post('/admin-removeadmin-user/:id', ensureAuthenticated, function(req, res) {
  var id = req.params.id;
  User.findById({
      _id: id
    },
    function(err, db_user) {
      if (err) {
        res.send(err);
      }
      db_user.isAdmin = false;
      db_user.save(function(err) {
        if (err) {
          res.sendStatus(404);
        }
        res.sendStatus(200);
        //req.flash('success_msg', db_user.name + ' is not longer an admin');
        //res.redirect('/admin/admin-userlist');
      });
    });
});

// Delete a user.
router.post('/admin-delete-user/:id', ensureAuthenticated, ensureAdmin, function(req, res) {
  var id = req.params.id;
  User.remove({
      _id: id
    },
    function(err) {
      if (err) {
        res.sendStatus(404);
      }
      res.sendStatus(200);
      //req.flash('success_msg', 'User has been deleted');
      //res.redirect('/admin/admin');
    });
});


module.exports = router;
