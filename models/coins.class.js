class Coins extends DraweableObject {
  imgNr = 1;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  constructor(x, y) {
    super();
    this.loadImage(`img/4. Marcadores/1. Coins/1.png`);
    this.loadImages(IMGS_COIN);
    this.x = x
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.animateCoins();
  }

  /**
   * Animates the coin by cycling through its animation frames.
   * The animation is updated every 100 milliseconds.
   */
  animateCoins() {
    const animateCoinsInterval = setInterval(() => {
      this.playAnimation(IMGS_COIN);
    }, 100);

    addInterval(animateCoinsInterval);
  }

  /**
  * Plays a sound effect when the coin is collected.
  */
  collected() {
    this.world.sound.collectSound.play();
  }
}