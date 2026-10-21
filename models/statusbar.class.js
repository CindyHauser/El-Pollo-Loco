class StatusBar extends DrawableObject {

    percentage = 100;

    /**
     * Initializes a status bar with its default percentage.
     */
    constructor() {
        super();
    }

    /**
     * Updates the displayed percentage and selects the corresponding image.
     * @param {string[]} arr Image paths ordered by percentage level.
     * @param {number} percentage Current status percentage.
     */
    setPercentage(arr, percentage) {
        this.percentage = percentage;
        let path = arr[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index that corresponds to the current percentage.
     * @returns {number} Index of the image for the current percentage range.
     */
    resolveImageIndex() {
        if (this.percentage >80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}