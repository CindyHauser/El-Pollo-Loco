class GameOver {

    world;

    /**
     * Creates a game-over handler for the specified game world.
     * @param {World} world The game world whose state is monitored.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Checks whether the character or end boss has been defeated and displays the result.
     */
    checkGameOver() {
        let endScreen = document.getElementById('endScreen');
        if (this.world.character.isDead()) {
            this.youLose(endScreen);
            setTimeout(() => {
                stopGame();
            }, 1500);
        } else if (this.world.level.endboss[0].isDead()) {
            this.youWin(endScreen);
            setTimeout(() => {
                stopGame();
            }, 1500);
        }
    }

    /**
     * Displays the game-over screen, stops the background music, and plays the defeat sound.
     * @param {HTMLElement} endScreen The element used to display the end screen.
     */
    youLose(endScreen) {
        endScreen.style.display = 'flex';
        endScreen.style.backgroundImage = "url('./img/You won, you lost/Game Over.png')";
        document.getElementById('gameBar').style.display = 'none';
        document.getElementById('responsiveBar').classList.remove('touchBtns');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        youLose.play();
    }

    /**
     * Displays the victory screen, stops the background music, and plays the victory sound.
     * @param {HTMLElement} endScreen The element used to display the end screen.
     */
    youWin(endScreen) {
        endScreen.style.display = 'flex';
        endScreen.style.backgroundImage = "url('./img/You won, you lost/You Win A.png')";
        document.getElementById('gameBar').style.display = 'none';
        document.getElementById('responsiveBar').classList.remove('touchBtns');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        youWin.play();
    }
}