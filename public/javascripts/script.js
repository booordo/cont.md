var YTPlayer;

window.onload = function() {
	setHandlers();
}

function setHandlers() {
	const imageSwapElements = document.getElementsByClassName("js-image-swap");
	const accordionElements = document.getElementsByClassName("js-accordion");
	const dropdownTogglerElements = document.getElementsByClassName("js-dropdown-toggler");
	const dropdownSublistElements = document.getElementsByClassName("navbar__item_top_multilevel");
	const videoLinkElements = document.getElementsByClassName("js-video-open");
	const videoModal = document.getElementById("videoModal");
	const telInputs = document.querySelector("input[type=tel]")

	setElementAction('onmouseenter', imageSwapElements, swapImage);
	setElementAction('onmouseleave', imageSwapElements, swapImage);
	setElementAction('onclick', accordionElements, toggleAccordion);
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

(function () {
    class Puzzle {
        constructor(context, cx, cy, elements) {
            this.context = context;
            this.maxContextWidth = 1140;
			this.contextWidth = 1140;
			this.contextHeight = 800;
            this.cx = cx;
            this.cy = cy;
            this.elements = elements;
            this.sectorAngle = 360 / elements.length;
            this.innerRadius = 150;
            this.outerRadius = 330;
            this.padding = 15;
            this.width = this.outerRadius * 2 + this.padding;
            this.middleRadius = this.innerRadius + (this.outerRadius - this.innerRadius) / 2;
            this.connectorCurveAngle = 50;
            this.connectorCurveLength = 40;
            this.connectorWidth = 25;
            this.connectorStart = this.middleRadius + this.connectorWidth / 2;
            this.connectorEnd = this.middleRadius - this.connectorWidth / 2;
            this.mainGroup = this.context.g();
            this.circlePath = [];
            this._updatePuzzle();
            this._updateSize();
            this._setEventHandlers();
        }

        // SECTORS
        _updatePuzzle() {
            this.context.clear();
            this.circlePath = [];
            this.mainGroup = this.context.g();
            this._createSectors();
            this.mainGroup.add(this._createCircle());
        }
        _updateSize() {
			var clientWidth = document.body.clientWidth;
			var k = (clientWidth - 30) / this.width;
            var offsetX = -(this.contextWidth - clientWidth) / 2;
			offsetX = offsetX > 0 ? 0 : offsetX;
			var offsetY = -(this.contextHeight - (this.contextHeight * k)) / 2;
			offsetY = offsetY > 0 ? 0 : offsetY;
            if (clientWidth < this.width) {
				this.mainGroup.transform(`T ${offsetX}, ${offsetY} s${k}`)
				this.context.attr({
					style: `height: ${this.contextHeight * k}px`
				});
            } else {
				this.mainGroup.transform(`T ${offsetX}, ${offsetY}`);
				this.context.attr({
					style: `height: 800px`
				});
            }
        }
        _createSectors() {
            elements.forEach((el, i) => {
                var fromAngle = i * this.sectorAngle;
                var toAngle = fromAngle + this.sectorAngle;
                this.mainGroup.add(this._createSector(fromAngle, toAngle, el));
            });
        }
        _createCircle() {
            var path = "";
            this.circlePath.forEach((el, i) => {
                path += el + " ";
            });
            var circle = this.context.path(path).attr({
                fill: "#2A2A2B",
                stroke: "#fff",
                strokeWidth: "3px"
            });
            var circleBBox = circle.getBBox();
            var title = this.context.text(circleBBox.x + circleBBox.width / 2, circleBBox.y + circleBBox.height / 2, "ERP").attr({
                class: "puzzle__circle-title",
                fill: "#fff"
            });
            var textBBox = title.getBBox();
            title.transform(`T 0 ${this.cy - textBBox.cy}`);
            var topText = this.context.text(textBBox.cx, this.cy - textBBox.height / 2 + 10, "Выберите раздел").attr({
                class: "puzzle__circle-choice",
                fill: "#f1c40f"
            });
            var bottomText = this.context.text(textBBox.cx, this.cy + textBBox.height / 2, "Системы").attr({
                class: "puzzle__circle-subtitle",
                textLength: "185",
                fill: "#fff"
            });
            var bottomTextBBox = bottomText.getBBox();
            // IE FIX -->
            bottomText.transform(`T ${this.cx - bottomTextBBox.cx} 0`)
            // IE FIX <--
            var group = this.context.g(circle, title, topText, bottomText);
            return group;
        }
        _createSector(fromAngle, toAngle, element) {
            var middleAngle = (fromAngle + toAngle) / 2;
            var oArcPts = this._getArcPoints(this.outerRadius, fromAngle, toAngle);
            var iArcPts = this._getArcPoints(this.innerRadius, fromAngle, toAngle);
            var oConPts = this._getConnectorPoints(toAngle);
            var iConPts = this._getConnectorPoints(fromAngle);
            var cConPts = this._getCircleConnectorPoints(middleAngle);
            var group = this.context.g();
            var sector = this.context.path(`M ${oArcPts.start.x} ${oArcPts.start.y}
            A ${this.outerRadius} ${this.outerRadius} 0 0 1 ${oArcPts.end.x} ${oArcPts.end.y}
            L ${oConPts.start.x} ${oConPts.start.y}
            C ${oConPts.guides.start.x} ${oConPts.guides.start.y} ${oConPts.guides.end.x} ${oConPts.guides.end.y} ${oConPts.end.x} ${oConPts.end.y}
            L ${iArcPts.end.x} ${iArcPts.end.y}
            A ${this.innerRadius} ${this.innerRadius} 0 0 0 ${cConPts.end.x} ${cConPts.end.y}
            C ${cConPts.guides.end.x} ${cConPts.guides.end.y} ${cConPts.guides.start.x} ${cConPts.guides.start.y} ${cConPts.start.x} ${cConPts.start.y}
            A ${this.innerRadius} ${this.innerRadius} 0 0 0 ${iArcPts.start.x} ${iArcPts.start.y}
            L ${iConPts.end.x} ${iConPts.end.y}
            C ${iConPts.guides.end.x} ${iConPts.guides.end.y} ${iConPts.guides.start.x} ${iConPts.guides.start.y} ${iConPts.start.x} ${iConPts.start.y}
            Z`).attr({
                fill: "rgba(255,255,255,0.4)",
                stroke: "#fff",
                strokeWidth: "3px",
                class: "puzzle__sector"
            });
            this.circlePath.unshift(`A ${this.innerRadius} ${this.innerRadius} 0 0 0 ${cConPts.end.x} ${cConPts.end.y}
            C ${cConPts.guides.end.x} ${cConPts.guides.end.y} ${cConPts.guides.start.x} ${cConPts.guides.start.y} ${cConPts.start.x} ${cConPts.start.y}
            A ${this.innerRadius} ${this.innerRadius} 0 0 0 ${iArcPts.start.x} ${iArcPts.start.y}`);
            if (this.elements.indexOf(element) == this.elements.length - 1) {
                this.circlePath.unshift(`M ${iArcPts.end.x} ${iArcPts.end.y}`);
            }
            group.add(sector);
            element.title.forEach((el, i) => {
                var textStartPoint = this._getPoint(this.cx, this.cy, this.middleRadius - (middleAngle > 180 ? i * 20 : -i * 20), fromAngle);
                var textEndPoint = this._getPoint(this.cx, this.cy, this.middleRadius - (middleAngle > 180 ? i * 20 : -i * 20), toAngle);
                var text = this.context.text(0, 0, el).attr({
                    class: "puzzle__text",
                    "textpath": `M ${middleAngle > 180 ? textStartPoint.x + " " + textStartPoint.y : textEndPoint.x + " " + textEndPoint.y} 
                A ${this.middleRadius} ${this.middleRadius} 0 0 ${middleAngle < 180 ? 0 : 1 } ${middleAngle > 180 ? textEndPoint.x + " " + textEndPoint.y : textStartPoint.x + " " + textStartPoint.y}`
                });
                text.textPath.attr({
                    "text-anchor": "middle",
                    "startOffset": "50%"
                })
                // IE FIX -->
                text.node.removeAttribute("x");
                text.node.removeAttribute("y");
                // IE FIX <--
                group.add(text);
            });
            group.hover(this._sectorHoverInHandler, this._sectorHoverOutHandler, group, group);
            group.click(function(e) {
                document.location.href = element.link;
            });
            return group;
        }
        _getArcPoints(radius, fromAngle, toAngle) {
            return {
                start: this._getPoint(this.cx, this.cy, radius, fromAngle),
                end: this._getPoint(this.cx, this.cy, radius, toAngle)
            }
        }
        _getConnectorPoints(angle) {
            var start = this._getPoint(this.cx, this.cy, this.connectorStart, angle);
            var end = this._getPoint(this.cx, this.cy, this.connectorEnd, angle);
            return {
                start: start,
                end: end,
                guides: this._getConnectorGuidesPoints(start, end, angle)
            }
        }
        _getCircleConnectorPoints(angle) {
            var offset = this._getAngleByArcLength(this.connectorWidth / 2, this.innerRadius);
            var start = this._getPoint(this.cx, this.cy, this.innerRadius, angle - offset);
            var end = this._getPoint(this.cx, this.cy, this.innerRadius, angle + offset);
            return {
                start: start,
                end: end,
                guides: this._getConnectorGuidesPoints(start, end, angle - 90)
            }
        }
        _getConnectorGuidesPoints(start, end, angle) {
            return {
                start: this._getPoint(start.x, start.y, this.connectorCurveLength, angle + this.connectorCurveAngle),
                end: this._getPoint(end.x, end.y, this.connectorCurveLength, angle + 180 - this.connectorCurveAngle)
            }
        }
        _getPoint(cx, cy, radius, angle) {
            return {
                x: cx + radius * Math.cos(angle * Math.PI / 180),
                y: cy + radius * Math.sin(angle * Math.PI / 180)
            }
        }
        _getAngleByArcLength(length, radius) {
            return length * 180 / Math.PI / radius;
        }

        // EVENTS
        _sectorOnClickHandler(e) {
            location.href(e.element.link);
        } 
        _sectorHoverInHandler(e) {
            var parent = this.parent();
            var elements = parent.children();
            if (elements.indexOf(this) !== elements.length - 1) {
                parent.append(this);
            }
            Snap.animate(1, 1.2, (val) => {
                this.attr({
                    transform: `s${val}`
                })
            }, 150, mina.easein);
            this[0].attr({
                fill: "#8E44AD"
            });
            this[1].attr({
                fill: "#fff"
            });
            this[2].attr({
                fill: "#fff"
            });
        }
        _sectorHoverOutHandler(e) {
            this.stop();
            Snap.animate(1.2, 1, (val) => {
                this.attr({
                    transform: `s${val}`
                })
            }, 150, mina.easeout);
            this[0].attr({
                fill: "rgba(255,255,255,0.4)",
            });
            this[1].attr({
                fill: "#000"
            });
            this[2].attr({
                fill: "#000"
            });
        }
        _setEventHandlers() {
            window.addEventListener("resize", (e) => {
                this._updateSize();
            });
        }
    }
    var elements = [{
            title: ["Розничная", "торговля"],
            link: "/erp/roznichnaya-torgovlya/"
        },
        {
            title: ["Управленческий", "учет"],
            link: "/erp/upravlencheskiy-uchet/"
        },
        {
            title: ["Интернет", "торговля"],
            link: "/erp/internet-torgovlya/"
        },
        {
            title: ["Управление", "продажами"],
            link: "/erp/upravlenie-prodazhami/"
        },
        {
            title: ["Финансовый", "учет"],
            link: "/erp/finansovyy-uchet/"
        },
        {
            title: ["Учет", "производства"],
            link: "/erp/uchet-proizvodstva/"
        }
    ];
    var puzzle = new Puzzle(Snap("#puzzle"), 570, 400, elements);
})();