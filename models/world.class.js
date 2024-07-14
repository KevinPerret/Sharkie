class World {
    character = new Character();
 
    statusbarLife = new StatusBarLife();
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
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        this.checkCollision();
        this.checkShooting();
        this.checkMeele();
        requestAnimationFrame(() => this.run());
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {
            e.world = this;
        })
        this.level.poison.forEach(p => {
            p.world = this;
        })
        this.level.coins.forEach(c => {
            c.world = this;
        })
    }

    checkShooting() {
        if (this.keyboard.SPACE && !this.character.isShooting && this.character.coins > 0) {

            this, this.character.animateShooting();
        }
    }

    checkMeele() {
        if (this.keyboard.D && !this.character.isAttacking && !this.character.isHurt()) {
            this, this.character.animateMeeleAttack();
        }
    }

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

    checkCollision() {
        this.collisionCoin();
        this.collisionEnemy();
        this.collissionPoison();
        this.collisionBubble();
    }

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
    collisionBubble() {
        if (this.bubble) {
            let cameraOffset = this.cameraX;
            this.level.enemies.forEach(enemy => {
                if (this.bubble.iscolliding(enemy, cameraOffset)) {
                    if (enemy instanceof JellyFish) {
                        this.bubble.y = -100;
                        enemy.bubbleDeath();
                    } else if (enemy instanceof PufferFisch) {
                        this.bubble.y = -100;
                    } else if (enemy instanceof Endboss) {
                        this.bubble.y = -100;
                        if (!enemy.hurt) {
                            enemy.hitByPlayer();
                        }
                    }

                }
            })

                ;
        } else {
            console.log("Bubble is not defined.");
        }
    }

    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.iscolliding(enemy)) {
                if (enemy instanceof PufferFisch) {
                    if (this.character.isAttacking) {
                        enemy.die();
                    }
                    this.character.addPoison();
                    this.character.hit(enemy);
                    this.statusbarLife.setPercent(this.character.energie);
                    this.statusbarPoison.setPercentPoison(this.character.poisonLevel);
                } else if (enemy instanceof Endboss) {
                    if (this.character.isAttacking && !enemy.hurt) {
                        enemy.hitByPlayer();
                    }
                    this.character.hit(enemy);
                    this.statusbarLife.setPercent(this.character.energie);
                } else {
                    this.character.hit(enemy);
                    this.statusbarLife.setPercent(this.character.energie);
                }
            }
        });
    }

    collissionPoison() {
        this.level.poison.forEach(poison => {
            if (this.character.iscolliding(poison)) {
                this.character.addPoison();
                this.statusbarPoison.setPercentPoison(this.character.poisonLevel);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);

        this.addObjectToMap(this.level.poison);
        this.addObjectToMap(this.level.coins);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbarLife);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarPoison);
        this.addToMap(this.bubble);


        requestAnimationFrame(() => this.draw());
    }


    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                mo.drawMirrored(this.ctx);
                mo.drawRectMirrored(this.ctx);
            } else {
                mo.draw(this.ctx);
                mo.drawRect(this.ctx);
            }
        }
    }
}