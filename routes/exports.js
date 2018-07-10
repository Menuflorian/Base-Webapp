var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');

var jsonUtils = require("../models/json_utils.js");

var DualboxExports = require('../models/DualboxExports');

//verif auth

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

// redirection bouton projet vers la page de création de projet//
router.get('/dual', function(req, res) {
  res.render('DualboxExports');
});
//fin de redirection//

//affichage de la liste des projets //
router.get('/api', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  var dbfind = function dbfind(selectors) {
    DualboxExports.find(selectors, {},
      function(err, dbx) {
        if (err) {
          res.send(err);
        }
        res.render('api', {
          dbData: dbx,
          admin:admin
        });
      }
    );
  };
  if (admin == true)
//visibilité reduite au projet supprimer coté admin//
    dbfind({
      deleted: true
    });

  else
//visibilité reduite des projets non supprimer spécifique du client//
    dbfind({
      ownerId: req.user._id,
      deleted: false
    });
});
//fin de l'affichage de la liste des projets//

//Enregistrement d'un nouveau projet via page projet//
router.post('/', ensureAuthenticated, function(req, res) {
  var db_export = new DualboxExports({
    name: req.body.name,
    corp: req.body.corp,
    ownerId: req.user._id,
    ownerName: req.user.name
  });
  db_export.save(function(err) {
    if (err) {
      res.send(err);
    }
    req.flash('success_msg', 'File saved successfuly');
    res.redirect('/exports/Dual');
  });
});
//fin de nouveau projet//

//Supression definitive et utilisateur, edition et restoration//
router.post('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var value = req.body.delete;
  var dbfindAndDelete = function dbfindAndDelete(paramDual, texteetat) {
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
          req.flash('success_msg', texteetat);
          res.redirect('/exports/Api');
        });
      });
  };

  if (value == "delete") {  // Supression definitive (admin)
    DualboxExports.remove({
      _id: Id
    }, function(err) {
      if (err) {
        res.send(err);
      }
      req.flash('success_msg', 'Supression definitive terminer');
      res.redirect('/exports/Api');
    });
  }else if (value == "Edit"){ // Edition de la page edit.
    DualboxExports.findById({
        _id: Id
      },
      function(err, db_export) {
        if (err) {
          res.send(err);
        }
        db_export.corp = req.body.corp;
        db_export.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          req.flash('success_msg', 'Modicication terminer');
          res.redirect('/exports/Api');
        });
      });
  } else if (value == "userdelete"){ // Supression (utilisateur)
    dbfindAndDelete(true, 'Suppression terminer.');
  }else if (value == "restore") { // Restoration (admin)
    dbfindAndDelete(false, 'Restoration terminer.');
  }
});
// fin de Supression definitive et utilisateur, edition et restoration//

//redirection edition d'un projet.
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
    dbfindOne({_id: Id});  // vers page edit coté admin.
  }else{
    dbfindOne({    // vers page edit coté client.
      _id: Id,
      deleted: false
    });
  }
});
// Fin de redirection edition d'un projet.


module.exports = router;
