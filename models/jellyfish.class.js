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

    constructor(x, y) {
        super();
        this.loadImage(`img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`);
        this.loadImages(IMGS_WALKING);
        this.loadImages(IMGS_DEADBUBBLE);
        this.x = x;
        this.y = y;
        this.speed = 0.45 + Math.random() * 0.25;
        this.animate();
        this.changeUpAndDown();
    }

    /**
  * Animates the jelly character by cycling through walking and dead animations.
  * The animation changes every 150 milliseconds.
  */
    animate() {
        const animateJellyInterval = setInterval(() => {
            if (!isPaused) {
                if (this.dead) {
                    this.playAnimation(IMGS_DEADBUBBLE);
                } else {
                    this.playAnimation(IMGS_WALKING);
                }
            }
        }, 150);
        addInterval(animateJellyInterval);
    }

    /**
     * Marks the jelly character as dead and triggers the death animation.
     */
    bubbleDeath() {
        this.dead = true;
    }

    /**
     * Controls the vertical movement of the jelly character.
     * Moves the character up and down in a loop until it is marked as dead.
     * The movement is updated every 1/60th of a second.
     */
    changeUpAndDown() {
        const changeUpDownInterval = setInterval(() => {
            if (this.movingDown && !this.dead) {
                this.changeDown();
            } else if (!this.dead && !this.movingDown) {
                this.movingUp();
            } else if (this.dead && this.y > 0) {
                this.deadAnimation();
            }
        }, 1000 / 60);
        addInterval(changeUpDownInterval);
    }

    /**
     * Moves the jelly character downwards until it reaches a certain point.
     */
    changeDown() {
        this.moveDown();
        if (this.y >= 300) {
            this.movingDown = false;
        }
    }

    /**
     * Moves the jelly character upwards until it reaches a certain point.
     */
    movingUp() {
        this.moveUp();
        if (this.y <= 0) {
            this.movingDown = true;
        }
    }

    /**
     * Handles the jelly character's death animation and sound effects.
     * Moves the character upwards slowly and plays a sound when the character dies.
     * Removes the character from the level's enemies list when it reaches the top.
     */
    deadAnimation() {
        this.y -= 5;
        if (!this.soundPlayed) {
            this.world.sound.jellyHurtSound.play();
            this.soundPlayed = true;
        }
        if (this.y <= 0) {
            level1.enemies = level1.enemies.filter(enemy => enemy !== this);
        }
    }

}