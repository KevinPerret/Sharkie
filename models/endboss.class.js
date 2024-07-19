class Endboss extends MovableObject {
    world;
    hurt = false;
    imgNr = 1;
    health = 50;
    isDead = false;
    offset = {
        top: 200,
        bottom: 80,
        left: 40,
        right: 40
    }
    lastAttackTime = 0;
    attackCooldown = 5000; // 3 Sekunden
    isAttacking = false;
    allowAtack = false;

    constructor() {
        super();
        this.loadImage(`img/2.Enemy/3 Final Enemy/1.Introduce/1.png`);
        this.loadImages(IMGS_INTRODUCE);
        this.loadImages(IMGS_FLOATING);
        this.loadImages(IMGS_HURT);
        this.loadImages(IMGS_BOSSDEAD);
        this.loadImages(IMGS_ATTACK);
        this.height = 380;
        this.width = 380;
        this.x = 5200;
        this.y = 0;
        this.speed = 8;
        this.animate();
        this.originalSpeed = this.speed;
        this.invulnerable = false;
        this.invulnerabilityDuration = 2000;
    }

    /**
     * Animates the boss character by handling different states and animations.
     */
    animate() {
        const animateBoss = setInterval(() => {
            if (gameStarted && !isPaused) {
                if (this.world.character.x >= 4800 && !firstContact) {
                    this.playIntroduce();
                } else if (firstContact && !this.hurt && !this.isDead) {
                    this.animateAttack();
                } else if (this.hurt && !this.isDead) {
                    this.playAnimation(IMGS_HURT);
                } else if (this.isDead) {
                    this.animateDead(animateBoss);
                }
            }
        }, 1000 / 10);
        addInterval(animateBoss);
    }

    /**
     * Plays the introduction animation and sets up attack delay after first contact.
     */
    playIntroduce() {
        this.playAnimation(IMGS_INTRODUCE);
        if (this.lastImg) {
            this.delayAttack();
        }
    }

    /**
     * Sets a delay before allowing the boss to attack.
     */
    delayAttack() {
        firstContact = true;
        setTimeout(() => {
            this.allowAtack = true;
        }, 2000);
    }

    /**
     * Handles the attack animation and movement of the boss.
     */
    animateAttack() {
        if (this.isAttacking) {
            this.playAnimation(IMGS_ATTACK);
            if (this.lastImg) {
                this.isAttacking = false;
                this.speed = this.originalSpeed;
            }
        } else {
            this.playAnimation(IMGS_FLOATING);
            this.moveToCharacter();
        }
    }

    /**
     * Handles the death animation and triggers the win screen.
     * @param {number} animateBoss - The interval ID for animation.
     */
    animateDead(animateBoss) {
        this.playAnimation(IMGS_BOSSDEAD);
        if (this.lastImg) {
            clearInterval(animateBoss);
            this.winScreen();
        }
    }

    /**
    * Moves the boss towards the character and attempts to attack if close enough.
    */
    moveToCharacter() {
        let character = this.world.character;
        if (!this.isAttacking) {
            this.moveHorizontallyTowards(character);
            this.moveVerticallyTowards(character);
        }
        if (this.isCloseTo(character) && this.allowAtack) {
            this.tryAttack(character);
        }
    }

    /**
     * Moves the boss horizontally towards the character.
     * @param {Object} character - The character object to move towards.
     */
    moveHorizontallyTowards(character) {
        if (this.x < character.x - character.width) {
            this.moveRight();
            this.otherDirection = true;
        } else if (this.x > character.x) {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Moves the boss vertically towards the character.
     * @param {Object} character - The character object to move towards.
     */
    moveVerticallyTowards(character) {
        if (this.y < character.y - character.height) {
            this.moveDown();
        } else if (this.y > character.y - character.height && this.y > -120) {
            this.moveUp();
        }
    }

    /**
     * Checks if the boss is close enough to the character to attack.
     * @param {Object} character - The character object to check proximity with.
     * @returns {boolean} True if the boss is close enough to the character, otherwise false.
     */
    isCloseTo(character) {
        let distanceX;
        if (!this.otherDirection) {
            distanceX = Math.abs(this.x - character.x);
        } else distanceX = Math.abs(this.x + 200 - character.x);
        return distanceX < 350;
    }

    /**
     * Attempts to perform an attack if the cooldown period has passed.
     */
    tryAttack() {
        const currentTime = new Date().getTime();

        if (currentTime - this.lastAttackTime >= this.attackCooldown && !this.isAttacking && !this.hurt) {
            this.lastAttackTime = currentTime;
            this.isAttacking = true;
            this.attack();
        }
    }

    /**
     * Initiates the attack sequence for the character.
     */
    attack() {
        this.speed = 10;
        this.startAttackInterval();
        this.endAttackAfterDelay(700);
    }

    /**
     * Starts the interval for the attack movement.
     */
    startAttackInterval() {
        let attackInterval = setInterval(() => {
            this.performAttackMovement();
            this.moveToCharacter();
        }, 1000 / 60);
        this.attackInterval = attackInterval;
    }

    /**
     * Performs the attack movement based on the direction.
     */
    performAttackMovement() {
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        this.playAttackSound();
    }

    /**
     * Plays the attack sound.
     */
    playAttackSound() {
        this.world.sound.bossAttackSound.play();
    }

    /**
     * Ends the attack sequence after a specified delay.
     * @param {number} delay - The delay in milliseconds.
     */
    endAttackAfterDelay(delay) {
        setTimeout(() => {
            this.stopAttack();
        }, delay);
    }

    /**
     * Stops the attack and resets the character's state.
     */
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
        this.speed = this.originalSpeed;
    }
    /**
    * Handles the event when the character is hit by the player.
    */
    hitByPlayer() {
        if (this.invulnerable) {
            return;
        }
        this.applyDamage(10);
        this.playHurtSound();
        this.setInvulnerability(true);
        this.resetHurtStateAfterDelay(1000);
        this.removeInvulnerabilityAfterDelay(this.invulnerabilityDuration);
        this.checkDeath();
    }

    /**
     * Applies damage to the character.
     * @param {number} damage - The amount of damage to apply.
     */
    applyDamage(damage) {
        this.health -= damage;
        this.hurt = true;
    }

    /**
     * Plays the hurt sound for the character.
     */
    playHurtSound() {
        this.world.sound.bossHurtSound.play();
    }

    /**
     * Sets the invulnerability state of the character.
     * @param {boolean} state - The invulnerability state to set.
     */
    setInvulnerability(state) {
        this.invulnerable = state;
    }

    /**
     * Resets the hurt state of the character after a delay.
     * @param {number} delay - The delay in milliseconds.
     */
    resetHurtStateAfterDelay(delay) {
        setTimeout(() => {
            this.hurt = false;
        }, delay);
    }

    /**
     * Removes the invulnerability state of the character after a delay.
     * @param {number} delay - The delay in milliseconds.
     */
    removeInvulnerabilityAfterDelay(delay) {
        setTimeout(() => {
            this.invulnerable = false;
        }, delay);
    }

    /**
     * Checks if the character's health is zero or below and handles death.
     */
    checkDeath() {
        if (this.health <= 0) {
            this.handleDeath();
        }
    }

    /**
     * Handles the death of the character.
     */
    handleDeath() {
        this.isDead = true;
        this.world.sound.bossDeadSound.play();
    }

    /**
     * Show the Winscreen and stop all intervals
     */
    winScreen() {
        setTimeout(() => {
            win = true;
            this.world.sound.winSound.play();
            stopAllIntervals();
            toggleGameOverScreen(win);
        }, 1000);
    }
}
