window.onload = function() {
	setHandlers();
}

function setHandlers() {
	var accordionElements = document.querySelectorAll(".js-accordion");
	var dropdownTogglerElements = document.querySelectorAll(".js-dropdown-toggler");
	var dropdownSublistElements = document.querySelectorAll(".navbar__item_top_multilevel");
	var telInputs = document.querySelectorAll("input[type=tel]")

	setElementAction('onclick', accordionElements, toggleAccordion);
	setElementAction('onclick', dropdownTogglerElements, toggleNavbar);
	setElementAction('onclick', dropdownSublistElements, dropdownSublist);
	setElementAction('onkeypress', telInputs, handlerOnKeyPressInputPhone);
}

function toggleAccordion(e) {
	let el = e.target;
	let parentNode = el.parentNode;
	if (!el.classList.contains('accordion__title')) return;
	parentNode.classList.toggle('accordion__item_actived');
}

function toggleNavbar(e) {
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

function dropdownSublist(e) {
	let el = e.target;
	let sublist = el.getElementsByClassName('navbar__sublist_top')[0];
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

function handlerOnKeyPressInputPhone(e) {
    e = e || event;
    
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    var chr = getChar(e);
    
    if (chr == null) return;

	if ((chr < '0' || chr > '9') && (chr !== "+" && chr !== "(" && chr !== ")" && chr !== " ")) {
		return false;
	}
}

function getChar(e) {
	if (e.which == null) {
		if (e.keyCode < 32) return null;
		return String.fromCharCode(e.keyCode) // IE
	}

	if (e.which != 0 && e.charCode != 0) {
		if (e.which < 32) return null;
		return String.fromCharCode(e.which) // остальные
	}

	return null; // специальная клавиша
}