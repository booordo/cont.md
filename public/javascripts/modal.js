(function() {
    window.addEventListener("load", function() {
        var elements = document.querySelectorAll(".js-modal");
        var buttons = document.querySelectorAll(".modal__button");
        elements = Array.prototype.slice.call(elements);
        buttons = Array.prototype.slice.call(buttons);
        elements.forEach(function(el) {
            el.addEventListener("click", onLinkClick);
        });
        buttons.forEach(function(el) {
            el.addEventListener("click", onButtonClick);
        });
        window.addEventListener("hashchange", onHashChange);
    })

    function onLinkClick(e) {
        var id = e.target.getAttribute("data-src");
        var modal = document.getElementById(id);
        window.location.hash = id;
        modal.classList.add("modal_active");
        disableScrolling(); 
    }

    function onButtonClick(e) {
        var button = e.target;
        var modal = button.closest(".modal");
        window.history.back();
        modal.classList.remove("modal_active");
        enableScrolling();
    }

    function onHashChange() {
        var elements = document.querySelectorAll(".modal");
        elements = Array.prototype.slice.call(elements);
        elements.forEach(function(el) {
            if(window.location.hash != "#" + el.getAttribute("id") && el.classList.contains("modal_active")) {
                enableScrolling();
                el.classList.remove("modal_active");
            }
        });
    }

    function enableScrolling() {
        document.body.style.overflow = '';
    }

    function disableScrolling() {
        document.body.style.overflow = 'hidden';
    }
})()