var express = require('express');
var router = express.Router();

// redirection to index
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
