class StatusBarCoin extends DraweableObject {
    percentCoin = 0;

    constructor() {
        super();
        this.loadImages(IMAGES_COINS);
        this.x = 10;
        this.y = 40;
        this.width = 150;
        this.height = 50;
        this.setPercentCoin(0);
    }

    /**
     * Sets the image for the coin based on the given percentage.
     * Updates the current image to reflect the state of the coin according to its percentage.
     * @param {number} percentCoin - The percentage value representing the coin's state (0 to 100).
     */
    setPercentCoin(percentCoin) {
        let imgPath = IMAGES_COINS[this.resolveCoinImgIndex(percentCoin)];
        this.img = this.imgCache[imgPath];
    }

    /**
     * Resolves the image index based on the given percentage for the coin.
     * Determines which image to use from the `IMAGES_COINS` array based on the percentage range.
     * @param {number} percentCoin - The percentage value representing the coin's state (0 to 100).
     * @returns {number} The index of the image corresponding to the percentage range.
     */
    resolveCoinImgIndex(percentCoin) {
        if (percentCoin >= 100) {
            return 5;
        } else if (percentCoin >= 60) {
            return 4;
        } else if (percentCoin >= 40) {
            return 3;
        } else if (percentCoin >= 20) {
            return 2;
        } else if (percentCoin > 0) {
            return 1;
        } else if (percentCoin === 0) {
            return 0;
        }
    }


}