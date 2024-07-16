class StatusBarLife extends DraweableObject {

    IMAGES_LIFE_YELLOW = ['img/4. Marcadores/green/Life/0.png',
        'img/4. Marcadores/green/Life/20.png',
        'img/4. Marcadores/green/Life/40.png',
        'img/4. Marcadores/green/Life/60.png',
        'img/4. Marcadores/green/Life/80.png',
        'img/4. Marcadores/green/Life/100.png'
    ];

    IMAGES_LIFE_ORANGE =['img/4. Marcadores/orange/0_ Life.png',
        'img/4. Marcadores/orange/20_ Life.png',
        'img/4. Marcadores/orange/40_ Life.png',
        'img/4. Marcadores/orange/60_ Life.png',
        'img/4. Marcadores/orange/80_ Life.png',
        'img/4. Marcadores/orange/100_ Life.png'
    ]



    percent = 100;

    constructor(x) {
        super();
        this.loadImages(this.IMAGES_LIFE_YELLOW);
        this.loadImages(this.IMAGES_LIFE_ORANGE);
        this.x = x;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setPercent(100);
    }

    setPercent(percent) {
        this.percent = percent;
        let imgPath = this.IMAGES_LIFE_YELLOW[this.resolveImgIndex()];
        this.img = this.imgCache[imgPath];
    }

    setPercentBoss(percent) {
        this.percent = percent;
        let imgPath = this.IMAGES_LIFE_ORANGE[this.resolveImgIndex()];
        this.img = this.imgCache[imgPath];
    }

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