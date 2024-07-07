class StatusBarLife extends DraweableObject {

    IMAGES_LIFE =['img/4. Marcadores/green/Life/0.png',
        'img/4. Marcadores/green/Life/20.png',
        'img/4. Marcadores/green/Life/40.png',
        'img/4. Marcadores/green/Life/60.png',
        'img/4. Marcadores/green/Life/80.png',
        'img/4. Marcadores/green/Life/100.png'
    ];

    IMAGES_COINS=['img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    percent = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES_LIFE);
        this.x = 10;
        this.y = 0;
        this.width = 250;
        this.height = 60;
        this.setPercent(100);
    }

    setPercent(percent){
        this.percent = percent;
        let imgPath = this.IMAGES_LIFE[this.resolveImgIndex()];
        this.img = this.imgCache[imgPath];
        }

    resolveImgIndex(){
        
        if(this.percent == 100){
            return 5;
        } else if(this.percent == 80){
            return 4;
        } else if(this.percent == 60){
            return 3;
        }else if(this.percent == 40){
            return 2;
        } else if(this.percent == 20){
            return 1;
        } else {
            return 0;
        };
    }
 

}