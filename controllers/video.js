exports.index = function (req, res, next) {
	res.render('video');
}

exports.chapter = function (req, res, next) {
	res.render('video_chapter');
}

exports.category = function (req, res, next) {
	res.render('video_category');
}

exports.detail = function (req, res, next) {
	res.render('video_detail');
}