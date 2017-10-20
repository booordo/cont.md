exports.original = function (req, res, next) {
	res.locals.originalUrl = req.originalUrl;
	next();
};

exports.base = function (req, res, next) {
	res.locals.baseUrl = req.baseUrl;
	next();
};