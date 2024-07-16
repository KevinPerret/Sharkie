class Bubbles extends MovableObject {
    world;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
  

    constructor(x, y, otherDirection) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.height = 50;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.speed = -20;
        this.shootBubble();
    }

    shootBubble() {
       const shootBubbleInterval = setInterval(() => {
            if (this.otherDirection == true) {
                this.y += this.speed / 2;
                this.x += this.speed;
            } else {
                this.y += this.speed / 2;
                this.x -= this.speed;
            }
        }, 50);
        addInterval(shootBubbleInterval);
    }
   
    
}

