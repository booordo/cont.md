const express = require('express');
const router = express.Router();
const reviews = require('./../controllers/reviews');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', reviews.index);

module.exports = router;
