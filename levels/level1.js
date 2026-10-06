let level1;

function initLevel() {

    level1 = new Level(
        [
            new Chicken(400),
            new Chicken(1100),
            new Chicken(1700),
            new Chicken(2200)
        ],
        [
            new SmallChicken(800),
            new SmallChicken(1400),
            new SmallChicken(2000)
        ],
        [
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

            new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3)
        ],
        [
            new Bottle(500, 350),
            new Bottle(500, 100),
            new Bottle(1000, 350),
            new Bottle(1000, 100),
            new Bottle(1500, 350),
            new Bottle(1500, 100),
            new Bottle(2000, 350),
            new Bottle(2000, 100)
        ],
        [
            new Coin(300, 200),
            new Coin(300, 150),
            new Coin(750, 200),
            new Coin(750, 150),
            new Coin(1250, 200),
            new Coin(1250, 150),
        ]
    )
}