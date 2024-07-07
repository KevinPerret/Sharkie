class Bubbles extends MovableObject{

    constructor(x,y){
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.height = 50;
        this.width = 50;
        this.x = x;
        this.y = y;
      this.shootBubble();
    }

    shootBubble(){
    
       this.speed= -2;
       setInterval(() => {
           this.y += this.speed/2;
           this.x -= this.speed;
       }, 1000/60);
    }
}