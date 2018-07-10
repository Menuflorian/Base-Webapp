var express = require('express');
var router = express.Router();




router.get('/Dashboard', function(req, res) { //  redirection vers la page Dashboard
  res.render('Dashboard');
});



router.get('/Pricing', function(req, res) {  //  redirection vers la page Register
  res.render('Pricing');
});

router.get('/About', function(req, res) {  //  redirection vers la page Register
  res.render('About');
});

router.get('/Portfolio-1-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Portfolio-1-col');
});

router.get('/Portfolio-2-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Portfolio-2-col');
});

router.get('/Portfolio-3-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Portfolio-3-col');
});

router.get('/Portfolio-4-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Portfolio-4-col');
});

router.get('/Portfolio-item', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Portfolio-item');
});

router.get('/Contact', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Contact');
});

router.get('/Services', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Services');
});

router.get('/Blog-home-1', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Blog-home-1');
});

router.get('/Blog-home-2', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Blog-home-2');
});

router.get('/Blog-post', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Blog-post');
});

router.get('/Sidebar', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Sidebar');
});

router.get('/Faq', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Faq');
});

router.get('/404', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('404');
});

router.get('/Full-width', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('Full-width');
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
