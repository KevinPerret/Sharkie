class DraweableObject {
  img;
  imgCache = {};
  x = 120;
  y = 400;
  width = 100;
  height = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawRect(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof PufferFisch || this instanceof JellyFish) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      if (this instanceof Character) {
        ctx.rect(this.x + 35, this.y +100, this.width -60, this.height - 140);

      } else if (this instanceof PufferFisch) {
        ctx.rect(this.x, this.y, this.width, this.height - 25);
      }
      else if (this instanceof Endboss) {
        ctx.rect(this.x, this.y + 170, this.width, this.height - 240);
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
      ctx.stroke();
    }
  }

  drawMirrored(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
  
      ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
    
    ctx.restore();

  }

  drawRectMirrored(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    if (this instanceof Character) {
      ctx.rect(this.x + 35, this.y + 100, this.width - 60, this.height - 140);
    }else  if (this instanceof PufferFisch) {
      ctx.rect(this.x, this.y, this.width, this.height - 25);
    } else {
      ctx.rect(this.x, this.y, this.width, this.height);
    }
    ctx.stroke();
  }



}