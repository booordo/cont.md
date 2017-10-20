const express = require('express');
const router = express.Router();
const blog = require('./../controllers/blog');
const urlToPage = require('./../middlewares/url-to-page');

router.use(urlToPage.base);

router.get('/', blog.index);
router.get('/:category', blog.category);
router.get('/:category/:id', blog.detail);

module.exports = router;
