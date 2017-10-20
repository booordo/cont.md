const express = require('express');
const router = express.Router();
const solutions = require('./../controllers/solutions');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', solutions.index);
router.get('/:name', solutions.detail);

module.exports = router;
