class StatusBarCoin extends DraweableObject {

   
    IMAGES_COINS=['img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

percentCoin = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 40;
        this.width = 150;
        this.height = 50;
        this.setPercentCoin(0);
    }

    setPercentCoin(percentCoin){
        let imgPath = this.IMAGES_COINS[this.resolveCoinImgIndex(percentCoin)];
        this.img = this.imgCache[imgPath];
        }

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
        } else if (percentCoin == 0) {
            return 0;
        };
    }

}