class MovableObject {
  x = 120;
  y = 400;
  width = 100;
  height = 100;
  speed = 0.15;
  img;
  imgCache = {};
  otherDirection = false;
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

playAnimation(IMGS){
  let i = this.imgNr % IMGS.length;
  let path = IMGS[i];
  this.img = this.imgCache[path];
  this.imgNr++;
}

  moveRight() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}