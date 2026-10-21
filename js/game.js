let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let isPaused = false;
let intervalFunctions = [];

/**
 * Starts an interval that can be stopped or restarted with the game.
 * @param {Function} fn Function to execute at each interval.
 * @param {number} time Delay between executions in milliseconds.
 * @returns {number} Identifier of the created interval.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    intervalFunctions.push({ fn, time });
    return id;
}

/**
 * Stops all currently registered game intervals.
 */
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

/**
 * Toggles the game between paused and running states and updates the pause button.
 */
function pauseGame() {
    if (!isPaused) {
        pausedGame();
    } else {
        continueGame();
    }
    document.getElementById('pauseBtn').innerHTML = isPaused ?
        '<img src="./assets/buttons/play-canvas.svg" alt="pause Button">' :
        '<img src="./assets/buttons/pause-canvas.svg" alt="pause Button">';
}

/**
 * Pauses the game intervals and background music.
 */
function pausedGame() {
    stopGame();
    isPaused = true;
    backgroundMusic.pause();
}

/**
 * Restarts the registered intervals and resumes the background music.
 */
function continueGame() {
    intervalIDs = [];
    intervalFunctions.forEach(({ fn, time }) => {
        let id = setInterval(fn, time);
        intervalIDs.push(id);
    })
    backgroundMusic.play();
    isPaused = false;
}

/**
 * Hides the start screen and initializes a new game.
 */
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.querySelector('.impressum_link').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('gameBar').style.display = 'flex';
    document.getElementById('responsiveBar').classList.add('touchBtns');
    backgroundMusic.play();
    initLevel();
    init();
}

/**
 * Resets game intervals and starts a new game after a game-over screen.
 */
function restartGame() {
    intervalIDs = [];
    intervalFunctions = [];
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('gameBar').style.display = 'flex';
    document.getElementById('responsiveBar').classList.add('touchBtns');
    backgroundMusic.play();
    initLevel();
    init();
}

/**
 * Returns to the start screen and hides the game interface.
 */
function homeScreen() {
    intervalIDs = [];
    document.getElementById('startScreen').style.display = 'flex';
    document.querySelector('.impressum_link').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('responsiveBar').classList.remove('touchBtns');
}

/**
 * Creates the game world using the canvas and keyboard controls.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

/**
 * Toggles fullscreen mode for the game wrapper.
 */
function toggleFullscreen() {
    let game = document.querySelector('.canvas_endscreen_startscreen_wrapper');
    if (!document.fullscreenElement) {
        game.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key === "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key === " ") {
        keyboard.SPACE = true;
    }
    if (event.key === "d") {
        keyboard.D = true;
    }
})

window.addEventListener("keyup", event => {
    if (event.key === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key === "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key === " ") {
        keyboard.SPACE = false;
    }
    if (event.key === "d") {
        keyboard.D = false;
    }
})

window.addEventListener('load', () => {
    addTouchEvents('btnLeft', 'LEFT');
    addTouchEvents('btnRight', 'RIGHT');
    addTouchEvents('btnThrow', 'D');
    addTouchEvents('btnJump', 'UP');
    addTouchEvents('btnJump', 'SPACE');
});

/**
 * Connects touch events on a button to a keyboard control state.
 * @param {string} btnID ID of the button element.
 * @param {string} key Keyboard control property to update.
 */
function addTouchEvents(btnID, key) {
    document.getElementById(btnID).addEventListener('touchstart', event => {
        event.preventDefault();
        keyboard[key] = true;
    });

    document.getElementById(btnID).addEventListener('touchend', event => {
        event.preventDefault();
        keyboard[key] = false;
    })

    document.getElementById(btnID).addEventListener('touchcancel', () => {
        keyboard[key] = false;
    })
}