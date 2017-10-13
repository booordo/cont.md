const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
	res.locals.baseUrl = req.baseUrl;
	next();
});

router.get('/', function(req, res, next) {
	res.redirect('/');
});

router.get('/construction_company_management', function(req, res, next) {
  	res.render('solutions/construction_company_management');
});

router.get('/agricultural_company_management', function(req, res, next) {
  	res.render('solutions/agricultural_company_management');
});

router.get('/retail_company_management', function(req, res, next) {
  	res.render('solutions/retail_company_management');
});

router.get('/water_company_management', function(req, res, next) {
  	res.render('solutions/water_company_management');
});

router.get('/corporate_university', function(req, res, next) {
  	res.render('solutions/corporate_university');
});

module.exports = router;
