class Level {
    enemies;
    smallEnemies;
    endboss;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2160;

    constructor(enemies, smallEnemies, endboss, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}