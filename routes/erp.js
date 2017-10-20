const express = require('express');
const router = express.Router();
const erp = require('./../controllers/erp');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', erp.index);
router.get('/:name', erp.detail);

module.exports = router;
