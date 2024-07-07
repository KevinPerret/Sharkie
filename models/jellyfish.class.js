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
    constructor(x, y) {
        super();
        this.loadImage(`img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`);
        this.loadImages(this.IMGS_WALKING);
        this.x = x;
        this.y = y;
        this.speed = 0.45 + Math.random() * 0.25;
        this.animate();
        this.changeUpAndDown();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMGS_WALKING)

        }, 150);

    }

    changeUpAndDown() {
        setInterval(() => {
            if (this.movingDown) {
                this.moveDown();
                if (this.y >= 300) { // Change direction at y = 300
                    this.movingDown = false;
                }
            } else {
                this.moveUp();
                if (this.y <= 0) { // Change direction at y = 0
                    this.movingDown = true;
                }
            }
        }, 1000 / 60); // Run the movement logic at 60 FPS
    }
}