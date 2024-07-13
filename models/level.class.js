class Level  {
    enemies;
    backgroundObjects;
    endboss;
    poison;
    coins;
    levelEndX = 5900;
    coinsPerLevel = 0;
    constructor(enemies, backgroundObjects,poison, coins) {
        this.enemies = enemies;
        this.poison = poison;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.coinsPerLevel = coins.length;
      
    }
}