exports.index = function (req, res, next) {
	res.redirect('/');
}

exports.detail = function (req, res, next) {
	req.breadcrumbs(getPageName(req.params.name), '');
	res.render('solutions/' + req.params.name, {breadcrumbs: req.breadcrumbs()}, (err, html) => {
		if (err) return next();
		res.send(html);
	});
}

function getPageName (name) {
	let pageName;

	switch (name) {
		case 'construction_company_management':
			pageName = 'Управление строительным предприятием';
			break;
		case 'agricultural_company_management':
			pageName = 'Управление сельхоз. предприятием';
			break;
		case 'retail_company_management':
			pageName = 'Розница';
			break;
		case 'water_company_management':
			pageName = 'Водоканал';
			break;
		case 'corporate_university':
			pageName = 'Корпоративный университет';
			break;
		default:
			pageName = '';
			break;
	}
	
	return pageName;
}