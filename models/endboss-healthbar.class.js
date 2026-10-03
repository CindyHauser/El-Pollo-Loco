class EndbossHealthbar extends StatusBar {

    IMAGES_ENDBOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS_HEALTH);
        this.x = 500;
        this.y = 5;
        this.width = 190;
        this.height = 45;
        this.setPercentage(this.IMAGES_ENDBOSS_HEALTH, 100);
    }
}