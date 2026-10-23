class Character extends MovableObject {

    world;
    y = 180;
    height = 250;
    width = 120;
    speed = 5;
    lastKeypress = Date.now();
    offset = {
        top: 100,
        bottom: 30,
        left: 35,
        right: 30
    }
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
    ];
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Creates the character, loads its animation images, and starts gravity and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the intervals that handle character movement and animations.
     */
    animate() {
        setStoppableInterval(() => {
            this.movingTheCharacter();
        }, 1000 / 60);
        setStoppableInterval(() => {
            this.moveAnimationsForCharacter();
        }, 50);
        setStoppableInterval(() => {
            this.idleAnimationsForCharacter();
        }, 150);
    }

    /**
     * Processes keyboard input to move or jump and updates the camera position.
     */
    movingTheCharacter() {
        if (this.isDead()) {
            return;
        }
        if (this.world.keyboard.RIGHT && this.x < level1.level_end_x) {
            this.goRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.goLeft();
        }
        if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
            this.jumpWithSound();
        }
        this.world.camera_x = Math.max(-2160, -this.x + 100);
    }

    /**
     * Makes the character jump, plays the jump sound, and records the input time.
     */
    jumpWithSound() {
        this.stopSnoring();
        this.jump();
        jumpSound.currentTime = 0;
        jumpSound.play();
        this.lastKeypress = Date.now();
    }

    /**
     * Moves the character left, turns it toward the movement direction, and records the input time.
     */
    goLeft() {
        this.stopSnoring();
        this.moveLeft();
        this.otherDirection = true;
        this.lastKeypress = Date.now();
    }

    /**
     * Moves the character right and records the input time.
     */
    goRight() {
        this.stopSnoring();
        this.moveRight();
        this.lastKeypress = Date.now();
    }

    /**
     * Selects the character's animation based on its state and recent movement.
     */
    moveAnimationsForCharacter() {
        if (!this.isAboveGround()) {
            this.currentJumpImage = 0;
        }
        
        if (this.isDead()) {
            this.stopSnoring();
            this.playAnimation(this.IMAGES_DYING);
        } else if (this.isHurt()) {
            this.stopSnoring();
            this.playAnimation(this.IMAGES_HURTING);
        } else if (this.isAboveGround()) {
            this.playJumpAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (Date.now() - this.lastKeypress < 3500) {
            this.loadImage('img/2_character_pepe/1_idle/standingPepe.png');
        }
    }

    /**
     * Plays idle animations when no relevant input or action is active.
     */
    idleAnimationsForCharacter() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP ||
            this.world.keyboard.D || this.world.keyboard.SPACE || this.isDead() || this.isHurt() || this.isAboveGround()) {
            return;
        } else if (Date.now() - this.lastKeypress >= 3500 && Date.now() - this.lastKeypress < 8000) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (Date.now() - this.lastKeypress >= 8000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            snorePepe.play();
        }
    }

    stopSnoring() {
        snorePepe.pause();
        snorePepe.currentTime = 0;
    }

}