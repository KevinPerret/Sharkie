class PufferFisch extends MovableObject{
    world;
    imgNr = 1;
    IMGS_IDLE = ['img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'];

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.loadImages(this.IMGS_IDLE);
        this.x = 200 + Math.random()*500;
        this.y = 100 + Math.random()*200;
        this.speed = 0.15 + Math.random()*0.25;
        this.animate();
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMGS_IDLE);
            
        }, 150);

        this.moveLeft();
   
    }
}