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