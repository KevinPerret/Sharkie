class Character extends MovableObject {
    imgNr = 0;
    world;
    speed = 7;
    moving = false;
    isShooting = false;
    sleeping = false;
    deepSleep = false;
    sleepTimerRunning = false;
    isAttacking = false;
    iframes = false;
    offset = {
        top: 95,
        bottom: 40,
        left: 50,
        right: 30
    }

    constructor(energie) {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(IMGS_SWIM);
        this.loadImages(IMGS_IDLE);
        this.loadImages(IMGS_SHOCKED);
        this.loadImages(IMGS_DEAD);
        this.loadImages(IMGS_SHOOT);
        this.loadImages(IMGS_POISON);
        this.loadImages(IMGS_SLEEP);
        this.loadImages(IMGS_MEELE);
        this.height = 200;
        this.width = 200;
        this.energie = energie;
        this.x = 200;
        this.y = 100;
        this.sinking();
        this.moveChar();
    }

    /**
     * Initializes the character movement and animation setup.
     */
    moveChar() {
        this.moving = false;
        this.setupMovement();
        this.setupAnimation();
        this.animateSwim();
    }

    /**
     * Sets up the movement interval for the character.
     */
    setupMovement() {
        const setMovementInterval = setInterval(() => {
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);
        addInterval(setMovementInterval);
    }

    /**
     * Handles the character movement based on keyboard input.
     */
    handleMovement() {
        if (!gameover) {
            this.moving = false;
            this.handleRightMovement();
            this.handleLeftMovement();
            this.handleUpMovement();
            this.handleDownMovement();
            if (this.moving || this.isShooting || this.isAttacking) {
                this.resetSleep();
            }
        }
    }

    /**
     * Handles the character movement to the right.
     */
    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.x += this.speed;
            this.otherDirection = false;
            this.moving = true;
        }
    }

    /**
     * Handles the character movement to the left.
     */
    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > -200) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.moving = true;
        }
    }

    /**
     * Handles the character movement upwards.
     */
    handleUpMovement() {
        if (this.world.keyboard.UP && this.y > -80) {
            this.y -= 7;
            this.moving = true;
        }
    }

    /**
     * Handles the character movement downwards.
     */
    handleDownMovement() {
        if (this.world.keyboard.DOWN && this.y < 300) {
            this.y += 7;
            this.moving = true;
        }
    }

    /**
     * Updates the camera position based on the character's position.
     */
    updateCamera() {
        this.world.cameraX = -this.x + 200;
    }

    /**
     * Sets up the animation interval for the character.
     */
    setupAnimation() {
        let animationIntervall = setInterval(() => {
            this.updateAnimation(animationIntervall);
        }, 100);
        addInterval(animationIntervall);
    }

    /**
     * Updates the animation based on the character's state.
     * @param {number} interval - The interval ID to clear if necessary.
     */
    updateAnimation(interval) {
        if (this.isDead()) {
            this.handleDeath(interval);
        } else if (this.isMoving()) {
            this.handleMoving();
        } else if (this.isIdle()) {
            this.handleIdle();
        } else if (this.isHurt()) {
            this.handleHurt();
        } else if (this.isShooting) {
            this.handleShooting();
        } else if (this.isAttacking) {
            this.handleAttacking();
        } else if (this.sleeping) {
            this.handleSleeping();
        }
    }

    /**
     * Handles the character's death animation and game over logic.
     * @param {number} interval - The interval ID to clear.
     */
    handleDeath(interval) {
        this.playAnimation(IMGS_DEAD);
        if (this.lastImg) {
            if (!gameover) {
                gameover = true;
                this.world.sound.gameOverSound.play();
                stopAllIntervals();
                gameStarted = false;
                this.x = 200;
                toggleGameOverScreen();
            }
            clearInterval(interval);
        }
        this.world.sound.deadSound.play();
    }

    /**
     * Handles the character's moving animation.
     */
    handleMoving() {
        if (!this.isHurt() && !this.isShooting && !this.isAttacking) {
            this.playAnimation(IMGS_SWIM);
        }
    }

    /**
     * Handles the character's idle animation and sleep timer.
     */
    handleIdle() {
        if (!this.isHurt()) {
            this.playAnimation(IMGS_IDLE);
            this.startSleepTimer();
        }
    }

    /**
     * Handles the character's hurt animation.
     */
    handleHurt() {
        this.handleHurtAnimation();
    }

    /**
     * Handles the character's shooting animation.
     */
    handleShooting() {
        this.playAnimation(IMGS_SHOOT);
    }

    /**
     * Handles the character's attacking animation.
     */
    handleAttacking() {
        this.playAnimation(IMGS_MEELE);
    }

    /**
     * Handles the character's sleeping animation.
     */
    handleSleeping() {
        if (this.lastImg || this.deepSleep) {
            this.deepSleep = true;
            this.playAnimation(IMGS_SLEEPDEEP);
        } else {
            this.playAnimation(IMGS_SLEEP);
        }
    }

    /**
     * Determines if the character is moving.
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    isMoving() {
        return this.moving && !this.isHurt() && !this.isShooting && !this.isAttacking;
    }

    /**
     * Determines if the character is idle.
     * @returns {boolean} True if the character is idle, false otherwise.
     */
    isIdle() {
        return !this.moving && !this.isShooting && !this.sleeping && !this.isAttacking;
    }

    /**
     * Handles the animation and sound when the character is hurt.
     */
    handleHurtAnimation() {
        if (this.hitby === "PufferFisch") {
            this.playAnimation(IMGS_POISON);
            this.world.sound.poisonedSound.play();
        } else {
            this.playAnimation(IMGS_SHOCKED);
            this.world.sound.shockedSound.play();
        }
    }

    /**
     * Starts a timer to put the character to sleep after a period of inactivity.
     */
    startSleepTimer() {
        if (!this.sleepTimerRunning && gameStarted) {
            this.sleepTimerRunning = true;
            this.sleepTimer = setTimeout(() => {
                this.sleeping = true;
                this.world.sound.snoringSound.play();
                this.world.sound.snoringSound.loop = true;
                this.sleepTimerRunning = false;
            }, 15000);
        }
    }

    /**
     * Resets the sleep state of the character and stops the snoring sound.
     */
    resetSleep() {
        this.sleeping = false;
        this.deepSleep = false;
        this.world.sound.snoringSound.pause();
        this.sleepTimerRunning = false;
        if (this.sleepTimer) {
            clearTimeout(this.sleepTimer);
            this.sleepTimer = null;
        }
    }

    /**
     * Simulates the character sinking when idle.
     */
    sinking() {
        const sinkingInterval = setInterval(() => {
            if (this.y < 300 && !this.moving) {
                this.y += 0.15;
            }
        }, 1000 / 60);
        addInterval(sinkingInterval);
    }

    /**
     * Plays the swimming sound when the character is moving.
     */
    animateSwim() {
        const swimInterval = setInterval(() => {
            if (this.moving) {
                this.world.sound.swimmingSound.play();
                this.world.sound.swimmingSound.playbackRate = 1.5;
            }
            this.moving = false;
        }, 1000 / 5);
        addInterval(swimInterval);
    }

    /**
     * Animates the character shooting and creates a bubble.
     */
    animateShooting() {
        this.imgNr = 0;
        this.isShooting = true;
        setTimeout(() => {
            this.isShooting = false;
            this.world.createBubble();
            this.world.sound.bubbleSound.play();
        }, 1000);
    }

    /**
     * Animates the character's melee attack and plays the attack sound.
     */
    animateMeeleAttack() {
        this.imgNr = 0;
        this.isAttacking = true;
        this.iframes = true;
        this.world.sound.meeleSound.play();
        setTimeout(() => {
            this.isAttacking = false;
            this.iframes = false;
        }, 1000);
    }
}
