const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/query', function(req, res, next) {
  res.render('query');
});

router.get('/businesses/insert', function(req, res, next) {
  res.render('businsert');
});

router.get('/businesses/update', function(req, res, next) {
  res.render('busupdate');
});

router.get('/businesses/delete', function(req, res, next) {
  res.render('busdelete');
});

router.get('/users/insert', function(req, res, next) {
  res.render('usinsert');
});

router.get('/users/update', function(req, res, next) {
  res.render('usupdate');
});

router.get('/users/delete', function(req, res, next) {
  res.render('usdelete');
});

router.get('/reviews/insert', function(req, res, next) {
  res.render('revinsert');
});

router.get('/reviews/update', function(req, res, next) {
  res.render('revupdate');
});

router.get('/reviews/delete', function(req, res, next) {
  res.render('revdelete');
});

router.get('/checkin/insert', function(req, res, next) {
  res.render('chinsert');
});

router.get('/checkin/delete', function(req, res, next) {
  res.render('chdelete');
});

router.get('/preselected', function(req, res, next) {
  res.render('preselected');
});

router.route('/businsert').post(function (req, res, next) {
  console.log("Inserted a business");
  const name = req.body.name;
  const id = req.body.id;
  const stars = req.body.stars;
  const status = req.body.status;
  console.log(name + id + stars + status);
  res.redirect('/'); // go home
});




module.exports = router;
