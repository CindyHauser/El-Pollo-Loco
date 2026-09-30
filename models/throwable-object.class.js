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

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.x += 12;
            }
        }, 25);
    }

    splash() {
        this.hasSplashed = true;
        this.currentImage = 0;
        this.speedY = 0;
    }

    animate() {
        this.animationInterval = setInterval(() => {
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