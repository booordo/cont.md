const express = require('express');
const router = express.Router();
const registration = require('./../controllers/registration');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', registration.index);

module.exports = router;
