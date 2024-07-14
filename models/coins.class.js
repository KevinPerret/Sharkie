class Coins extends DraweableObject{
    imgNr = 1;

    offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
  }

IMGS_COINS=['img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/2.png',
    'img/4. Marcadores/1. Coins/3.png',
    'img/4. Marcadores/1. Coins/4.png'
]
    constructor(x,y){
        super();
        this.loadImage(`img/4. Marcadores/1. Coins/1.png`);
        this.loadImages(this.IMGS_COINS);
        this.x = x
        this.y = y;
        this.width = 50;
        this.height = 50;
      this.animateCoins();
    }

    animateCoins(){
        setInterval(() => {
      this.playAnimation(this.IMGS_COINS)
    },100)

    }
   collected(){
      this.world.sound.collectSound.play();
    
   }
}