import Constants from '../../shared/constants';

export default class Piece extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);

        this.x = x;
        this.y = y;
        this.displayWidth = Constants.PIECE.WIDTH;
        this.displayHeight = Constants.PIECE.HEIGHT;

        this.setDepth(5);
        this.boardPosition = -1;
    }

}