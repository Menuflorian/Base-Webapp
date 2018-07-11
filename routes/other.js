var express = require('express');
var router = express.Router();




router.get('/dashboard', function(req, res) { //  redirection vers la page Dashboard
  res.render('dashboard');
});



router.get('/pricing', function(req, res) {  //  redirection vers la page Register
  res.render('pricing');
});

router.get('/about', function(req, res) {  //  redirection vers la page Register
  res.render('about');
});

router.get('/portfolio-1-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('portfolio-1-col');
});

router.get('/portfolio-2-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('portfolio-2-col');
});

router.get('/portfolio-3-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('portfolio-3-col');
});

router.get('/portfolio-4-col', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('portfolio-4-col');
});

router.get('/portfolio-item', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('portfolio-item');
});

router.get('/contact', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('contact');
});

router.get('/services', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('services');
});

router.get('/blog-home-1', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('blog-home-1');
});

router.get('/blog-home-2', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('blog-home-2');
});

router.get('/blog-post', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('blog-post');
});

router.get('/sidebar', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('sidebar');
});

router.get('/faq', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('faq');
});

router.get('/404', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('404');
});

router.get('/full-width', function(req, res) {  //  redirection vers la page portfolio-1-col
  res.render('full-width');
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
