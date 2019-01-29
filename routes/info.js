const express = require('express');
const router = express.Router();
const info = require('./../controllers/info');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', info.index);

module.exports = router;