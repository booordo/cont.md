const express = require('express');
const router = express.Router();
const video = require('./../controllers/video');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', video.index);
router.get('/:chapter', video.chapter);
router.get('/:chapter/:category', video.category);
router.get('/:chapter/:category/:id', video.detail);

module.exports = router;