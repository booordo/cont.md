exports.index = function (req, res, next) {
	res.render('video');
}

exports.category = function (req, res, next) {
	res.render('video_category');
}

exports.detail = function (req, res, next) {
	res.render('video_detail');
}