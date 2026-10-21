/**
 * Toggles the controls and story dialog between open and closed states.
 */
function toggleDialog() {
    let openControls = document.getElementById('dialogControlsStory');
    if (openControls.open) {
        openControls.close();
    } else {
        openControls.showModal();
    };
}

/**
 * Stops an event from propagating to parent elements.
 * @param {Event} event Event whose propagation should be stopped.
 */
function stopPropagation(event) {
    event.stopPropagation();
}