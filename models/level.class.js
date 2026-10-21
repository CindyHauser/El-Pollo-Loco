class Level {
    enemies;
    smallEnemies;
    endboss;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2700;

    /**
     * Creates a level with the supplied enemies, scenery, and collectibles.
     * @param {MovableObject[]} enemies Regular enemies in the level.
     * @param {MovableObject[]} smallEnemies Small enemies in the level.
     * @param {Endboss[]} endboss End boss instances in the level.
     * @param {Cloud[]} clouds Clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects Background objects in the level.
     * @param {Bottle[]} bottles Bottles placed in the level.
     * @param {Coin[]} coins Coins placed in the level.
     */
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