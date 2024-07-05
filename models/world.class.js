class World {
    character = new Character();
    level = level1;
   
    ctx;
    canvas;
    keyboard;
    cameraX = -0;
    backgroundSound = new Audio('audio/deepSeaBackground.mp3');
    

    constructor(canvas, keyboard, backgroundSound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.backgroundSound = backgroundSound;
   
      
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


        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
            this.ctx.restore();
        } else {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}