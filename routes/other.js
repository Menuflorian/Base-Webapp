var express = require('express');
var router = express.Router();




router.get('/dashboard', function(req, res) { //  redirection to Dashboard
  res.render('dashboard');
});

router.get('/pricing', function(req, res) { //  redirection to Register
  res.render('pricing');
});

router.get('/about', function(req, res) { //  redirection to Register
  res.render('about');
});

router.get('/contact', function(req, res) { //  redirection to contact
  res.render('contact');
});

router.get('/services', function(req, res) { //  redirection to services
  res.render('services');
});

router.get('/blog-home-1', function(req, res) { //  redirection to blog-home-1
  res.render('blog-home-1');
});

router.get('/blog-home-2', function(req, res) { //  redirection to blog-home-2
  res.render('blog-home-2');
});

router.get('/blog-post', function(req, res) { //  redirection to blog-post
  res.render('blog-post');
});

router.get('/sidebar', function(req, res) { //  redirection to sidebar
  res.render('sidebar');
});

router.get('/faq', function(req, res) { //  redirection to faq
  res.render('faq');
});

router.get('/404', function(req, res) { //  redirection to 404 page
  res.render('404');
});

router.get('/full-width', function(req, res) { //  redirection to full-wigth
  res.render('full-width');
});

module.exports = router;
