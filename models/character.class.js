class Character extends MovableObject {
    imgNr = 0;
    world;
    speed = 10;
    swimmingSound = new Audio('audio/swimShort.mp3');

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
    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMGS_SWIM);
        this.height = 200;
        this.width = 300;
        this.x = 0;
        this.y = 200;
      

        this.animateWalk();
    }

    animateWalk() {
     
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
                this.swimmingSound.play();
                this.swimmingSound.volume = 0.1;
                this.swimmingSound.playbackRate = 1.5;
                
            } else if (this.world.keyboard.LEFT  && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimmingSound.play();
            } else if (this.world.keyboard.UP && this.y > -80) {
                this.y -= this.speed;
                this.swimmingSound.play();
            } else if (this.world.keyboard.DOWN && this.y < 300) {
                this.y += this.speed;
                this.swimmingSound.play();
            } 
            this.world.cameraX = -this.x;
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMGS_SWIM) 

        }, 1000 / 5);
    }




    animateIdle() {
        this.loadImages(this.IMGS_IDLE);
        setInterval(() => {
            this.playAnimation(this.IMGS_IDLE) 

        }, 1000);
    }
}