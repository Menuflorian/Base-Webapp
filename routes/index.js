var express = require('express');
var router = express.Router();

// redirection vers index//
router.get('/', function(req, res){
	res.render('index');
});
//fin de redirection//

//fonction de verification de l'identité client.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}
//fin de verif//
module.exports = router;
