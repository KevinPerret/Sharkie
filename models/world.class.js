class World {
    character = new Character(100);
    statusbarLife = new StatusBarLife(10, 0);
    statusbarBoss = new StatusBarLife(560, 20);
    statusbarCoins = new StatusBarCoin();
    statusbarPoison = new StatusBarPoison();
    bubble = new Bubbles(0, -100, false);

    level = level1;
    ctx;
    canvas;
    keyboard;
    cameraX = 0;
    remainingCoins = this.level.coinsPerLevel;

    constructor(canvas, keyboard, sound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound = sound;
        this.gameLoop();
        this.setWorld();

    }

    /**
    * Main game loop that repeatedly updates and draws the world.
    */
    gameLoop() {
        if (!isPaused) {
            this.run();
            this.draw();
        }
        requestAnimationFrame(() => this.gameLoop());;
    }

    /**
     * Updates the game state including checking collisions and shooting.
     */
    run() {
        this.checkCollision();
        this.checkShooting();
        this.checkMeele();
    }

    /**
     * Sets up world references for character, enemies, poison, and coins.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => e.world = this);
        this.level.poison.forEach(p => p.world = this);
        this.level.coins.forEach(c => c.world = this);
    }

    /**
     * Checks if the character is shooting and handles shooting.
     */
    checkShooting() {
        if (this.keyboard.SPACE && !this.character.isShooting && this.character.coins > 0)
            this, this.character.animateShooting();
    }

    /**
     * Checks if the character is performing a melee attack.
     */
    checkMeele() {
        if (this.keyboard.D && !this.character.isAttacking && !this.character.isHurt())
            this, this.character.animateMeeleAttack();
    }

    /**
     * Creates a bubble and updates the character's coin count and status bar.
     */
    createBubble() {
        let xoffset = this.character.otherDirection ? -40 : 150;
        let bubbleX = this.character.x + xoffset + this.cameraX;
        let bubbleY = this.character.y + 100;
        let bubble = new Bubbles(bubbleX, bubbleY, this.character.otherDirection);
        this.bubble = bubble;
        this.character.coins -= 1;
        this.remainingCoins = this.remainingCoins - 1;
        this.statusbarCoins.setPercentCoin(this.character.coins / this.level.coinsPerLevel * 100);
    }

    /**
    * Checks for collisions with coins, enemies, poison, and bubble.
    */
    checkCollision() {
        this.collisionCoin();
        this.collisionEnemy();
        this.collissionPoison();
        this.collisionBubble();
    }

    /**
    * Handles collisions between the character and coins.
    */
    collisionCoin() {
        this.character.coins = this.remainingCoins - this.level.coins.length;
        this.statusbarCoins.setPercentCoin(this.character.coins / this.level.coinsPerLevel * 100);
        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.iscolliding(coin)) {
                coin.collected();
                return false;
            }
            return true;
        });
    }

    /**
    * Handles collisions between the bubble and enemies.
    */
    collisionBubble() {
        if (this.bubble) {
            let cameraOffset = this.cameraX;
            this.level.enemies.forEach(enemy => {
                if (this.bubble.iscolliding(enemy, cameraOffset))
                    this.handleCollisionWithEnemy(enemy);
            });
        }
    }

    /**
     * Handles the collision of the bubble with a specific enemy.
     * @param {MovableObject} enemy - The enemy involved in the collision.
     */
    handleCollisionWithEnemy(enemy) {
        if (enemy instanceof JellyFish) {
            this.handleCollisionWithJellyFish(enemy);
        } else if (enemy instanceof PufferFisch) {
            this.handleCollisionWithPufferFisch();
        } else if (enemy instanceof Endboss) {
            this.handleCollisionWithEndboss(enemy);
        }
    }

    /**
     * Handles the collision of the bubble with a JellyFish.
     * @param {JellyFish} jellyFish - The JellyFish involved in the collision.
     */
    handleCollisionWithJellyFish(jellyFish) {
        this.bubble.y = -100; // Move bubble off-screen
        jellyFish.bubbleDeath(); // Trigger JellyFish-specific behavior
    }

    /**
     * Handles the collision of the bubble with a PufferFisch.
     */
    handleCollisionWithPufferFisch() {
        this.bubble.y = -100; // Move bubble off-screen
    }

    /**
     * Handles the collision of the bubble with the Endboss.
     * @param {Endboss} endboss - The Endboss involved in the collision.
     */
    handleCollisionWithEndboss(endboss) {
        this.bubble.y = -100; // Move bubble off-screen
        if (!endboss.hurt) {
            endboss.hitByPlayer(); // Apply damage to the Endboss
            this.statusbarBoss.setPercentBoss(endboss.health); // Update the boss's health status
        }
    }

    /**
    * Handles collisions between the character and enemies.
    */
    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.iscolliding(enemy)) {
                if (enemy instanceof PufferFisch) {
                    this.handlePufferFischCollision(enemy);
                } else if (enemy instanceof Endboss) {
                    this.handleEndbossCollision(enemy);
                } else {
                    this.handleRegularEnemyCollision(enemy);
                }
            }
        });
    }

    /**
    * Handles the collision of the character with a regular enemy.
    * @param {MovableObject} enemy - The regular enemy involved in the collision.
    */
    handleRegularEnemyCollision(enemy) {
        this.character.hit(enemy);
        this.statusbarLife.setPercent(this.character.energie);
    }

    /**
     * Handles the collision of the character with the Endboss.
     * @param {Endboss} enemy - The Endboss involved in the collision.
     */
    handleEndbossCollision(enemy) {
        if (this.character.isAttacking && !enemy.hurt) {
            enemy.hitByPlayer();
            this.statusbarBoss.setPercentBoss(enemy.health);
        }
        this.character.hit(enemy);
        this.statusbarLife.setPercent(this.character.energie);
    }

    /**
     * Handles the collision of the character with a PufferFisch.
     * @param {PufferFisch} enemy - The PufferFisch involved in the collision.
     */
    handlePufferFischCollision(enemy) {
        if (this.character.isAttacking) {
            enemy.die();
        }
        this.character.addPoison();
        this.character.hit(enemy);
        this.statusbarLife.setPercent(this.character.energie);
        this.statusbarPoison.setPercentPoison(this.character.poisonLevel);
    }

    /**
    * Handles collisions between the character and poison objects.
    */
    collissionPoison() {
        this.level.poison.forEach(poison => {
            if (this.character.iscolliding(poison)) {
                this.character.addPoison();
                this.statusbarPoison.setPercentPoison(this.character.poisonLevel);
            }
        });
    }

    /**
     * Draws all game objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.poison);
        this.addObjectToMap(this.level.coins);
        this.ctx.translate(-this.cameraX, 0);
        this.drawSingleItem();
    }

    /**
     * Draws individual game items such as status bars and the bubble.
     */
    drawSingleItem() {
        this.addToMap(this.statusbarLife);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarPoison);
        if (firstContact) {
            this.addToMap(this.statusbarBoss);
        }
        this.addToMap(this.bubble);
    }

    /**
    * Adds multiple objects to the canvas map.
    * @param {Array} objects - The objects to be added to the map.
    */
    addObjectToMap(object) {
        object.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the canvas map and draws it.
     * @param {MovableObject} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                mo.drawMirrored(this.ctx);
            } else {
                mo.draw(this.ctx);
            }
        }
    }
}