class JellyFish extends MovableObject {
    imgNr = 1;
    world;
    IMGS_WALKING=[
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png`,
        `img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png`
    ];
    constructor() {
        super();
        this.loadImage(`img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`);
        this.loadImages(this.IMGS_WALKING);  
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 200;
        this.speed = 0.15 + Math.random()*0.25;
        this.animate(); 
    }

    animate(){
        setInterval(() => {
           this.playAnimation(this.IMGS_WALKING) 
            
        }, 150);
        this.moveLeft();
   
    }
  

}