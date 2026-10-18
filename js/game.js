let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let isPaused = false;
let intervalFunctions = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    intervalFunctions.push({ fn, time });
    return id;
}

function stopGame() {
    intervalIDs.forEach(clearInterval);
}

function pauseGame() {
    if (!isPaused) {
        stopGame();
        isPaused = true;
        backgroundMusic.pause();
    } else {
        intervalIDs = [];
        intervalFunctions.forEach(({ fn, time }) => {
            let id = setInterval(fn, time);
            intervalIDs.push(id);
        })
        backgroundMusic.play();
        isPaused = false;
    }
    document.getElementById('pauseBtn').innerHTML = isPaused ? '<img src="./assets/buttons/play-canvas.svg" alt="pause Button">' : '<img src="./assets/buttons/pause-canvas.svg" alt="pause Button">';
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('gameBar').style.display = 'flex';
    document.getElementById('responsiveBar').classList.add('touchBtns');
    backgroundMusic.play();
    initLevel();
    init();
}

function restartGame() {
    intervalIDs = [];
    intervalFunctions = [];
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('gameBar').style.display = 'flex';
    backgroundMusic.play();
    initLevel();
    init();
}

function homeScreen() {
    intervalIDs = [];
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('responsiveBar').classList.remove('touchBtns');
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

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