class PufferFisch extends MovableObject {
  world;
  imgNr = 1;
  movingLeft = true;
  startX;
  range = 300;
  soundPlayed = false;
  dead = false;
  offset = {
    top: 10,
    bottom: 25,
    left: 15,
    right: 15
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
    const animatePufferInterval = setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMGS_DIE);
      }
      else {
        this.playAnimation(this.IMGS_IDLE);
      }
    }, 150);
    addInterval(animatePufferInterval);
    this.moveLeft();

  }

  die() {
    this.deathAnimation();
  }

  deathAnimation() {
    this.dead = true;
    const animatePufferDeadInterval = setInterval(() => {
      this.x -= 7;
      this.y -= 7;
      if (!this.soundPlayed) {
        this.world.sound.pufferHurtSound.play();
        this.soundPlayed = true;
      }
      if (this.y <= 0) {
        level1.enemies = level1.enemies.filter(enemy => enemy !== this);
      }
    }, 100);
    addInterval(animatePufferDeadInterval);
  }

  changeLeftAndRight() {
    const leftRightInterval = setInterval(() => {
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
    addInterval(leftRightInterval);
  }
}
