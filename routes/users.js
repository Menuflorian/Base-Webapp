var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = require('../models/user');
var DualboxExports = require('../models/DualboxExports');
var bcrypt = require('bcryptjs');

//-------------------------Function----------------------------

//Check Auth
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

//Check Admin
function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin == true) {
        return next();
    } else {
        req.flash('error_msg', 'This part is reserved to admin');
        res.redirect('/users/login');
    }
}

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
router.get('/user-profile', ensureAuthenticated, function(req, res) {
    res.render('user-profile', {
        layout: 'layout2'
    });
});

//  redirection to edit profile
router.get('/user-edit-profile', ensureAuthenticated, function(req, res) {
    res.render('user-edit-profile', {
        layout: 'layout2'
    });
});

//  redirection to change password
router.get('/user-change-password', ensureAuthenticated, function(req, res) {
    res.render('user-change-password', {
        layout: 'layout2'
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
    var username = req.body.username;
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
        res.sendStatus(404);
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
                    res.sendStatus(405);
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
                            res.sendStatus(500);
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
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    errorcode: 401
                });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
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
            return res.sendStatus(info.errorcode);
        }
        req.logIn(user,
            function(err) {
                if (err) {
                    return res.sendStatus(500);
                }
                return res.sendStatus(200);
            });
    })(req, res, next);
});

//Edit profile
router.post('/user-edit-profile/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        },
        function(err, user) {
            if (user == null) {
                user = {id:1};
            }
            User.findOne({
                    email: {
                        "$regex": "^" + email + "\\b",
                        "$options": "i"
                    }
                },
                function(err, mail) {
                    if (mail == null) {
                        mail = {id:1};
                    }
                    if ( (user.id == 1) && ( mail.id == 1 )   ||
                        ((user.id == 1) && (mail.id==req.user.id))  ||
                        ((mail.id == 1) && (user.id==req.user.id))  ||
                        ((user.id==req.user.id) && (mail.id==req.user.id))
                    )
                        {
                        User.findById(
                            {
                                _id: id
                            },
                            function(err, db_user) {
                                if (err) res.send(err);
                                if (name == "") {
                                    name = req.user.name;
                                } else {
                                    db_user.name = req.body.name;
                                }
                                if (username == "") {
                                    username = req.user.username;
                                } else {
                                    db_user.username = req.body.username;
                                }
                                if (email == "") {
                                    email = req.user.email;
                                } else {
                                    db_user.email = req.body.email;
                                }
                                db_user.save(function(err, majdata) {
                                    if (err) {
                                        res.sendStatus(500);
                                    }
                                    res.sendStatus(200);
                                });
                            });
                    } else {
                        res.sendStatus(405);
                    }
                }
            );
        }
    );
});


//Change password
router.post('/user-change-password', ensureAuthenticated, function(req, res) {
    var id = req.body.id;
    var userpassword = req.body.userpassword;
    var password = req.body.password;
    var password2 = req.body.password2;
    User.findById({
            _id: id
        },
        function(err, db_user) {
            if (err) {
                res.sendStatus(500);
            } else if (password == "" || password2 == "") {
                res.sendStatus(400);
            } else if (bcrypt.compareSync(userpassword, req.user.password) == false) {
                res.sendStatus(400);
            } else {
                if (password != password2) {
                    res.sendStatus(402);
                } else {
                    db_user.password = bcrypt.hashSync(password, 10);
                    db_user.save(function(err) {
                        if (err) {
                            res.sendStatus(500);
                        }
                        res.sendStatus(200);
                    });
                }
            }
        }
    );
});

module.exports = router;
