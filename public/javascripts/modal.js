(function() {
    window.addEventListener("load", function() {
        var elements = document.querySelectorAll(".js-modal")
        var modals = document.querySelectorAll(".modal")
        elements = Array.prototype.slice.call(elements)
        modals = Array.prototype.slice.call(modals)
        elements.forEach(function(el) {
            el.addEventListener("click", onLinkClick)
        })
        modals.forEach(function(el) {
            el.addEventListener("click", onModalClick)
        })
    })

    function onLinkClick(e) {
        var el = e.target
        var id = el.getAttribute("href")
        var modal = document.querySelector(id)
        modal.classList.add("modal_active")
        disableScrolling()
        e.preventDefault()
    }

    function onModalClick(e) {
        var el = e.target
        if (el.classList.contains("modal")) {
            el.classList.remove("modal_active")
            enableScrolling()
        }
    }

    function enableScrolling() {
        document.body.style.overflow = ''
    }

    function disableScrolling() {
        document.body.style.overflow = 'hidden'
    }
})()