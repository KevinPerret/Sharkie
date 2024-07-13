class Poison extends DraweableObject{
    imgNr = 1;
    world;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    
IMGS_POISONBOTTLE=[
    'img/4. Marcadores/Posion/Animada/1.png',
    'img/4. Marcadores/Posion/Animada/2.png',
    'img/4. Marcadores/Posion/Animada/3.png',
    'img/4. Marcadores/Posion/Animada/4.png',
    'img/4. Marcadores/Posion/Animada/5.png',
    'img/4. Marcadores/Posion/Animada/6.png',
    'img/4. Marcadores/Posion/Animada/7.png',
    'img/4. Marcadores/Posion/Animada/8.png'
]
    constructor(x,y){
        super();
        this.loadImage(`img/4. Marcadores/Posion/Animada/1.png`);
        this.loadImages(this.IMGS_POISONBOTTLE);
        this.x = x
        this.y = y;
        this.width = 50;
        this.height = 50;
      this.animateBottle();
    }

    animateBottle(){
        setInterval(() => {
      this.playAnimation(this.IMGS_POISONBOTTLE)
    },100)

    }

}