exports.index = function (req, res, next) {
	res.redirect('/');
}

exports.detail = function (req, res, next) {
	res.render('solutions/' + req.params.name, (err, html) => {
		if (err) return next();
		res.send(html);
	});
}