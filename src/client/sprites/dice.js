import Constants from '../../shared/constants';

export default class Dice extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player-1');

        scene.add.existing(this);

        this.x = 100;
        this.y = Constants.CONFIG.height - 50;
        this.displayHeight = 100;
        this.displayWidth = 200;

    }

    rollDice() {
        console.log("Works");
    }
}