class Poison extends DraweableObject{
    imgNr = 1;
    world;
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
        this.width = 250;
        this.height = 60;
      
    }

}