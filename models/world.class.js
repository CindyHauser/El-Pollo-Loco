class World {
    character = new Character();
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    endbossHealthbarVisible = false;
    throwableObjects = [];
    coinsAmount = 0;
    bottlesAmount = 0;
    lastBottleThrowTime = 0;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    /**
     * Initializes the game world and starts its rendering and update loops.
     * @param {HTMLCanvasElement} canvas Canvas used to render the game.
     * @param {Keyboard} keyboard Keyboard state used to control the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.gameOver = new GameOver(this);
        this.run();
    }

    /**
     * Starts the recurring game-state checks and collision handling.
     */
    run() {
        setStoppableInterval(() => {
            this.checkBottleHitsChicken(this.level.enemies);
            this.checkBottleHitsChicken(this.level.smallEnemies);
            this.checkBottleHitsEndboss(this.level.endboss);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.enemies);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.smallEnemies);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.endboss);
            this.removeDeadAndUsedObjects();
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkIfEndbossIsAlert();
            this.gameOver.checkGameOver();
        }, 200);
    }

    /**
     * Assigns this world to the character so it can access the world state.
     */
    setWorld() {
        this.character.world = this;
        this.level.endboss[0].world = this;
    }

    /**
     * Removes dead enemies and used throwable objects from their level collections.
     */
    removeDeadAndUsedObjects() {
        this.level.enemies = this.level.enemies.filter((e) => !e.remove);
        this.level.smallEnemies = this.level.smallEnemies.filter((e) => !e.remove);
        this.throwableObjects = this.throwableObjects.filter((b) => !b.remove);
    }

    /**
     * Throws a bottle when the throw key is pressed and bottles are available.
     */
    checkThrowObject() {
        if (this.canCharacterThrowBottle()) {
            let throwWithRightHand = this.character.otherDirection ? this.character.x + 10 :
                this.character.x + 55;
            let bottle = new ThrowableObject(
                throwWithRightHand, this.character.y + this.character.height - 110,
                this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.lastKeypress = Date.now();
            this.bottlesAmount -= 20;
            this.bottlebar.setPercentage(this.bottlebar.IMAGES_BOTTLE_BAR, this.bottlesAmount);
            this.lastBottleThrowTime = Date.now();
        }
    }

    /**
     * 
     * @returns {boolean} Checks whether the character is allowed to throw a bottle
     */
    canCharacterThrowBottle() {
        return this.keyboard.D &&
            this.bottlesAmount > 0 &&
            Date.now() - this.lastBottleThrowTime >= 1000;
    }

    /**
     * Checks the character's collisions with bottles and coins.
     */
    checkCollisions() {
        this.checkCollisionWithBottles(this.level.bottles);
        this.checkCollisionWithCoins(this.level.coins);
    }

    /**
     * Handles collisions between the character and enemies, including jumping on enemies.
     * @param {MovableObject[]} chickens Enemies to check for collisions.
     */
    checkCharacterCollidesWithChickensOrJumpOn(chickens) {
        chickens.forEach((enemy) => {
            if (enemy.isDead() || !this.character.isColliding(enemy)) return;
            if (this.character.speedY < 0 && enemy != this.level.endboss[0]) {
                enemy.die();
                jumpOnChicken.currentTime = 0;
                jumpOnChicken.play();
            } else {
                this.character.hit();
                this.healthbar.setPercentage(this.healthbar.IMAGES_HEALTH, this.character.energy);
                this.level.endboss[0].isAttacking = true;
            }
        })
    }

    /**
     * Collects bottles that collide with the character and updates the bottle bar.
     * @param {Bottle[]} bottles Bottles to check for collisions.
     */
    checkCollisionWithBottles(bottles) {
        bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottlesAmount < 100) {
                bottlePickUp.currentTime = 0;
                bottlePickUp.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlesAmount += 20;
                this.bottlebar.setPercentage(this.bottlebar.IMAGES_BOTTLE_BAR, this.bottlesAmount);
            }
        })
    }

    /**
     * Collects coins that collide with the character and updates the coin bar.
     * @param {Coin[]} coins Coins to check for collisions.
     */
    checkCollisionWithCoins(coins) {
        coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.coinsAmount < 100) {
                coinSound.currentTime = 0;
                coinSound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinsAmount += 20;
                this.coinbar.setPercentage(this.coinbar.IMAGES_COIN_BAR, this.coinsAmount);
            }
        })
    }

    /**
     * Checks whether thrown bottles hit regular or small chicken enemies.
     * @param {MovableObject[]} enemies Enemies to check against thrown bottles.
     */
    checkBottleHitsChicken(enemies) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasSplashed) return;

            enemies.forEach((enemy) => {
                if ((enemy instanceof Chicken || enemy instanceof SmallChicken)
                    && !enemy.isDead() && bottle.isColliding(enemy)) {
                    enemy.die();
                    bottle.splash();
                }
            });
        });
    }

    /**
     * Alerts the end boss when the character gets close enough.
     */
    checkIfEndbossIsAlert() {
        const endboss = this.level.endboss[0];
        if (endboss && !endboss.isDead() && this.character.x >= this.level.endboss[0].x - 560) {
            endboss.isAlert = true;
        }
    }

    /**
     * Checks whether thrown bottles hit the end boss and updates its health bar.
     * @param {Endboss[]} endboss End boss instances to check against thrown bottles.
     */
    checkBottleHitsEndboss(endboss) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasSplashed) return;

            endboss.forEach((boss) => {
                if (!boss.isDead() && bottle.isColliding(boss)) {
                    boss.hit();
                    bottle.splash();
                    this.endbossHealthbar.setPercentage(this.endbossHealthbar.IMAGES_ENDBOSS_HEALTH, boss.energy);
                }
            })
        })
    }

    /**
     * Shows the end boss health bar when the character approaches the end boss.
     */
    checkHowCloseToEndboss() {
        if (this.level.endboss[0] && !this.level.endboss[0].isDead() &&
            this.character.x >= this.level.endboss[0].x - 640) {
            this.endbossHealthbarVisible = true;
        }
        if (this.endbossHealthbarVisible) {
            this.addToMap(this.endbossHealthbar);
        }
    }

    /**
     * Clears and redraws the game canvas, then schedules the next animation frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        //---place for fixed objects:
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.checkHowCloseToEndboss();

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.level.endboss[0]);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds each object in a collection to the game map.
     * @param {DrawableObject[]} objects Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws an object, mirroring it first when it faces the opposite direction.
     * @param {DrawableObject} mo Object to draw.
     */
    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Saves the canvas state and mirrors an object horizontally.
     * @param {DrawableObject} mo Object to mirror.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores an object's horizontal position and the saved canvas state.
     * @param {DrawableObject} mo Mirrored object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}