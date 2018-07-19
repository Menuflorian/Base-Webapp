var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');
var DualboxExports = require('../models/DualboxExports');


//-------------------------Function----------------------------

//Check auth
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

//Factorisation funcion to edit: deleted, corp, lasedit argument on a project
function dbfindAndUpdate(id, params) {
    DualboxExports.findById({
            _id: id
        },
        function(err, db_export) {
            if (err) {
                res.sendStatus(500);
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
                    res.sendStatus(500);
                }
            });
        }
    );
}

//-------------------------get----------------------------

// redirection to new project//
router.get('/dual', ensureAuthenticated, function(req, res) {
    res.render('new-project');
});

//redirection on a portefolio with project
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
                res.render('projects' + (folio === undefined ? 3 : folio), {
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
router.get('/:id', ensureAuthenticated, function(req, res) {
    var Id = req.params.id;
    var admin = req.user.isAdmin;
    var dbfindOne = function dbfindOne(selectors) {
        DualboxExports.findOne(selectors, {}, {},
            function(err, db_export) {
                if (err) {
                    res.send(err);
                }
                res.render('edit-project', {
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
router.post('/admindelete/:id', ensureAdmin, function(req, res) {
    var id = req.params.id;
    DualboxExports.remove({
            _id: id
        },
        function(err) {
            if (err) {
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
});

//Restore a project
router.post('/restore/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    dbfindAndUpdate(
        id, {
            deleted: false
        }
    );
    res.sendStatus(200);
});

//user delet
router.post('/userdelete/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    dbfindAndUpdate(
        id, {
            deleted: true
        }
    );
    res.sendStatus(200);
});

//Delet from user and admin
router.post('/edit/:id', ensureAuthenticated, function(req, res) {
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
router.post('/save', ensureAuthenticated, function(req, res) {
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
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});



module.exports = router;
