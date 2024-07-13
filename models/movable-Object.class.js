class MovableObject extends DraweableObject {

  speed = 0.15;
  world;
  otherDirection = false;

  energie = 100;
  lastHit = 0;
  lastHitPoison = 0;
  hitby = "";
  poisonLevel = 0;
  coins = 0;

  constructor() {
    super();
  }

  hit(enemy) {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHit >= 1000 && !this.iframes && !enemy.hurt) {
      this.energie -= 20;
      if (this.energie < 0) {
        this.energie = 0;
      }
      this.hitby = enemy.constructor.name;
      this.lastHit = currentTime;
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit
    let timePassedPoison = new Date().getTime() - this.lastHitPoison;
    return timePassed < 1000 || timePassedPoison < 500;
  }

  isDead() {
    return this.energie == 0;
  }


  addPoison() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHitPoison >= 1000 && !this.iframes) {
      this.poisonLevel += 50;
      if (this.poisonLevel > 100) {
        this.energie -= 20;
        this.poisonLevel = 0;
        this.world.statusbarLife.setPercent(this.energie);
      }
      this.hitby = "PufferFisch";
      this.lastHitPoison = currentTime;
    }
  }


  addCoins() {
    this.coins += 1;
    this.world.statusbarCoins.setPercentCoin(this.coins / this.world.level.coinsPerLevel * 100);
  }

  moveRight() {

    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  iscolliding(obj, cameraOffset = 0) {
    let bubbleAdjustedX = this instanceof Bubbles ? this.x - cameraOffset : this.x;

    return bubbleAdjustedX + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      bubbleAdjustedX + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
  }
}

