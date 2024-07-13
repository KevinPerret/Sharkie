class StatusBarPoison extends DraweableObject {
    IMAGES_POISON = ['img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];


    percentPoison = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_POISON);
        this.x = 10;
        this.y = 80;
        this.width = 150;
        this.height = 50;
        this.setPercentPoison(0);
    }

    setPercentPoison(percentPoison) {
        this.percentPoison = percentPoison;
        let imgPath = this.IMAGES_POISON[this.resolvePoisonImgIndex()];	
        this.img = this.imgCache[imgPath];
    }
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