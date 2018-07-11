var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');
var DualboxExports = require('../models/dualboxExports');

//Check auth

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

function ensureAdmin(req, res, next) {
  if (req.user && req.user.isAdmin == true) {
    return next();
  } else {
    req.flash('error_msg', 'This part is reserved to admin');
    res.redirect('/users/login');
  }
}

// redirection to new project//
router.get('/dual', function(req, res) {
  res.render('dualboxExports');
});

router.get('/projects:folio', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var folio = req.params.folio;
  var admin = req.user.isAdmin;
  var dbfind = function dbfind(selectors) {
    DualboxExports.find(selectors, {},
      function(err, dbx) {
        if (err) {
          res.send(err);
        }
        res.render('projects'+ folio, {
          dbData: dbx,
          admin:admin
        });
      }
    );
  };
  if (admin == true)
    dbfind({
      deleted: true
    });

  else
    dbfind({
      ownerId: req.user._id,
      deleted: false
    });
});


//save new project//
router.post('/', ensureAuthenticated, function(req, res) {
  var db_export = new DualboxExports({
    name: req.body.name,
    corp: req.body.corp,
    ownerId: req.user._id,
    ownerName: req.user.name,
    lastedit: Date(),
    creationdate: Date()
  });
  db_export.save(function(err) {
    if (err) {
      res.send(err);
    }
    req.flash('success_msg', 'File saved successfuly');
    res.redirect('/exports/dual');
  });
});

//Delet from user and admin
router.post('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var value = req.body.delete;
  var folio = req.params.folio;
  var dbfindAndDelete = function dbfindAndDelete(paramDual, statetext) {
    DualboxExports.findById({
        _id: Id
      },
      function(err, db_export) {
        if (err) {
          res.send(err);
        }
        db_export.deleted = paramDual;
        db_export.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          req.flash('success_msg', statetext);
          res.redirect('/');
        });
      });
  };

  if (value == "delete") {  // Delete (admin)
    DualboxExports.remove({
      _id: Id
    }, function(err) {
      if (err) {
        res.send(err);
      }
      req.flash('success_msg', 'Final delete finish');
      res.redirect('/');
    });
  }else if (value == "Edit"){ // Edit page from edit.
    DualboxExports.findById({
        _id: Id
      },
      function(err, db_export) {
        if (err) {
          res.send(err);
        }
        db_export.corp = req.body.corp;
        db_export.lastedit = Date();
        db_export.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          req.flash('success_msg', 'Edit finish');
          res.redirect('/');
        });
      });
  } else if (value == "userdelete"){ // Delete (utilisateur)
    dbfindAndDelete(true, 'Delete finish.');
  }else if (value == "restore") { // Restoration (admin)
    dbfindAndDelete(false, 'Restoration finish.');
  }
});


//Edit project redirection.
router.get('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  var dbfindOne = function dbfindOne(selectors) {
    DualboxExports.findOne(selectors, {}, {},
      function(err, db_export) {
        if (err) {
          res.send(err);
        }
        res.render('Edit', {
          DataPro: encodeURI(JSON.stringify(db_export))
        });
      });
  };

  if (admin == true) {
    dbfindOne({_id: Id});  // To edit page admin side
  }else{
    dbfindOne({    // To edit page client side.
      _id: Id,
      deleted: false
    });
  }
});

module.exports = router;
