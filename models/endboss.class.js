class Endboss extends MovableObject {

    height = 340;
    width = 240;
    y = 110;
    energy = 100;
    speed = 0.2;
    isAlert = false;
    inAttackMode = false;
    isAttacking = false;
    alertAnimationIndex = 0;
    attackAnimationIndex = 0;
    deathAnimationIndex = 0;

    offset = {
        top: 70,
        bottom: 30,
        left: 15,
        right: 30
    }

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[1]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2520;
        // this.x = 550;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingBoss();
        }, 1000 / 60);

        setInterval(() => {
            this.fightingBoss();
        }, 200);
    }

    fightingBoss() {
        if (this.isDead()) {
            this.playDeathAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAlert && !this.inAttackMode) {
            this.playAlertAnimation();
        } else if (this.isWalking()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isNowAttacking()) {
            this.playAttackAnimation();
        }
    }

    playAlertAnimation() {
        if (this.alertAnimationIndex === this.IMAGES_ALERT.length) {
            this.inAttackMode = true;
            this.currentImage = 0;
            return;
        }
        this.currentImage = this.alertAnimationIndex;
        this.playAnimation(this.IMAGES_ALERT);
        this.alertAnimationIndex++;
    }

    playAttackAnimation() {
        if (this.attackAnimationIndex <= this.IMAGES_ATTACK.length - 1) {
            this.currentImage = this.attackAnimationIndex;
            this.playAnimation(this.IMAGES_ATTACK);
            this.attackAnimationIndex++;
        } else {
            this.attackAnimationIndex = 0;
            this.isAttacking = false;
        };
    }

    isNowAttacking() {
        return !this.isDead() && this.isAttacking && !this.isHurt();
    }

    playDeathAnimation() {
        if (this.deathAnimationIndex <= this.IMAGES_DEAD.length - 1) {
            this.currentImage = this.deathAnimationIndex;
            this.playAnimation(this.IMAGES_DEAD);
            this.deathAnimationIndex++;
        } else {
            this.deathAnimationIndex = 0;
            this.remove = true;
        }
    }

    walkingBoss() {
        if (this.isWalking()) {
            this.moveLeft();
        }
    }

    isWalking() {
        return !this.isDead() && this.inAttackMode && !this.isAttacking && !this.isHurt();
    }
}