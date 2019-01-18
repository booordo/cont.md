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
        var id = e.target.dataset.src;
        window.location.hash = id;
        disableScrolling();
        open(document.getElementById(id)); 
    }

    function onButtonClick() {
        window.history.back();
    }

    function onHashChange() {
        if (window.location.hash !== "") return;
        var elements = Array.prototype.slice.call(document.querySelectorAll(".modal"));
        elements.forEach(close);
        enableScrolling();
    }

    function open(modal) {
        modal.classList.add("modal_active");
    }

    function close(modal) {
        modal.classList.remove("modal_active");
    }

    function enableScrolling() {
        document.body.style.overflow = '';
    }

    function disableScrolling() {
        document.body.style.overflow = 'hidden';
    }
})()