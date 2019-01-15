(function () {
    window.addEventListener("load", function () {
        var link = document.querySelector(".js-download");
        link.addEventListener("click", onClick);
    });

    function onClick(e) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/download.php');
        xhr.send();
    }
})();