function toggleDialog() {
    let openControls = document.getElementById('dialogControlsStory');
    if (openControls.open) {
        openControls.close();
    } else {
        openControls.showModal();
    };
}

function stopPropagation(event) {
    event.stopPropagation();
}

function enterFullscreen() {
    if (window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => { });
        }
    }
}