(function() {
    var selectElements = Array.prototype.slice.call(document.getElementsByClassName("auth-form__select"));
    var optionElements = Array.prototype.slice.call(document.getElementsByClassName("auth-form__option"));

    selectElements.forEach(element => element.addEventListener("click", selectClickHandler));
    optionElements.forEach(element => element.addEventListener("click", optionClickHandler));

    function selectClickHandler(event) {
        element = event.target;
        element.classList.toggle("auth-form__select_active");
    }

    function optionClickHandler(event) {
        element = event.target;
        element.classList.toggle("auth-form__select_active");
    }
})()