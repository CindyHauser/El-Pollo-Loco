class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    deadImage;

    /**
     * Initializes a movable object.
     */
    constructor() {
        super();
    }

    /**
     * Marks the object as dead, displays its death image, and schedules its removal.
     */
    die() {
        this.dead = true;
        this.energy = 0;
        this.loadImage(this.deadImage);
        setTimeout(() => {
            this.remove = true;
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
        }, 1000);
    }

    /**
     * Starts applying gravity to the object at regular intervals.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this instanceof ThrowableObject && this.hasSplashed) return;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground.
     * @returns {boolean} Whether the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks whether this object overlaps another object, accounting for both hitboxes.
     * @param {MovableObject} mo The object to check for a collision with.
     * @returns {boolean} Whether the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    };

    /**
     * Reduces the object's energy when it is not already hurt.
     */
    hit() {
        if (this.isHurt()) return;
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object was hit within the last second.
     * @returns {boolean} Whether the object is currently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;        
        return timepassed < 1;
    }

    /**
     * Checks whether the object's energy has reached zero.
     * @returns {boolean} Whether the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right and clears its reversed-direction state.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    };

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Applies an upward velocity to make the object jump.
     */
    jump() {
        this.speedY = 30;
    };
};
