var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/');
});

router.get('/financial_management', function(req, res, next) {
	res.render('erp/financial_management');
});

router.get('/production_accounting', function(req, res, next) {
	res.render('erp/production_accounting');
});

router.get('/sales', function(req, res, next) {
	res.render('erp/sales');
});

router.get('/management_accounting', function(req, res, next) {
	res.render('erp/management_accounting');
});

router.get('/online_trade', function(req, res, next) {
	res.render('erp/online_trade');
});

router.get('/asset_management', function(req, res, next) {
	res.render('erp/asset_management');
});

module.exports = router;
