class JellyFish extends MovableObject {
    imgNr = 1;
    world;
    movingDown = true;
    soundPlayed = false;
    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
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
       const animateJellyInterval= setInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMGS_DEADBUBBLE);

            } else {
                this.playAnimation(this.IMGS_WALKING)
            }
            addInterval(animateJellyInterval);
        }, 150);

    }

    bubbleDeath() {
        this.dead = true;
    }


    changeUpAndDown() {
       const changeUpDownInterval= setInterval(() => {
            if (this.movingDown && !this.dead) {
                this.moveDown();
                if (this.y >= 300) {
                    this.movingDown = false;
                }
            } else if (!this.dead && !this.movingDown) {
                this.moveUp();
                if (this.y <= 0) {
                    this.movingDown = true;
                }
            } else if (this.dead && this.y > 0) {
                this.y -= 5;
                if (!this.soundPlayed) {
                    this.world.sound.jellyHurtSound.play();
                    this.soundPlayed = true;
                }
                if (this.y <= 0) {
                    level1.enemies = level1.enemies.filter(enemy => enemy !== this);
                }
            }
        }, 1000 / 60);
        addInterval(changeUpDownInterval);
    }
}