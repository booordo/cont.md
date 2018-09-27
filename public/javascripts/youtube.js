var YTPlayer;

function onYouTubeIframeAPIReady() {
    YTPlayer = new YT.Player('Youtube', {
        height: 510,
        width: 900
    });
}

(function () {
    var modal = document.getElementById('videoModal');

    window.addEventListener("load", function () {
        var openLinks = document.querySelectorAll(".js-video-open");
        var closeLinks = document.querySelectorAll(".js-video-close");
        openLinks.forEach(function (el) {
            el.addEventListener("click", onOpenLinkClick);
        });
        closeLinks.forEach(function (el) {
            el.addEventListener("click", onCloseLinkClick);
        });
    });

    function onOpenLinkClick(e) {
        if (!YTPlayer) return;
        disableScrolling();
        modal.classList.add('video_actived');
        YTPlayer.loadVideoById(e.target.getAttribute('data-target'));
        YTPlayer.playVideo();
        e.preventDefault();
    }

    function onCloseLinkClick(e) {
        if (!YTPlayer) return;
        enableScrolling();
        modal.classList.remove('video_actived');
        YTPlayer.pauseVideo();
        e.preventDefault();
    }

    function enableScrolling() {
        document.body.style.overflow = '';
    }

    function disableScrolling() {
        document.body.style.overflow = 'hidden';
    }

})();