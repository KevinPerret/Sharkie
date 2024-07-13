class Endboss extends MovableObject {
    world;
    hurt = false;
    imgNr = 1;
    health = 100;
    isDead = false;
    offset = {
        top: 220,
        bottom: 120,
        left: 10,
        right: 10
    }
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

    IMGS_HURT = ['img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ]

    IMGS_BOSSDEAD =['img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ]
    constructor() {
        super();
        this.loadImage(`img/2.Enemy/3 Final Enemy/1.Introduce/1.png`);
        this.loadImages(this.IMGS_INTRODUCE);
        this.loadImages(this.IMGS_FLOATING);
        this.loadImages(this.IMGS_HURT);
        this.loadImages(this.IMGS_BOSSDEAD);
        this.height = 480;
        this.width = 480;
        this.x = 5600;
        this.y = 0;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        let i = 0;
        let firstContact = false;
       let test= setInterval(() => {

            if (this.world.character.x >= 5200 && !firstContact) {
                this.playAnimation(this.IMGS_INTRODUCE);
                i++;
                if (i > 10) {
                    firstContact = true;
                }
            } else if (firstContact && !this.hurt && !this.isDead) {
                this.playAnimation(this.IMGS_FLOATING);
            } else if (this.hurt && !this.isDead) {
                this.playAnimation(this.IMGS_HURT);
            }else if(this.isDead){
                this.playAnimation(this.IMGS_BOSSDEAD);
                console.log(this.lastImg);
                if (this.lastImg) {
                    clearInterval(test);
                }
            }
        }, 1000 / 10);

    }

    hitByBubble() {
        this.health -= 10;
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 1000);
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
}