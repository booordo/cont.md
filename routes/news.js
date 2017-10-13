const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('news');
});

router.get('/:cat_name', function(req, res, next) {
  res.render('news');
});

router.get('/:cat_name/:news_id', function(req, res, next) {
  res.render('news_detail');
});

module.exports = router;
