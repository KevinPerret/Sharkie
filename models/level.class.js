class Level  {
    enemies;
    backgroundObjects;
    endboss;
    poison;
    levelEndX = 4500;
    constructor(enemies, backgroundObjects,poison) {
        this.enemies = enemies;
        this.poison = poison;
        this.backgroundObjects = backgroundObjects;
      
    }
}