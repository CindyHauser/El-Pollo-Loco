class GameOver {

    world;

    constructor(world) {
        this.world = world;
    }

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

    youLose(endScreen) {
        endScreen.style.display = 'flex';
        endScreen.style.backgroundImage = "url('../img/You won, you lost/Game Over.png')";
        document.getElementById('gameBar').style.display = 'none';
        document.getElementById('responsiveBar').classList.remove('touchBtns');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        youLose.play();
    }

    youWin(endScreen) {
        endScreen.style.display = 'flex';
        endScreen.style.backgroundImage = "url('../img/You won, you lost/You Win A.png')";
        document.getElementById('gameBar').style.display = 'none';
        document.getElementById('responsiveBar').classList.remove('touchBtns');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        youWin.play();
    }
}