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

  constructor(x, y) {
    super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
    this.loadImages(IMGS_IDLE_PUFFER);
    this.loadImages(IMGS_DIE);
    this.x = x;
    this.y = y;
    this.startX = this.x;
    this.speed = 0.55 + Math.random() * 0.25;
    this.animate();
    this.changeLeftAndRight();
  }

  /**
   * Animates the puffer character by cycling through idle and death animations.
   * The animation is updated every 150 milliseconds.
   * The character starts moving left immediately upon activation.
   */
  animate() {
    const animatePufferInterval = setInterval(() => {
      if (!isPaused) {
        if (this.dead) {
          this.playAnimation(IMGS_DIE);
        } else {
          this.playAnimation(IMGS_IDLE_PUFFER);
        }
      }
    }, 150);

    addInterval(animatePufferInterval);
    this.moveLeft();
  }

  /**
  * Marks the puffer character as dead and triggers the death animation.
  */
  die() {
    this.deathAnimation();
  }

  /**
  * Handles the death animation of the puffer character.
  * The character moves diagonally up-left and plays a death sound.
  * Removes the character from the level's enemies list when it reaches the top.
  */
  deathAnimation() {
    this.dead = true;
    const animatePufferDeadInterval = setInterval(() => {
      this.x -= 7;
      this.y -= 7;
      this.playDeadSound();
      if (this.y <= 0) {
        level1.enemies = level1.enemies.filter(enemy => enemy !== this);
      }
    }, 100);
    addInterval(animatePufferDeadInterval);
  }

  /**
  * Plays the sound effect for the puffer character's death.
  * The sound is played only once.
  */
  playDeadSound() {
    if (!this.soundPlayed) {
      this.world.sound.pufferHurtSound.play();
      this.soundPlayed = true;
    }
  }

  /**
  * Controls the puffer character's horizontal movement, switching between left and right.
  * Movement is updated every 1/60th of a second.
  */
  changeLeftAndRight() {
    const leftRightInterval = setInterval(() => {
      if (this.movingLeft) {
        this.changeLeft();
      } else {
        this.changeRight();
      }
    }, 1000 / 60);
    addInterval(leftRightInterval);
  }

  /**
  * Moves the puffer character to the left and switches direction when reaching the start position.
  */
  changeLeft() {
    this.moveLeft();
    this.otherDirection = false;
    if (this.x <= this.startX) {
      this.movingLeft = false;
    }
  }

  /**
  * Moves the puffer character to the right and switches direction when reaching the end position.
  */
  changeRight() {
    this.moveRight();
    this.otherDirection = true;
    if (this.x >= this.startX + this.range) {
      this.movingLeft = true;
    }
  }
}
