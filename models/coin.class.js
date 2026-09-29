class Coin extends DrawableObject {

    height = 120;
    width = 120;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.loadImage('img/8_coin/coin_1.png');
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}