class StatusBarLife extends DraweableObject {
    percent = 100;

    constructor(x, y) {
        super();
        this.loadImages(IMAGES_LIFE_YELLOW);
        this.loadImages(IMAGES_LIFE_ORANGE);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 50;
        this.setPercent(100);
    }

    /**
     * Sets the percentage value and updates the image based on that percentage.
     * @param {number} percent - The percentage value to set (0 to 100).
     */
    setPercent(percent) {
        this.percent = percent;
        let imgPath = IMAGES_LIFE_YELLOW[this.resolveImgIndex()];
        this.img = this.imgCache[imgPath];
    }

    /**
     * Sets the percentage value for the boss and updates the image based on that percentage.
     * The percentage for the boss is doubled.
     * @param {number} percent - The percentage value to set (0 to 100).
     */
    setPercentBoss(percent) {
        this.percent = percent * 2;
        let imgPath = IMAGES_LIFE_ORANGE[this.resolveImgIndex()];
        this.img = this.imgCache[imgPath];
    }

    /**
     * Resolves the image index based on the current percentage value.
     * @returns {number} The index of the image corresponding to the percentage range.
     */
    resolveImgIndex() {

        if (this.percent == 100) {
            return 5;
        } else if (this.percent >= 80) {
            return 4;
        } else if (this.percent >= 60) {
            return 3;
        } else if (this.percent >= 40) {
            return 2;
        } else if (this.percent > 0) {
            return 1;
        } else {
            return 0;
        };
    }


}