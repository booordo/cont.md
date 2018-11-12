exports.index = function (req, res, next) {
	res.redirect('/');
}

exports.detail = function (req, res, next) {
	res.render('erp/' + req.params.name, {}, (err, html) => {
		if (err) return next();
		res.send(html);
	});
}

function getPageName (name) {
	let pageName;

	switch (name) {
		case 'financial_management':
			pageName = 'Управление финансами';
			break;
		case 'production_accounting':
			pageName = 'Учет производства';
			break;
		case 'sales':
			pageName = 'Продажи. Розничные продажи.';
			break;
		case 'management_accounting':
			pageName = 'Управленческий учет';
			break;
		case 'online_trade':
			pageName = 'Интернет торговля';
			break;
		case 'asset_management':
			pageName = 'Управление активами';
			break;
		default:
			pageName = '';
			break;
	}
	
	return pageName;
}