var YTPlayer;

window.onload = function() {
	setHandlers();
}

function setHandlers() {
	const imageSwapElements = document.getElementsByClassName("js-image-swap");
	const accordionElements = document.getElementsByClassName("js-accordion");
	const puzzleInnerElements = document.getElementsByClassName("puzzle__inner");
	const puzzleLineElements = document.getElementsByClassName("puzzle__line");
	const puzzleConnectElements = document.getElementsByClassName("puzzle__connect");
	const dropdownTogglerElements = document.getElementsByClassName("js-dropdown-toggler");
	const dropdownSublistElements = document.getElementsByClassName("navbar__item_top_multilevel");
	const videoLinkElements = document.getElementsByClassName("js-video-open");
	const videoModal = document.getElementById("videoModal");
	const telInputs = document.querySelector("input[type=tel]")

	setElementAction('onmouseenter', imageSwapElements, swapImage);
	setElementAction('onmouseleave', imageSwapElements, swapImage);
	setElementAction('onclick', accordionElements, toggleAccordion);
	setElementAction('onmouseenter', puzzleInnerElements, activatePuzzleItem);
	setElementAction('onmouseleave', puzzleInnerElements, activatePuzzleItem);
	setElementAction('onmouseenter', puzzleLineElements, activatePuzzleItem);
	setElementAction('onmouseleave', puzzleLineElements, activatePuzzleItem);
	setElementAction('onmouseenter', puzzleConnectElements, activatePuzzleItemConnect);
	setElementAction('onmouseleave', puzzleConnectElements, activatePuzzleItemConnect);
	setElementAction('onclick', dropdownTogglerElements, toggleNavbar);
	setElementAction('onclick', dropdownSublistElements, dropdownSublist);
	setElementAction('onclick', videoLinkElements, openVideoModal);
	setElementAction('onclick', videoModal, closeVideoModal);
	setElementAction('onkeypress', telInputs, handlerOnKeyPressInputPhone);
}

function setElementAction(action, el, fn) {
	if (el instanceof HTMLCollection) {
		for (var i = el.length - 1; i >= 0; i--) {
			el[i][action] = fn;
		}
	} else if (el instanceof HTMLElement || el instanceof HTMLDocument) {
		el[action] = fn;
	}
}

function swapImage(e) {
	let elem = e.target;
	let target = elem.getElementsByClassName('js-image-swap-target')[0];
	if (!target) target = elem;
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

function activatePuzzleItem(e) {
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

function activatePuzzleItemConnect(e) {
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

function enableScrolling() {
	let body = document.getElementsByTagName('body')[0];
	if (!body) return;
	body.style.overflow = '';
}

function disableScrolling() {
	let body = document.getElementsByTagName('body')[0];
	if (!body) return;
	body.style.overflow = 'hidden';
}

function openVideoModal(e) {
	let el = e.target;
	let videoId = el.getAttribute('data-target');
	let videoModal = document.getElementById('videoModal');
	e.preventDefault();
	if (!videoModal || !YTPlayer) return;
	disableScrolling();
	videoModal.classList.add('video_actived');
	YTPlayer.loadVideoById(videoId);
	YTPlayer.playVideo();
}

function closeVideoModal(e) {
	let el = e.target;
	if (!el || !el.classList.contains('video')) return;
	enableScrolling();
	el.classList.remove('video_actived');
	YTPlayer.pauseVideo();
}

function onYouTubeIframeAPIReady() {
	YTPlayer = new YT.Player('Youtube', {
		height: 510,
		width: 900
	});
}

function handlerOnKeyPressInputPhone(e) {
	e = e || event;

	if (e.ctrlKey || e.altKey || e.metaKey) return;

	var chr = getChar(e);

	// с null надо осторожно в неравенствах,
	// т.к. например null >= '0' => true
	// на всякий случай лучше вынести проверку chr == null отдельно
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