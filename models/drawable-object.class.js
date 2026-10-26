class DrawableObject {

    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    currentJumpImage = 0;
    lastJumpImageTime = 0;
    remove = false;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Loads an image and assigns it as the drawable object's current image.
     * @param {string} path Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image on the canvas at the object's position and size.
     * @param {CanvasRenderingContext2D} ctx Canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads images into the object's cache for later use.
     * @param {string[]} arr Paths to the image files.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Displays the next image in the animation sequence.
     * @param {string[]} images Paths to the animation image files.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Advances the jump animation to the next frame if enough time has passed.
     * The method updates the current displayed image and throttles the animation speed.
     * @param {string[]} images Array of image paths used for the jump animation sequence.
     */
    playJumpAnimation(images) {
        if (Date.now() - this.lastJumpImageTime > 80) {
            if (this.currentJumpImage < images.length) {
                let path = images[this.currentJumpImage];
                this.img = this.imageCache[path];
                this.currentJumpImage++;
                this.lastJumpImageTime = Date.now();
            }
        }
    }
}