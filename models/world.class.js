class World {
    character = new Character();
    level = level1;
    statusbarLife = new StatusBarLife();
    statusbarCoins = new StatusBarCoin();
    statusbarPoison = new StatusBarPoison();
    bubble = [];
    ctx;
    canvas;
    keyboard;
    cameraX = 0;
    backgroundSound = new Audio('audio/deepSeaBackground.mp3');


    constructor(canvas, keyboard, backgroundSound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.backgroundSound = backgroundSound;


    }


    run() {
        setInterval(() => {
            this.checkBubbles();
            this.checkCollision();
        }, 100);
    }

    checkBubbles() {
        if (this.keyboard.SPACE && !this.character.isShooting) {
            this, this.character.animateShooting();
        }
    }

    createBubble() {
        let xoffset = this.character.otherDirection ? -40 : 150;
        let bubble = new Bubbles(this.character.x + xoffset + this.cameraX, this.character.y + 100, this.character.otherDirection);
        this.bubble.push(bubble);
        this.coins--;
    }
    checkCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.iscolliding(enemy)) {
                if (enemy instanceof PufferFisch) {
                    this.character.addPoison();
                    this.character.hit(enemy);
                    this.statusbarLife.setPercent(this.character.energie);
                    this.statusbarPoison.setPercentPoison(this.character.poisonLevel);
                } else {
                    this.character.hit(enemy);
                    this.statusbarLife.setPercent(this.character.energie);
                }
            }
        });
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {
            e.world = this;
        })
        this.backgroundSound.play();
        this.backgroundSound.volume = 0.5;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbarLife);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarPoison);
        this.addObjectToMap(this.bubble);
        requestAnimationFrame(() => this.draw());
    }


    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            mo.drawMirrored(this.ctx);
            mo.drawRectMirrored(this.ctx);
        } else {
            mo.draw(this.ctx);
            mo.drawRect(this.ctx);
        }
    }
}