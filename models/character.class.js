class Character extends MovableObject {
    imgNr = 0;
    world;
    speed = 10;
    coins = 100;
    swimmingSound = new Audio('audio/swimShort.mp3');
    moving = false;
    isShooting = false;
    IMGS_IDLE = ['img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'];

    IMGS_SWIM = ['img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    IMGS_SHOCKED = ['img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/2.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png'
    ]

    IMGS_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ]

    IMGS_SHOOT = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ]

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMGS_SWIM);
        this.loadImages(this.IMGS_IDLE);
        this.loadImages(this.IMGS_SHOCKED);
        this.loadImages(this.IMGS_DEAD);
        this.loadImages(this.IMGS_SHOOT);
        this.height = 200;
        this.width = 200;
        this.x = 200;
        this.y = 200;

        this.sinking();
        this.moveChar();
    }

    moveChar() {
        this.moving = false;
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX ) {
                this.x += this.speed;
                this.otherDirection = false;
                this.moving = true;
            } else if (this.world.keyboard.LEFT && this.x > -200) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.moving = true;
            } else if (this.world.keyboard.UP && this.y > -80) {
                this.y -= this.speed;
                this.moving = true;
            } else if (this.world.keyboard.DOWN && this.y < 300) {
                this.y += this.speed;
                this.moving = true;
            }
            this.world.cameraX = -this.x +200;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMGS_DEAD);
            } else if (this.moving && !this.isHurt() && !this.isShooting) {
                this.playAnimation(this.IMGS_SWIM);
            } else if (!this.moving && !this.isHurt() && !this.isShooting) {
                this.playAnimation(this.IMGS_IDLE);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMGS_SHOCKED);
            } else if (this.isShooting) {
                this.playAnimation(this.IMGS_SHOOT);
                
            }
        }, 100);
    
        this.animateSwim();
    }


    sinking() {
        setInterval(() => {
            if (this.y < 300 && !this.moving) {
                this.y += 0.15;
            }
        }, 1000 / 60);

    }

    animateSwim() {
        setInterval(() => {
            if (this.moving) {
                this.swimmingSound.play();
                this.swimmingSound.volume = 0.1;
                this.swimmingSound.playbackRate = 1.5;
            }
            this.moving = false;
        }, 1000 / 5);
    }

    animateShooting() {
        this.imgNr = 0;
        this.isShooting = true;
        setTimeout(() => {
            this.isShooting = false;
            this.world.createBubble();
        }, 1000);
    }
    
}
