window.onload = function() {
	imageSwapElements = document.getElementsByClassName("js-image-swap");
	accordionElements = document.getElementsByClassName("js-accordion");

	setElementAction('onmouseenter', imageSwapElements, swapImage);
	setElementAction('onmouseleave', imageSwapElements, swapImage);
	setElementAction('onclick', accordionElements, toggleAccordion);
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
	elem = e.target;
	img = elem.getElementsByTagName('IMG')[0];

	if (!img) return;

	oldSrc = img.getAttribute('src');
	newSrc = elem.getAttribute('data-src');

	if (!oldSrc || !newSrc) return;

	elem.setAttribute('data-src', oldSrc)
	img.setAttribute('src', newSrc);
}

function toggleAccordion(e) {
	el = e.target;
	parentNode = el.parentNode;

	if (!el.classList.contains('accordion__title')) return;

	parentNode.classList.toggle('accordion__item_actived');
}