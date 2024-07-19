class Poison extends DraweableObject {
    imgNr = 1;
    world;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }


    constructor(x, y) {
        super();
        this.loadImage(`img/4. Marcadores/Posion/Animada/1.png`);
        this.loadImages(IMGS_POISONBOTTLE);
        this.x = x
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.animateBottle();
    }

    /**
     * animate the Poison bottle
     */
    animateBottle() {
        const animateBottleInterval = setInterval(() => {
            this.playAnimation(IMGS_POISONBOTTLE)
        }, 100)
        addInterval(animateBottleInterval);
    }

}