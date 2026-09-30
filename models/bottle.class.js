class Bottle extends DrawableObject {

    height = 80;
    width = 70;

    offset = {
        top: 8,
        bottom: 6,
        left: 12,
        right: 12
    }

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
    }
}