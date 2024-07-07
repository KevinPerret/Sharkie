class StatusBarPoison extends DraweableObject {
    IMAGES_POISON=['img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];



    constructor(){
        super();
        this.loadImages(this.IMAGES_POISON);
        this.x = 10;
        this.y = 80;
        this.width = 250;
        this.height = 60;
        this.setPercentPoison(100);
    }

    setPercentPoison(){
      
        let imgPath = this.IMAGES_POISON[0];
        this.img = this.imgCache[imgPath];
        }

}