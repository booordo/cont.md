exports.index = function (req, res, next) {
	req.breadcrumbs('Новости');
	res.render('news', {breadcrumbs: req.breadcrumbs()});
}

exports.category = function (req, res, next) {
	req.breadcrumbs('Категория');
	res.render('news', {breadcrumbs: req.breadcrumbs()});
}

exports.detail = function (req, res, next) {
	req.breadcrumbs('Категория');
	req.breadcrumbs('Детальная');
	res.render('news_detail', {breadcrumbs: req.breadcrumbs()});
}