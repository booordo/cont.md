window.onload = function() {
	const imageSwapElements = document.getElementsByClassName("js-image-swap");
	const accordionElements = document.getElementsByClassName("js-accordion");
	const puzzleInnerElements = document.getElementsByClassName("puzzle__inner");
	const puzzleLineElements = document.getElementsByClassName("puzzle__line");
	const puzzleConnectElements = document.getElementsByClassName("puzzle__connect");
	const dropdownTogglerElements = document.getElementsByClassName("js-dropdown-toggler");
	const dropdownSublistElements = document.getElementsByClassName("navbar__item_top_multilevel");

	setElementAction('onmouseenter', imageSwapElements, swapImage);
	setElementAction('onmouseleave', imageSwapElements, swapImage);
	setElementAction('onclick', accordionElements, toggleAccordion);
	setElementAction('onmouseenter', puzzleInnerElements, activatePuzzleItem);
	setElementAction('onmouseleave', puzzleInnerElements, activatePuzzleItem);
	setElementAction('onmouseenter', puzzleLineElements, activatePuzzleItem);
	setElementAction('onmouseleave', puzzleLineElements, activatePuzzleItem);
	setElementAction('onmouseenter', puzzleConnectElements, activatePrevPuzzleItem);
	setElementAction('onmouseleave', puzzleConnectElements, activatePrevPuzzleItem);
	setElementAction('onclick', dropdownTogglerElements, navbarToggle);
	setElementAction('onclick', dropdownSublistElements, dropdownSublist);
}

function setElementAction(action, el, fn) {
	if (el instanceof HTMLCollection) {
		switch (action) {
			case 'onmouseenter':
				for (var i = el.length - 1; i >= 0; i--) {
					el[i].onmouseenter = fn;
				}
				break;
			case 'onmouseleave':
				for (var i = el.length - 1; i >= 0; i--) {
					el[i].onmouseleave = fn;
				}
				break;
			case 'onclick':
				for (var i = el.length - 1; i >= 0; i--) {
					el[i].onclick = fn;
				}
				break;
			default:
				break;
		}
	} else if (el instanceof HTMLElement || el instanceof HTMLDocument) {
		switch (action) {
			case 'onmouseenter':
				el.onmouseenter = fn;
				break;
			case 'onmouseleave':
				el.onmouseleave = fn;
				break;
			case 'onclick':
				el.onclick = fn;
				break;
			default:
				break;
		}
	}
}

function swapImage(e) {
	let elem = e.target;
	let target = elem.getElementsByClassName('js-image-swap-target')[0];

	if (!target) {
		target = elem;
	}

	let oldSrc = target.getAttribute('src');
	let newSrc = elem.getAttribute('data-src');

	if (!oldSrc || !newSrc) return;

	target.setAttribute('src', newSrc);
	elem.setAttribute('data-src', oldSrc)
}

function toggleAccordion(e) {
	let el = e.target;
	let parentNode = el.parentNode;

	if (!el.classList.contains('accordion__title')) return;

	parentNode.classList.toggle('accordion__item_actived');
}

function navbarToggle (e) {
	let el = e.target;
	let target;

	if (el.classList.contains('js-dropdown-toggler')) {
		target = document.getElementById(el.attributes['data-target'].value);
	} else {
		target = document.getElementById(el.parentElement.attributes['data-target'].value);
	}
	
	target.classList.toggle('header__navbar_actived');
}

function dropdownSublist (e) {
	let el = e.target;
	let sublist = el.getElementsByClassName('navbar__sublist_top')[0];

	if (window.innerWidth < 901 ) {
		sublist.classList.toggle('navbar__sublist_top_actived');
	}
}

function activatePuzzleItem (e) {
	let el = e.target;
	let parent = el.parentElement;

	while (!parent.classList.contains('puzzle__item')) {
		parent = parent.parentElement;
		if (parent instanceof HTMLDocument) {
			return;
		}
	}

	let nextItem = parent.nextElementSibling;

	if (!nextItem.classList.contains('puzzle__item')) {
		nextItem = parent.parentElement.children[0];
	}

	if (e.type == 'mouseenter') {
		parent.classList.add('puzzle__item_actived');
		nextItem.classList.add('puzzle__item_actived_connect');
	} else {
		parent.classList.remove('puzzle__item_actived');
		nextItem.classList.remove('puzzle__item_actived_connect')
	}
}

function activatePrevPuzzleItem (e) {
	let el = e.target;
	let parent = el.parentElement;

	while (!parent.classList.contains('puzzle__item')) {
		parent = parent.parentElement;
		if (parent instanceof HTMLDocument) {
			return;
		}
	}

	let prevItem = parent.previousElementSibling;

	if (!prevItem || !prevItem.classList.contains('puzzle__item')) {
		let allItems = parent.parentElement.getElementsByClassName('puzzle__item');
		prevItem = allItems[allItems.length - 1];
	}

	if (e.type == 'mouseenter') {
		parent.classList.add('puzzle__item_actived_connect');
		prevItem.classList.add('puzzle__item_actived');
	} else {
		parent.classList.remove('puzzle__item_actived_connect')
		prevItem.classList.remove('puzzle__item_actived');
	}
}