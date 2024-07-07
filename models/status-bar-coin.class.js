class StatusBarCoin extends DraweableObject {

   
    IMAGES_COINS=['img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];



    constructor(){
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;
        this.y = 40;
        this.width = 250;
        this.height = 60;
        this.setPercentCoin(100);
    }

    setPercentCoin(){
      
        let imgPath = this.IMAGES_COINS[0];
        this.img = this.imgCache[imgPath];
        }



}