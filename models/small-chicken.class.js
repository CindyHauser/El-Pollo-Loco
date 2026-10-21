class SmallChicken extends MovableObject {

    dead = false;
    y = 370;
    height = 55;
    width = 60;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    deadImage = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Creates a small chicken with a random position and movement speed.
     * @param {number} x The starting position to which a random offset is added.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    /**
     * Starts the movement and animation intervals for the small chicken.
     * While it is alive, the chicken moves left and plays its walking animation.
     */
    animate() {
        this.moveInterval = setStoppableInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setStoppableInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}