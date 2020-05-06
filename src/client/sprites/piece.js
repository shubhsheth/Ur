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

        // Events
        this.on('pointerdown', () => {
            if (scene.players[this.playerId].hasTurn && scene.roll > 0) {
                this.movePiece(scene);
            }
        });
    }

    isMovable(scene) {

        var newPosition = this.boardPosition + scene.roll;

        var player = scene.players[this.playerId].route;
        var opponent = scene.players[1 - this.playerId].route;

        // Check if moving to cell doesn't have conflicts
        if (player.isOccupied(newPosition)) { return false; }

        // Check if moving to cell is safe and has a opponent piece
        if (newPosition == 7) {
            if (opponent.isOccupied(newPosition)) { return false; }
        }

        // Check if moving to position is in bound
        if (newPosition > 14) { return false; }

        return true;
    }

    movePiece(scene) {
        if (this.isMovable(scene)) {

            var newPosition = this.boardPosition + scene.roll;

            var player = scene.players[this.playerId].route;
            var opponent = scene.players[1 - this.playerId].route;

            if (newPosition >= 4 && newPosition <= 11) {
                if (opponent.isOccupied(newPosition)) {

                    var opponentPieceId = opponent.getPieceAtPosition(newPosition);
                    var opponentPiece = scene.players[1 - this.playerId].getPieceById(opponentPieceId);

                    opponentPiece.kill();
                    opponent.killedPiece(newPosition);
                }
            }

            console.log(`MOVING TO POSITION: ${newPosition}`);

            var coords = player.getCoords(newPosition);
            this.x = coords.x;
            this.y = coords.y;

            player.movedPiece(this.id, this.boardPosition, newPosition);
            this.boardPosition = newPosition;

            scene.endTurn();
        }
    }

    kill() {
        this.x = 0;
        this.y = 0;
        this.boardPosition = -1;
    }

}