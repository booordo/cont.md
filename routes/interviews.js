const express = require('express');
const router = express.Router();
const interviews = require('./../controllers/interviews');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', interviews.index);

module.exports = router;
