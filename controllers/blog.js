exports.index = function (req, res, next) {
	res.render('blog');
}

exports.category = function (req, res, next) {
	res.render('blog');
}

exports.detail = function (req, res, next) {
	res.render('blog_detail');
}