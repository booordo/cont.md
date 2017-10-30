window.onload = function() {
	const imageSwapElements = document.getElementsByClassName("js-image-swap");
	const accordionElements = document.getElementsByClassName("js-accordion");
	const puzzleElements = document.getElementsByClassName("js-puzzle-item");
	const puzzleLineElements = document.getElementsByClassName("js-puzzle-line");
	const puzzleConnectElements = document.getElementsByClassName("js-puzzle-connect");

	setElementAction('onmouseenter', imageSwapElements, swapImage);
	setElementAction('onmouseleave', imageSwapElements, swapImage);
	setElementAction('onclick', accordionElements, toggleAccordion);
	setElementAction('onmouseenter', puzzleElements, activateSeporatorHandler);
	setElementAction('onmouseleave', puzzleElements, activateSeporatorHandler);
	setElementAction('onmouseenter', puzzleLineElements, activatePuzzleByLine);
	setElementAction('onmouseleave', puzzleLineElements, activatePuzzleByLine);
	setElementAction('onmouseenter', puzzleConnectElements, activatePuzzleByConnect);
	setElementAction('onmouseleave', puzzleConnectElements, activatePuzzleByConnect);
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

function activateSeporatorHandler (e) {
	let el = e.target;

	if (e.type == 'mouseleave') {
		el.classList.remove('puzzle__item_actived');
		deactivateSeparator (el);
	} else {
		el.classList.add('puzzle__item_actived');
		activateSeporator (el);
	}
}

function activateSeporator (el) {
	let parent = el.parentElement;
	let sibling = el.previousElementSibling;

	if (!sibling) {
		let seporators = parent.getElementsByClassName('puzzle__separator');
		sibling = seporators[seporators.length - 1];
	}

	sibling.classList.add('puzzle__separator_actived')
}

function deactivateSeparator (el) {
	let parent = el.parentElement;
	let sibling = el.previousElementSibling;

	if (!sibling) {
		let seporators = parent.getElementsByClassName('puzzle__separator');
		sibling = seporators[seporators.length - 1];
	}

	sibling.classList.remove('puzzle__separator_actived')
}

function activatePuzzleByLine (e) {
	let el = e.target;
	let parent = el.parentElement;
	let nextParentSibling = parent.nextElementSibling;

	if (!nextParentSibling || !nextParentSibling.classList.contains('puzzle__item')) {
		let allParentItemSiblings = parent.parentElement.getElementsByClassName('puzzle__item');
		nextParentSibling = allParentItemSiblings[0];
	}

	if (e.type == 'mouseleave') {
		parent.classList.remove('puzzle__separator_actived');
		nextParentSibling.classList.remove('puzzle__item_actived');	
	} else {
		parent.classList.add('puzzle__separator_actived');
		nextParentSibling.classList.add('puzzle__item_actived');
	}
}

function activatePuzzleByConnect (e) {
	let el = e.target;
	let parent = el.parentElement;
	let prevParentSibling = parent.previousElementSibling;

	if (!prevParentSibling || !prevParentSibling.classList.contains('puzzle__item')) {
		let allParentItemSiblings = parent.parentElement.getElementsByClassName('puzzle__item');
		prevParentSibling = allParentItemSiblings[allParentItemSiblings.length - 1];
	}

	if (e.type == 'mouseleave') {
		prevParentSibling.classList.remove('puzzle__item_actived');
		deactivateSeparator (prevParentSibling);
	} else {
		prevParentSibling.classList.add('puzzle__item_actived');
		activateSeporator (prevParentSibling);
	}
}