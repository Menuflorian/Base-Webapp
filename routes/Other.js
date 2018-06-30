var express = require('express');
var router = express.Router();



// Dashboard
router.get('/Dashboard', function (req, res) {
	res.render('Dashboard');
});

// Register
router.get('/Pricing', function (req, res) {
	res.render('Pricing');
});


module.exports = router;
