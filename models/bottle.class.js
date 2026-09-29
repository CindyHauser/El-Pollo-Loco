class Bottle extends DrawableObject {

    height = 80;
    width = 70;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
    }
}