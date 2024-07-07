class MovableObject extends DraweableObject {

  speed = 0.15;

  otherDirection = false;

  energie = 100;
  lastHit = 0;




  hit() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHit >= 1000) { // 1000 Millisekunden = 1 Sekunde
      this.energie -= 20;
      if (this.energie < 0) {
        this.energie = 0;
      }
      this.lastHit = currentTime; // Aktualisiere den Zeitstempel des letzten Treffers
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 1000;
  }

  isDead() {
    return this.energie == 0;
  }



  playAnimation(IMGS) {
    let i = this.imgNr % IMGS.length;
    let path = IMGS[i];
    this.img = this.imgCache[path];
    this.imgNr++;
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


  iscolliding(obj) {
   return this.x + this.width - this.offset.right > obj.x +obj.offset.left &&
      this.y + this.height -this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width-obj.offset.right &&
      this.y+ this.offset.top < obj.y + obj.height -obj.offset.bottom;
  }
}