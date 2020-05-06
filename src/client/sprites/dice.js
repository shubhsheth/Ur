import Constants from '../../shared/constants';

export default class Dice extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player-1');

        scene.add.existing(this);

        this.x = 100;
        this.y = Constants.CONFIG.height - 50;
        this.displayHeight = 100;
        this.displayWidth = 200;

        this.rollText = scene.add.text(this.x, this.y, "1").setFontSize(20);

        this.on('pointerdown', () => {
            if (scene.roll == -1) {
                this.rollDice(scene)
            }
        });
    }

    rollDice(scene) {
        scene.roll = Math.round(Math.random() * 4);
        console.log(scene.roll);
        this.rollText.setText(scene.roll);

        if (scene.roll == 0) {
            console.log("Zero!");
            this.endTurn(scene);
        }
    }

    endTurn(scene) {
        scene.roll = -1;
        scene.players[0].switchTurn();
        scene.players[1].switchTurn();
    }
}