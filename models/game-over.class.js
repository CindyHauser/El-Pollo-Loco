class GameOver {

    world;

    constructor(world) {
        this.world = world;
    }

    checkGameOver(){
        let endScreen = document.getElementById('endScreen');
        if (this.world.character.isDead()) {
            endScreen.style.display = 'flex';
            endScreen.style.backgroundImage = "url('../img/You won, you lost/Game Over.png')";
            console.log('you lost');            
        } else if(this.world.level.endboss[0].isDead()) {
            endScreen.style.display = 'flex';
            endScreen.style.backgroundImage = "url('../img/You won, you lost/You Win A.png')";
            console.log('you win');
        }
    }
}