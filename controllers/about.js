exports.index = function (req, res, next) {
	req.breadcrumbs('О компании', '/about');
	res.render('about', {breadcrumbs: req.breadcrumbs()});
}