const express = require('express');
const router = express.Router();
const news = require('./../controllers/news');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', news.index);
router.get('/:category', news.category);
router.get('/:category/:id', news.detail);

module.exports = router;
