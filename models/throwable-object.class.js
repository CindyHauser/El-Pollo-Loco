class ThrowableObject extends MovableObject {

    hasSplashed = false;

    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    /**
     * Creates a throwable bottle, sets its position and direction, and starts it moving and animating.
     * @param {number} x Initial horizontal position.
     * @param {number} y Initial vertical position.
     * @param {boolean} otherDirection Whether the bottle is thrown to the left.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    /**
     * Applies upward velocity and gravity, then moves the bottle horizontally in its throw direction.
     */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        if (this.otherDirection) {
            this.throwInterval = setStoppableInterval(() => {
                if (!this.hasSplashed) {
                    this.x -= 12;}
            }, 25);
        } else {
            this.throwInterval = setStoppableInterval(() => {
                if (!this.hasSplashed) {
                    this.x += 12;}
            }, 25);
        }
    }

    /**
     * Marks the bottle as splashed, plays the splash sound, and stops its upward movement.
     */
    splash() {
        this.hasSplashed = true;
        bottleSplash.currentTime = 0;
        bottleSplash.play();
        this.currentImage = 0;
        this.speedY = 0;
    }

    /**
     * Starts the bottle rotation animation and plays the splash animation when applicable.
     * Removes the bottle after the splash animation finishes.
     */
    animate() {
        this.animationInterval = setStoppableInterval(() => {
            if (!this.hasSplashed) {
                this.playAnimation(this.IMAGES_THROW_BOTTLE);
            } else if (this.currentImage < this.IMAGES_BOTTLE_SPLASH.length) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                clearInterval(this.animationInterval);
                clearInterval(this.throwInterval);
                this.remove = true;
            }
        }, 1000 / 60);
    }
}