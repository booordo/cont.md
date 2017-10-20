exports.index = function (req, res, next) {
	res.render('news');
}

exports.category = function (req, res, next) {
	res.render('news');
}

exports.detail = function (req, res, next) {
	res.render('news_detail');
}