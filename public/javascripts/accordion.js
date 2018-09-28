(function () {
    window.addEventListener("load", function () {
        var elements = document.querySelectorAll(".js-accordion")
        elements.forEach(function (el) {
            el.addEventListener("onclick", onClick);
        });
    });

    function onClick(e) {
        var el = e.target;
	    var parentNode = el.parentNode;
	    if (!el.classList.contains('accordion__title')) return;
	    parentNode.classList.toggle('accordion__item_actived');
    }

})();