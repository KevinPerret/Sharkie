class Level  {
    enemies;
    backgroundObjects;
    endboss;
    levelEndX = 1440;
    constructor(enemies, backgroundObjects, endboss) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
    }
}