exports.index = function (req, res, next) {
	req.breadcrumbs('Отзывы');
	res.render('reviews', {breadcrumbs: req.breadcrumbs()});
}