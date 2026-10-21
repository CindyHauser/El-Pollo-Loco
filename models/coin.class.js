class Coin extends DrawableObject {

    height = 120;
    width = 120;

    offset = {
        top: 30,
        bottom: 30,
        left: 25,
        right: 25
    }

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a coin at the specified position and starts its animation.
     * @param {number} x Horizontal position of the coin.
     * @param {number} y Vertical position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.loadImage('img/8_coin/coin_1.png');
        this.animate();
    }

    /**
     * Starts the interval that cycles through the coin images.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}