const express = require('express');
const router = express.Router();
const video = require('./../controllers/video');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', video.index);
router.get('/:category', video.category);
router.get('/:category/:id', video.detail);

module.exports = router;