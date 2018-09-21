(function() {
    var inputElement = document.getElementById("personTypeInput");
    var selectElement = document.getElementById("personTypeSelect");
    var optionsElement = document.getElementById("personTypeOptions");
    var optionElements = Array.prototype.slice.call(optionsElement.children);

    selectElement.addEventListener("click", selectClickHandler);
    optionElements.forEach(element => element.addEventListener("click", optionClickHandler));

    function selectClickHandler(event) {
        element = event.target;
        if (element !== this) element = element.closest(".auth-form__selected");
        element.classList.toggle("auth-form__selected_active");
    }

    function optionClickHandler(event) {
        element = event.target;
        inputElement.value = element.dataset.value;
        selectElement.innerHTML = element.innerHTML;
        selectElement.classList.toggle("auth-form__selected_active");
    }
})()