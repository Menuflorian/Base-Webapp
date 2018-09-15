var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var User = require('../models/User');
var Projects = require('../models/Projects');
var Errors = require('../server/Errors');
var AuthUtils = require('../server/AuthUtils');


//-------------------------get----------------------------

//Get access to a specific user profile.
router.get('/user-edit-profile/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    var id = req.params.id;
    User.find({
            _id: id
        },
        function(err, db_user) {
            if (err) {
                res.send(err);
            }
            res.render('user-edit-profile',
                {
                    layout: 'layout3',
                    userEdit:db_user,
                    admin:true
                }
            );
        });
});

//Redirection to index admin
router.get('/admin', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    res.render('admin', {
        layout: 'layout3'
    });
});

//Redirection to the table user list.
router.get('/admin-userlist', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    User.find({},
        function(err, db_users) {
            if (err) {
                res.send(err);
            }
            var data = {
                layout: 'layout3',
                dbUsers: db_users
            };
            res.render('admin-userlist', data);
        });
});


//Render a menu to administrate a profile.
router.get('/admin-edit-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    var id = req.params.id;
    User.find({
            _id: id
        },
        function(err, db_user) {
            if (err) {
                res.send(err);
            }
            Projects.find({
                    ownerId: id
                },
                function(err, db_project) {
                    if (err) {
                        res.send(err);
                    }
                    var data = {
                        layout: 'layout3',
                        dbUser: db_user[0],
                        dbProjects: dbProjects
                    };
                    res.render('admin-edit-user', data);
                });
        });
});

//Redirection to change password of a specific user.
router.get('/admin-change-password/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
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
                userEdit: db_user
            };
            res.render('user-change-password', data);
        });
});

//-------------------------post----------------------------

//validate users
router.post('/admin-validate-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
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
                    res.status(500).send(new Errors.ApplicationError());
                }
                res.sendStatus(200);
            });
        });
});

router.post('/admin-unvalidate-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    var id = req.params.id;
    User.findById({
            _id: id
        },
        function(err, db_user) {
            if (err) {
                res.sendStatus(500);
            }
            db_user.validated = true;
            db_user.save(function(err) {
                if (err) {
                    res.status(500).send(new Errors.ApplicationError());
                }
                res.sendStatus(200);
            });
        });
});

//Make a user an admin.
router.post('/admin-makeadmin-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
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
                    res.status(500).send(new Errors.ApplicationError());
                }
                res.sendStatus(200);
            });
        });
});

//Remove admin right.
router.post('/admin-removeadmin-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
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
                    res.status(500).send(new Errors.ApplicationError());
                }
                res.sendStatus(200);
            });
        });
});

// Delete a user.
router.post('/admin-delete-user/:id', AuthUtils.ensureAuthenticated, AuthUtils.ensureAdmin, function(req, res) {
    var id = req.params.id;
    User.remove({
            _id: id
        },
        function(err) {
            if (err) {
                res.status(500).send(new Errors.ApplicationError());
            }
            res.sendStatus(200);
        });
});


module.exports = router;
