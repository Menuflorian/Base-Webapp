var express = require('express'),
  jsonUtils = require("../models/json_utils.js");
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var DualboxExports = require('../models/DualboxExport');
var session = require('express-session');

//verif auth

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

// redirection bouton DualboxExports
router.get('/dual', function(req, res) {
  res.render('DualboxExports');
});

//affichage DB script
router.get('/api', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  if (admin == true)
    DualboxExports.find({}, {},
      function(err, dbx) {
        if (err) {
          res.send(err);
        }
        res.render('api', {
          dbData: encodeURI(JSON.stringify(dbx))
        });
      }
    );
  else
    DualboxExports.find({
        ownerId: req.user._id,
        deleted: false
      }, {},
      function(err, dbx) {
        if (err) {
          res.send(err);
        }
        res.render('api', {
          dbData: encodeURI(JSON.stringify(dbx))
        });
      }
    );

});

//Enregistrement d'un projet via page jrojet
router.post('/', ensureAuthenticated, function(req, res) {
  var dualboxExports = new DualboxExports({
    name: req.body.name,
    corp: req.body.corp,
    ownerId: req.user._id
  });
  dualboxExports.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send({
      message: "Exports crée "
    });
  });
});



//supression d'un projet.
router.post('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var value = req.body.delete;

  if (value == "delete")
    DualboxExports.remove({
      _id: Id
    }, function(err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: "DBX supprimé"
      });
    });

  else if (value == "edit")
    DualboxExports.findById({
        _id: Id
      },
      function(err, dualboxExports) {
        if (err) {
          res.send(err);
        }
        dualboxExports.corp = req.body.corp;
        dualboxExports.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          res.send({
            message: "Exports crée "
          });
        });
      });

  else if (value == "userdelete")
    DualboxExports.findById({
        _id: Id
      },
      function(err, dualboxExports) {
        if (err) {
          res.send(err);
        }
        dualboxExports.deleted = true;
        dualboxExports.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          res.send({
            message: "Exports crée "
          });
        });
      });
  else if (value == "restore")
    DualboxExports.findById({
        _id: Id
      },
      function(err, dualboxExports) {
        if (err) {
          res.send(err);
        }
        dualboxExports.deleted = false;
        dualboxExports.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          res.send({
            message: "Exports crée "
          });
        });
      });
});


//redirection edition d'un projet.
router.get('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  if (admin == true)
    DualboxExports.findOne({}, {}, {},
      function(err, Proj) {
        if (err) {
          res.send(err);
        }
        res.render('edit', {
          DataPro: encodeURI(JSON.stringify(Proj))
        });
      }
    );
  else
    DualboxExports.findOne({
        _id: Id,
        deleted: false
      }, {}, {},
      function(err, Proj) {
        if (err) {
          res.send(err);
        }
        res.render('edit', {
          DataPro: encodeURI(JSON.stringify(Proj))
        });
      }
    );
});


module.exports = router;
