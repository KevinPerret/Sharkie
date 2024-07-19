class StatusBarPoison extends DraweableObject {
    percentPoison = 0;

    constructor() {
        super();
        this.loadImages(IMAGES_POISON);
        this.x = 10;
        this.y = 80;
        this.width = 150;
        this.height = 50;
        this.setPercentPoison(0);
    }

    /**
    * Sets the poison percentage and updates the status bar image accordingly.
    * @param {number} percentPoison - The percentage of poison to set.
    */
    setPercentPoison(percentPoison) {
        this.percentPoison = percentPoison;
        let imgPath = IMAGES_POISON[this.resolvePoisonImgIndex()];
        this.img = this.imgCache[imgPath];
    }

    /**
     * Resolves the appropriate poison image index based on the current poison percentage.
     * @returns {number} The index of the poison image to use.
     */
    resolvePoisonImgIndex() {
        if (this.percentPoison == 100) {
            return 5;
        } else if (this.percentPoison >= 80) {
            return 4;
        } else if (this.percentPoison >= 60) {
            return 3;
        } else if (this.percentPoison >= 40) {
            return 2;
        } else if (this.percentPoison > 0) {
            return 1;
        } else {
            return 0;
        };
    }

}