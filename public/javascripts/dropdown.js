(function () {
	window.addEventListener("load", function () {
		var tooglers = document.querySelectorAll(".js-dropdown-toggler");
		var sublists = document.querySelectorAll(".navbar__item_top_multilevel");
		tooglers.forEach(function (el) {
			el.addEventListener("onclick", onTogglerClick);
		});
		sublists.forEach(function (el) {
			el.addEventListener("onclick", onSublistClick);
		});
	});

	function onTogglerClick(e) {
		let el = e.target;
		let target;
		if (el.classList.contains('js-dropdown-toggler')) {
			target = document.getElementById(el.attributes['data-target'].value);
		} else {
			el = el.parentElement;
			target = document.getElementById(el.attributes['data-target'].value);
		}
		if (el.classList.contains('navbar-toggler_actived')) {
			enableScrolling();
		} else {
			disableScrolling();
		}
		el.classList.toggle('navbar-toggler_actived');
		target.classList.toggle('header__navbar_actived');
	}

	function onSublistClick(e) {
		let el = e.target;
		let sublist = el.getquerySelector('navbar__sublist_top');
		if (window.innerWidth < 901) {
			sublist.classList.toggle('navbar__sublist_top_actived');
		}
	}

	function enableScrolling() {
		document.body.style.overflow = '';
	}

	function disableScrolling() {
		document.body.style.overflow = 'hidden';
	}

})();