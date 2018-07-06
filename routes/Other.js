var express = require('express');
var router = express.Router();



//  redirection vers la page Dashboard
router.get('/Dashboard', function(req, res) {
  res.render('Dashboard');
});
//fin de redirection//

//  redirection vers la page Register
router.get('/Pricing', function(req, res) {
  res.render('Pricing');
});
//fin de redirection//

module.exports = router;
