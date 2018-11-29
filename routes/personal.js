const express = require('express');
const router = express.Router();
const personal = require('./../controllers/personal');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', personal.index);

module.exports = router;
