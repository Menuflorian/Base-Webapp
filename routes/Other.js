var express = require('express');
var router = express.Router();




router.get('/Dashboard', function(req, res) { //  redirection vers la page Dashboard
  res.render('Dashboard');
});



router.get('/Pricing', function(req, res) {  //  redirection vers la page Register
  res.render('Pricing');
});



function ensureAdmin(req, res, next) {       // Verfi du rang admin
  if (req.user && req.user.isAdmin == true) {
    return next();
  } else {
    req.flash('error_msg', 'This part is reserved to admin');
    res.redirect('/users/login');
  }
}
module.exports = router;
