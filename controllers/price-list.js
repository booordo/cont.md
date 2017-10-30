exports.index = function (req, res, next) {
	req.breadcrumbs('Прайс-лист');
	res.render('price_list', {breadcrumbs: req.breadcrumbs()});
}