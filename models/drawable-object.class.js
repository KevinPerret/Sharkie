class DraweableObject {
  img;
  imgCache = {};
  x = 120;
  y = 400;
  width = 100;
  height = 100;
  lastImg = false;

  /**
   * Loads an image from the specified path and sets it as the current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
  * Loads multiple images from an array of paths and caches them.
  * @param {string[]} arr - An array of image paths to load and cache.
  */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**
  * Draws the current image onto the given canvas context.
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
  */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
  * Plays an animation by cycling through an array of image paths.
  * Updates the current image and tracks whether the last image in the array has been reached.
  * @param {string[]} IMGS - An array of image paths representing the animation frames.
  */
  playAnimation(IMGS) {
    let i = this.imgNr % IMGS.length;
    let path = IMGS[i];
    this.img = this.imgCache[path];
    this.imgNr++;
    this.lastImg = (i === IMGS.length - 1);
  }

  /**
  * Draws the current image on the canvas context with horizontal mirroring.
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
  */
  drawMirrored(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
    ctx.restore();
  }
}