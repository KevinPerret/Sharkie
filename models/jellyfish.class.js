class JellyFish extends MovableObject {
    imgNr = 1;
    world;
    movingDown = true;

    offset ={
        top: 0,
        bottom: 0,
        left: 0,
        right:0
    }
    IMGS_WALKING = [
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png`
    ];

    IMGS_DEADBUBBLE = ['img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
    constructor(x, y) {
        super();
        this.loadImage(`img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`);
        this.loadImages(this.IMGS_WALKING);
        this.loadImages(this.IMGS_DEADBUBBLE);
        this.x = x;
        this.y = y;
        this.speed = 0.45 + Math.random() * 0.25;
        this.animate();
        this.changeUpAndDown();
    }

    animate() {
        setInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMGS_DEADBUBBLE);
              
            } else {
            this.playAnimation(this.IMGS_WALKING)}

        }, 150);

    }

    bubbleDeath() {
        this.dead = true;
    }


    changeUpAndDown() {
        setInterval(() => {
            if (this.movingDown && !this.dead) {
                this.moveDown();
                if (this.y >= 300) {
                    this.movingDown = false;
                }
            } else if (!this.dead && !this.movingDown){
                this.moveUp();
                if (this.y <= 0) { 
                    this.movingDown = true;
                }
            }else if(this.dead){
                this.y -= 7;
                this.world.sound.jellyHurtSound.play();
                if(this.y <=0){
                    level1.enemies = level1.enemies.filter(enemy => enemy !== this);
                    this.world.sound.jellyHurtSound.pause();

                }
            }
        }, 1000 / 60);
    }
}