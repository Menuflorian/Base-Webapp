var express = require('express'),
    jsonUtils = require("../models/json_utils.js");
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var DualboxExports = require('../models/DualboxExport');
var session = require('express-session');

//verif auth

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

// redirection bouton DualboxExports

router.get('/dual', function (req, res) {
		res.render('DualboxExports');
});


//affichage DB script

router.get('/api',ensureAuthenticated , function(req, res) {
	DualboxExports.find(
			{ownerId: req.user._id},
			{} ,
			function(err, dbx){
				if(err){
					res.send(err);
				}
					res.render('api', {dbData : encodeURI(JSON.stringify(dbx))});
			}
	);
});

//Enregistrement de la page script

router.post('/',ensureAuthenticated , function (req, res) {
		var dualboxExports = new DualboxExports({
		name: req.body.name,
		corp: req.body.corp,
		ownerId: req.user._id
	});
		dualboxExports.save(function(err){
			if(err){
					res.send(err);
			}
			res.send({message: "Exports crée "});
		});
});


//supression d'un scripts.
/*
router.delete("/:projet_id",ensureAuthenticated, function(req,res){
		dualboxExports.remove({_id: req.params.projet_id}, function (err){
				if(err){
						res.send(err);
				}
				res.send({message: "DBX supprimé"});
			});
});
*/
//redirection btn edit
router.get('/:id', ensureAuthenticated, function (req, res) {

  var Id = req.params.id;
  console.log(req.params.id);
  DualboxExports.findOne(
      {_id: Id},
      {} ,
      {} ,
      function(err, Proj){
        if(err){
          res.send(err);
        }
      res.render('edit', {DataPro : encodeURI(JSON.stringify(Proj))});
      }
  );
});



//modification du corp
router.post('/put/:id',ensureAuthenticated , function (req, res) {
  var Id = req.params.id ;
  DualboxExports.findOne(
      {_id: Id},
      {} ,
      {} ,
      function(err, dualboxExports){
        dualboxExports={};
        dualboxExports.name= req.body.name;
    		dualboxExports.corp= req.body.corp;
    		dualboxExports.owneId= req.user._id;

        dualboxExports.save(function(err){
          if(err){
            res.send(err);
            }
          res.send({message: "Exports crée "});
          });
        });
      });


module.exports = router;
