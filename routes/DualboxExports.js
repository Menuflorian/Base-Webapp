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

// redirection bouton projet vers la page de création de projet//
router.get('/dual', function(req, res) {
  res.render('DualboxExports');
});
//fin de redirection//

//affichage de la liste des projets //
router.get('/api', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  var dbfind = function dbfind(recherche2) {
    DualboxExports.find(recherche2, {},
      function(err, dbx) {
        if (err) {
          res.send(err);
        }
        res.render('api', {
          dbData: encodeURI(JSON.stringify(dbx))
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
//fin de fonction//

//Enregistrement d'un nouveau projet via page projet//
router.post('/', ensureAuthenticated, function(req, res) {
  var dualboxExports = new DualboxExports({
    name: req.body.name,
    corp: req.body.corp,
    ownerId: req.user._id,
    ownerName: req.user.name
  });
  dualboxExports.save(function(err) {
    if (err) {
      res.send(err);
    }
    req.flash('success_msg', 'Enregistrement terminer');
    res.redirect('/DualboxExports/dual');
  });
});
//fin de nouveau projet//

//partit commune des fonctions: supression definitive et utilisateur, edition et restoration//
router.post('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var value = req.body.delete;
  var delresed = function delresed(paramDual) {
    //fonction supression et restoration factoriser//
    DualboxExports.findById({
        _id: Id
      },
      function(err, dualboxExports) {
        if (err) {
          res.send(err);
        }
        dualboxExports.deleted = paramDual;
        dualboxExports.save(function(err, majdata) {
          if (err) {
            res.send(err);
          }
          req.flash('success_msg', 'Modicication terminer');
          res.redirect('/DualboxExports/api');
        });
      });
  };
//fin de la partit commune//

// fonction de supression definitive (admin)//
  if (value == "delete")
    DualboxExports.remove({
      _id: Id
    }, function(err) {
      if (err) {
        res.send(err);
      }
      req.flash('success_msg', 'Supression definitive terminer');
      res.redirect('/DualboxExports/api');
    });
// fin de fonction supression//

// fonction edition de la page edit.
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
          req.flash('success_msg', 'Modicication terminer');
          res.redirect('/DualboxExports/api');
        });
      });
//fin de la fonction edition//

// fonction supression (utilisateur) et restoration (admin)//
  else if (value == "userdelete")
    delresed(true);

  else if (value == "restore")
    delresed(false);
//fin des fonction supression et restoration//
});



//redirection edition d'un projet.
router.get('/:id', ensureAuthenticated, function(req, res) {
  var Id = req.params.id;
  var admin = req.user.isAdmin;
  var search = function search(recherche) {
    DualboxExports.findOne(recherche, {}, {},
      function(err, Proj) {
        if (err) {
          res.send(err);
        }
        res.render('edit', {
          DataPro: encodeURI(JSON.stringify(Proj))
        });
      });
  };

  if (admin == true)
    search({});  // vers page edit coté admin.

  else
    search({    // vers page edit coté client.
      _id: Id,
      deleted: false
    });
});
module.exports = router;
