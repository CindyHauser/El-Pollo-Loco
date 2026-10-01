class World {
    character = new Character();
    statusbar = new StatusBar();
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    throwableObjects = [];
    coinsAmount = 0;
    bottlesAmount = 100;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkBottleHitsChicken();
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.enemies);
            this.removeDeadAndUsedObjects();
        }, 1000 / 60);

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 200);
    }

    removeDeadAndUsedObjects() {
        this.level.enemies = this.level.enemies.filter((e) => !e.remove);
        this.throwableObjects = this.throwableObjects.filter((b) => !b.remove);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.bottlesAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 55, this.character.y + this.character.height - 110);
            this.throwableObjects.push(bottle);
            this.bottlesAmount -= 20;
            this.bottlebar.setPercentage(this.bottlebar.IMAGES_BOTTLE_BAR, this.bottlesAmount);
        }
    }

    checkCollisions() {
        this.checkCollisionWithBottles(this.level.bottles);
        this.checkCollisionWithCoins(this.level.coins);
    }

    checkCharacterCollidesWithChickensOrJumpOn(chickens) {
        chickens.forEach((enemy) => {
            if (enemy.isDead() || !this.character.isColliding(enemy)) return;
            if (this.character.speedY < 0) {
                enemy.die();
            } else {
                this.character.hit();
                this.healthbar.setPercentage(this.healthbar.IMAGES_HEALTH, this.character.energy);
                console.log(this.character.energy);
            }
        })
    }

    checkCollisionWithBottles(bottles) {
        bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottlesAmount < 100) {
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlesAmount += 20;
                this.bottlebar.setPercentage(this.bottlebar.IMAGES_BOTTLE_BAR, this.bottlesAmount);
            }
        })
    }

    checkCollisionWithCoins(coins) {
        coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.coinsAmount < 100) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinsAmount += 20;
                this.coinbar.setPercentage(this.coinbar.IMAGES_COIN_BAR, this.coinsAmount);
            }
        })
    }

    checkBottleHitsChicken() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasSplashed) return;

            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Chicken && !enemy.isDead() && bottle.isColliding(enemy)) {
                    enemy.die();
                    bottle.splash();
                }
            });
        });
    }

    setWorld() {
        this.character.world = this;
    }

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

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.endboss);
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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}