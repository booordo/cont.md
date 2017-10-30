exports.index = function (req, res, next) {
	req.breadcrumbs('Контакты');
	res.render('contacts', {breadcrumbs: req.breadcrumbs()});
}