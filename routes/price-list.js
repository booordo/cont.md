const express = require('express');
const router = express.Router();
const priceList = require('./../controllers/price-list');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', priceList.index);

module.exports = router;
