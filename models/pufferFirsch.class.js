class PufferFisch extends MovableObject {
  world;
  imgNr = 1;
  movingLeft = true;
  startX; // To store the initial x position
  range = 300; // Define th
  dead = false;
  offset = {
    top: 0,
    bottom: 25,
    left: 0,
    right: 0
  }

  IMGS_IDLE = ['img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'];

  IMGS_DIE = [
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead3.png'
  ]

  constructor(x, y) {
    super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
    this.loadImages(this.IMGS_IDLE);
    this.loadImages(this.IMGS_DIE);
    this.x = x;
    this.y = y;
    this.startX = this.x;

    this.speed = 0.55 + Math.random() * 0.25;
    this.animate();
    this.changeLeftAndRight();
  }


  animate() {
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMGS_DIE);
      }
      else {
        this.playAnimation(this.IMGS_IDLE);
      }
    }, 150);

    this.moveLeft();

  }

  die() {
    this.deathAnimation();
  }

  deathAnimation() {
    this.dead = true;
    setInterval(() => {
      this.x -= 10;
      this.y -= 10;
      if (this.y <= 0) {
        level1.enemies = level1.enemies.filter(enemy => enemy !== this);
      }
    }, 100);
  }

  changeLeftAndRight() {
    setInterval(() => {
      if (this.movingLeft) {
        this.moveLeft();
        this.otherDirection = false;
        if (this.x <= this.startX) {
          this.movingLeft = false;
        }
      } else {
        this.moveRight();
        this.otherDirection = true;
        if (this.x >= this.startX + this.range) {
          this.movingLeft = true;
        }
      }
    }, 1000 / 60);
  }
}
