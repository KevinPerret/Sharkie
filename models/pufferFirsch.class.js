class PufferFisch extends MovableObject {
    world;
    imgNr = 1;
    movingLeft = true;
    startX; // To store the initial x position
    range = 300; // Define th
    IMGS_IDLE = ['img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'];

    constructor(x, y) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.loadImages(this.IMGS_IDLE);
        this.x = x;
        this.y = y;
        this.startX =this.x;
        
        this.speed = 0.55 + Math.random() * 0.25;
        this.animate();
        this.changeLeftAndRight();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMGS_IDLE);

        }, 150);

        this.moveLeft();

    }

  changeLeftAndRight() {
    setInterval(() => {
      if (this.movingLeft) {
        this.moveLeft();
        this.otherDirection = false; // Indicate moving left for animation
        if (this.x <= this.startX) { // Change direction at the start x position
          this.movingLeft = false;
        }
      } else {
        this.moveRight();
        this.otherDirection = true; // Indicate moving right for animation
        if (this.x >= this.startX + this.range) { // Change direction at start x + range
          this.movingLeft = true;
        }
      }
    }, 1000 / 60); // Run the movement logic at 60 FPS
  }
}