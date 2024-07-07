class MovableObject extends DraweableObject {
 
  speed = 0.15;
 
  otherDirection = false;
  offsetY = 100;
  offsetX = 70;
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

  isHurt(){
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
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveDown() {
    setInterval(() => {
      this.y += this.speed;
    }, 1000 / 60);
  }

  moveUp() {
    setInterval(() => {
      this.y -= this.speed;
    }, 1000 / 60);
  }


  iscolliding(obj) {
    let thisX, thisY, thisWidth, thisHeight;
    if (this instanceof Character) {
      thisX = this.x + this.offsetX / 2;
      thisY = this.y + this.offsetY - 20;
      thisWidth = this.width - this.offsetX;
      thisHeight = this.height - this.offsetY;
    } else {
      thisX = this.x;
      thisY = this.y;
      thisWidth = this.width;
      thisHeight = this.height;
    }
    let objX = obj.x;
    let objY = obj.y;
    let objWidth = obj.width;
    let objHeight = obj.height;

    return (thisX + thisWidth) >= objX && thisX <= (objX + objWidth) &&
      (thisY + thisHeight) >= objY && thisY <= (objY + objHeight);
  }
}