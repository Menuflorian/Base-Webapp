var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');
var Projects = require('../models/Projects');
var AuthUtils = require('../server/AuthUtils');
var Errors = require('../server/Errors');

//Factorisation funcion to edit: deleted, corp, lasedit argument on a project
function dbfindAndUpdate(id, params) {
    Projects.findById({
            _id: id
        },
        function(err, db_export) {
            if (err) {
                res.status(500).send(new Errors.ApplicationError("Project not found."));
            }
            if (params.deleted !== undefined) {
                db_export.deleted = params.deleted;
            }
            if (params.corp !== undefined) {
                db_export.corp = params.corp;
            }
            if (params.corp !== undefined) {
                db_export.lastedit = params.lastedit;
            }
            db_export.save(function(err, majdata) {
                if (err) {
                    res.status(500).send(new Errors.ApplicationError("Error while saving the project."));
                }
            });
        }
    );
}

//-------------------------get----------------------------

// redirection to new project//
router.get('/new', AuthUtils.ensureAuthenticated, function(req, res) {
    res.render('projects-new');
});

//redirection on a portefolio with project
router.get('/list:folio', AuthUtils.ensureAuthenticated, function(req, res) {
    var Id = req.params.id;
    var folio = req.params.folio;
    var admin = req.user.isAdmin;
    var dbfind = function dbfind(selectors) {
        Projects.find(selectors, {},
            function(err, dbx) {
                if (err) {
                    res.send(err);
                }
                res.render('projects-list' + (folio === undefined ? 3 : folio), {
                    dbData: dbx,
                    admin: admin
                });
            }
        );
    };
    if (admin == true) {
        dbfind({});
    } else {
        dbfind({
            ownerId: req.user._id,
            deleted: false
        });
    }
});

//Edit project redirection.
router.get('/view/:id', AuthUtils.ensureAuthenticated, function(req, res) {
    var Id = req.params.id;
    var admin = req.user.isAdmin;
    var dbfindOne = function dbfindOne(selectors) {
        Projects.findOne(selectors, {}, {},
            function(err, db_export) {
                if (err) {
                    res.send(err);
                }
                res.render('projects-view', {
                    dbData: db_export
                });
            });
    };
    if (admin == true) {
        dbfindOne({
            _id: Id
        }); // To edit page admin side
    } else {
        dbfindOne({ // To edit page client side.
            _id: Id,
            deleted: false
        });
    }
});


//-------------------------post----------------------------

// Delete a project
router.post('/admindelete/:id', AuthUtils.ensureAdmin, function(req, res) {
    var id = req.params.id;
    Projects.remove({
            _id: id
        },
        function(err) {
            if (err) {
                res.status(500).send(new Errors.ApplicationError("Error while removing the project."));
            }
            res.status(200);
        });
});

//Restore a project
router.post('/restore/:id', AuthUtils.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    dbfindAndUpdate(
        id, {
            deleted: false
        }
    );
    res.sendStatus(200);
});

//user delet
router.post('/userdelete/:id', AuthUtils.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    dbfindAndUpdate(
        id, {
            deleted: true
        }
    );
    res.sendStatus(200);
});

//Delet from user and admin
router.post('/save/:id', AuthUtils.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    dbfindAndUpdate(
        id, {
            corp: req.body.corp,
            lastedit: Date()
        }
    );
    res.sendStatus(200);
});

//save new project//
router.post('/save', AuthUtils.ensureAuthenticated, function(req, res) {
    var db_export = new Projects({
        name: req.body.name,
        corp: req.body.corp,
        ownerId: req.user._id,
        ownerName: req.user.name,
        lastedit: Date(),
        creationdate: Date()
    });
    db_export.save(function(err) {
        if (err) {
            res.status(500).send(new Errors.ApplicationError("Error while saving the project."));;
        }
        res.sendStatus(200);
    });
});



module.exports = router;
