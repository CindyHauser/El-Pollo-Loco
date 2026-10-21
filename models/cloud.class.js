class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;
    speed = 0.05;

    /**
     * Creates a cloud with a random horizontal offset and starts its movement.
     * @param {number} x Base horizontal position to which a random offset is added.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 500;
        this.animate();
    };

    /**
     * Starts the interval that continuously moves the cloud to the left.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        })
    };
}