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

// redirection toLogin
router.get('/login', function(req, res) {
    res.render('login');
});

//  redirection to Register
router.get('/register', function(req, res) {
    res.render('register');
});

//  redirection to profile
router.get('/user-profile', AuthUtils.ensureAuthenticated, function(req, res) {
    res.render('user-profile', {
        layout: 'layout2'
    });
});

//  redirection to edit profile
router.get('/user-edit-profile', AuthUtils.ensureAuthenticated, function(req, res) {
    res.render(
        'user-edit-profile',
        {
            layout: 'layout2',
            userEdit:req.user,
            admin: false // force admin to false to get the user render
        }
    );
});

//  redirection to change password
router.get('/user-change-password', AuthUtils.ensureAuthenticated, function(req, res) {
    res.render('user-change-password', {
        layout: 'layout2',
        userEdit:req.user,
        admin:false // force admin to false to get the user render
    });
});

//Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});


//-------------------------post----------------------------

// Register fonction
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username.replace(/[^a-zA-Z0-9]/, '');
    var password = req.body.password;
    var password2 = req.body.password2;


    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(new Errors.InvalidForm());
    } else if (name == "") {

    } else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        }, function(err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function(err, mail) {
                if (user || mail) {
                    res.status(409).send(new Errors.UsernameOrEmailAlreadyUsed());
                } else {
                    var newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password,
                        registerdate: Date(),
                    });
                    User.createUser(newUser, function(err, user) {
                        if (err) {
                            res.status(500).send(new Errors.ApplicationError("Sever error when creating the user. Please retry or contact us for help."));
                        }
                    });
                    res.sendStatus(200);
                }
            });
        });
    }
});

//Login validation
passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user) {
            if (err) {
                return res.status(500).send(new Errors.ApplicationError("Invalid email or password."));
            }
            if (!user) {
                return done(null, false, {
                    errorcode: 400
                });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) {
                    return res.status(500).send(new Errors.ApplicationError("Invalid email or password."));
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        errorcode: 400
                    });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

//Check if login is ok
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(info.errorcode).send(new Errors.InvalidPasswordOrEmail());
        }
        req.logIn(user,
            function(err) {
                if (err) {
                    return res.status(500).send(new Errors.ApplicationError("Error while trying to login."));
                }
                return res.sendStatus(200);
            });
    })(req, res, next);
});

// Edit profile
// Accessible when admin
router.post('/user-edit-profile/:id', AuthUtils.ensureAuthenticated, function(req, res) {
    var user_id = req.body.id;

    if(req.user._id.toString() !== user_id && !req.user.isAdmin){
        res.status(500).send(new Errors.ApplicationError("Error : attempt to edit profile of another user without admin rights."));
    }

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        },
        function(err, user_username) {
            User.findOne({
                    email: {
                        "$regex": "^" + email + "\\b",
                        "$options": "i"
                    }
                },
                function(err, user_mail) {
                    if(err){
                        res.status(500).send(new Errors.ApplicationError("Error while checking existing emails and usernames."));
                    }
                    if (user_username && user_username.id !== user_id || user_mail && user_mail.id !== user_id) {
                        res.status(409).send(new Errors.UsernameOrEmailAlreadyUsed());
                    } else{
                        User.findById({
                            _id: user_id
                        },
                        function(err, db_user) {
                            if (err) res.send(err);
                            db_user.name = name;
                            db_user.username = username;
                            db_user.email = email;
                            db_user.save(function(err, majdata) {
                                if (err) {
                                    res.status(500).send(new Errors.ApplicationError("Error while saving informations."));
                                }
                                res.sendStatus(200);
                            });
                        });
                    }
                }
            );
        }
    );
});


//Change password
router.post('/user-change-password', AuthUtils.ensureAuthenticated, function(req, res) {
    var id = req.body.id;

    if(req.user._id.toString() !== id && !req.user.isAdmin){
        res.status(500).send(new Errors.ApplicationError("Error : attempt to change password of another user without admin rights."));
    }

    var userpassword = req.body.userpassword;
    var password = req.body.password;
    var password2 = req.body.password2;
    User.findById({
            _id: id
        },
        function(err, db_user) {
            if (err) {
                res.status(500).send(new Errors.ApplicationError("Something went wrong when looking for user id."));
            } else if (password == "" || password2 == "") {
                res.status(400).send(new Errors.ApplicationError("Password cannot be empty."));
            } else if (!req.user.isAdmin && bcrypt.compareSync(userpassword, req.user.password) == false) {
                res.sendStatus(400).send(new Errors.ApplicationError("Wrong entry for current password."));
            } else {
                if (password != password2) {
                    res.status(400).send(new Errors.ApplicationError("Mismatch between password and re-entered password."));
                } else {
                    db_user.password = bcrypt.hashSync(password, 10);
                    db_user.save(function(err) {
                        if (err) {
                            res.status(500).send(new Errors.ApplicationError("Something went wrong when saving new password."));
                        }
                        res.sendStatus(200);
                    });
                }
            }
        }
    );
});

module.exports = router;
