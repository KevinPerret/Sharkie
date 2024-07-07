class Endboss extends MovableObject {
    world;
    imgNr = 1;
    IMGS_INTRODUCE = [
        `img/2.Enemy/3 Final Enemy/1.Introduce/1.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/2.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/3.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/4.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/5.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/6.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/7.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/8.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/9.png`,
        `img/2.Enemy/3 Final Enemy/1.Introduce/10.png`
    ];

    IMGS_FLOATING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    constructor() {
        super();
        this.loadImage( `img/2.Enemy/3 Final Enemy/1.Introduce/1.png`);
        this.loadImages(this.IMGS_INTRODUCE);
        this.loadImages(this.IMGS_FLOATING);
        this.height = 480;
        this.width = 480;
        this.x = 4500;
        this.y = 0;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        let i =0;
        let firstContact = false;
        setInterval(() => {
          
            if (this.world.character.x >= 1300 && !firstContact ) {
                this.playAnimation(this.IMGS_INTRODUCE);
                i++;
                if (i == 10) {
                    firstContact = true; 
                }
            } else if ( firstContact) {  
                this.playAnimation(this.IMGS_FLOATING); 
            } 
        }, 1000/10);

    }


}