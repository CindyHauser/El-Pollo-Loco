const backgroundMusic = new Audio('audio/background-music.mp3');
const jumpSound = new Audio('audio/jumping.wav');
const coinSound = new Audio('audio/coin.mp3');
const bottlePickUp = new Audio('audio/bottle-pick-up.wav');

let isMuted = false;

backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;
jumpSound.volume = 0.1;
coinSound.volume = 0.2;
bottlePickUp.volume = 0.2;

function toggleMuteSounds() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    jumpSound.muted = isMuted;
    coinSound.muted = isMuted;
    bottlePickUp.muted = isMuted;
    document.getElementById('muteSoundsBtn').innerHTML = isMuted ? '<img src="./assets/buttons/sound-off.svg" alt="sound off">' : 
    '<img src="./assets/buttons/sound-on.svg" alt="sound on">';
}