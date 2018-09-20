const express = require('express');
const router = express.Router();
const authorization = require('./../controllers/authorization');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', authorization.index);

module.exports = router;
