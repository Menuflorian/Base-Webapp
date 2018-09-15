
var AuthUtils = {
    //Check Auth
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', 'You are not logged in');
            res.redirect('/users/login');
        }
    },
    //Check Admin
    ensureAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.isAdmin == true) {
            return next();
        } else {
            req.flash('error_msg', 'This part is reserved to admin');
            res.redirect('/users/login');
        }
    }
};


module.exports = AuthUtils;