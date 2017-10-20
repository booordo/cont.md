const express = require('express');
const router = express.Router();
const main = require('./../controllers/main');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', main.index);

module.exports = router;
