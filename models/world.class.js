class World {
    character = new Character();
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
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
            this.checkBottleHitsChicken(this.level.enemies);
            this.checkBottleHitsChicken(this.level.smallEnemies);
            this.checkBottleHitsEndboss(this.level.endboss);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.enemies);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.smallEnemies);
            this.checkCharacterCollidesWithChickensOrJumpOn(this.level.endboss);
            this.removeDeadAndUsedObjects();
        }, 1000 / 60);

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkIfEndbossIsAlert();
        }, 200);
    }

    setWorld() {
        this.character.world = this;
    }

    removeDeadAndUsedObjects() {
        this.level.enemies = this.level.enemies.filter((e) => !e.remove);
        this.level.smallEnemies = this.level.smallEnemies.filter((e) => !e.remove);
        this.level.endboss = this.level.endboss.filter((boss) => !boss.remove);
        this.throwableObjects = this.throwableObjects.filter((b) => !b.remove);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.bottlesAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 55, this.character.y + this.character.height - 110);
            this.throwableObjects.push(bottle);
            this.character.lastKeypress = Date.now();
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
            if (this.character.speedY < 0 && enemy != this.level.endboss[0]) {
                enemy.die();
            } else {
                this.character.hit();
                this.healthbar.setPercentage(this.healthbar.IMAGES_HEALTH, this.character.energy);
                this.level.endboss[0].isAttacking = true;
                console.log('Character: ', this.character.energy);
                console.log(this.level.endboss[0].isAttacking);
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

    checkIfEndbossIsAlert() {
        const endboss = this.level.endboss[0];
        if (endboss && !endboss.isDead() && this.character.x >= 300) {
            endboss.isAlert = true;
        }
    }

    checkBottleHitsEndboss(endboss) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasSplashed) return;

            endboss.forEach((boss) => {
                if (!boss.isDead() && bottle.isColliding(boss)) {
                    boss.hit();
                    bottle.splash();
                    this.endbossHealthbar.setPercentage(this.endbossHealthbar.IMAGES_ENDBOSS_HEALTH, boss.energy);
                    console.log(boss.energy);
                }
            })
        })
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
        this.addToMap(this.endbossHealthbar);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.endboss);
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