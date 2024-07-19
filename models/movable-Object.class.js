/**
 * Represents an object that can move within the game world.
 * Extends from `DraweableObject`.
 */
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

  /**
   * Applies damage to the object if it has been hit by an enemy.
   * @param {MovableObject} enemy - The enemy that caused the hit.
   */
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

  /**
 * Checks if the object is currently hurt.
 * @returns {boolean} True if the object is hurt, false otherwise.
 */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit
    let timePassedPoison = new Date().getTime() - this.lastHitPoison;
    return timePassed < 1000 || timePassedPoison < 500;
  }

  /**
  * Checks if the object is dead.
  * @returns {boolean} True if the object's energy is zero, false otherwise.
  */
  isDead() {
    return this.energie == 0;
  }

  /**
    * Applies poison effect to the object, increasing the poison level and checking if it needs to be reduced.
    */
  addPoison() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHitPoison >= 1000 && !this.iframes) {
      this.poisonLevel += 60;
      this.poisonFull();
      this.hitby = "PufferFisch";
      this.lastHitPoison = currentTime;
    }
  }

  /**
   * Checks if the poison level has reached its maximum and applies damage if so.
   */
  poisonFull() {
    if (this.poisonLevel > 100) {
      this.energie -= 20;
      this.poisonLevel = 0;
      this.world.statusbarLife.setPercent(this.energie);
    }
  }

  /**
   * Increases the number of collected coins and updates the coin status bar.
   */
  addCoins() {
    this.coins += 1;
    this.world.statusbarCoins.setPercentCoin(this.coins / this.world.level.coinsPerLevel * 100);
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }
  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }
  /**
   * Moves the object down.
   */
  moveDown() {
    this.y += this.speed;
  }
  /**
   * Moves the object to up.
   */
  moveUp() {
    this.y -= this.speed;
  }
  /**
   * Checks for collision between this object and another object.
   * @param {MovableObject} obj - The object to check for collision with.
   * @param {number} [cameraOffset=0] - The offset applied if this object is a bubble.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  iscolliding(obj, cameraOffset = 0) {
    let bubbleAdjustedX = this instanceof Bubbles ? this.x - cameraOffset : this.x;
    return bubbleAdjustedX + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      bubbleAdjustedX + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
  }
}

