(function () {
    window.addEventListener("load", function () {
        var elements = document.querySelectorAll(".js-image-swap");
        elements.forEach(function (el) {
            el.addEventListener("onmouseenter", onMouseEnter);
        });
        elements.forEach(function (el) {
            el.addEventListener("onmouseleave", onMouseLeave);
        });
    });

    function onMouseEnter(e) {
        var el = e.target;
        var curSrc = el.getAttribute('src');
        var newSrc = el.getAttribute('data-src');
        el.setAttribute('src', newSrc);
        el.setAttribute('data-src', curSrc);
    }

    function onMouseLeave(e) {
        var el = e.target;
        var curSrc = el.getAttribute('src');
        var newSrc = el.getAttribute('data-src');
        el.setAttribute('src', newSrc);
        el.setAttribute('data-src', curSrc);
    }

})();