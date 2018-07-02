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

router.delete("/:_id", function(req,res){
		dualboxExports.remove({_id: req.params.dualboxExports_id}, function (err){
				if(err){
						res.send(err);
				}
				res.send({message: "DBX supprimé"});
			});
});


module.exports = router;
