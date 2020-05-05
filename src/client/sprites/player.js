import Constants from '../../shared/constants';
import Piece from './piece';

export default class Player {
    constructor(scene, id, piecePosition) {
        this.id = id;
        this.piecePosition = piecePosition;
        this.pieceSprite = 'player-' + id;

        this.createPieces(scene);
        this.buildBoard(scene);
    }

    createPieces(scene) {
        console.log("Create Piece");

        this.pieces = scene.add.group();

        var x = this.piecePosition;
        var y = 35;

        for (var j = 0; j < 7; j++) {
            var piece = new Piece(scene, x, y, this.pieceSprite).setInteractive();
            piece.id = j;
            this.pieces.add(piece);

            y += Constants.PIECE.WIDTH + 10;
        }
    }

    buildBoard(scene) {

        var x = (Constants.CONFIG.width / 2 - Constants.BOARD.CELL_DIMENSION);
        var y = (Constants.CONFIG.height / 2 - Constants.BOARD.CELL_DIMENSION / 2);
        if (this.id == 2) { x += (Constants.BOARD.CELL_DIMENSION * 2); }

        var sideMultiplier = this.id;
        if (this.id == 2) { sideMultiplier = -1; }

        this.route = scene.add.group();
        var iter = 0;

        while (iter < 14) {
            var square = scene.add.rectangle(
                x,
                y,
                Constants.BOARD.CELL_DIMENSION,
                Constants.BOARD.CELL_DIMENSION,
                0x000000
            );

            square.setDepth(1);
            square.isStroked = true;
            square.lineWidth = 2;
            square.strokeColor = 0xff0000;

            square.occupied = -1;

            this.route.add(square);
            iter++;

            switch (true) {
                case (iter < 4):
                    // Start Column
                    y -= Constants.BOARD.CELL_DIMENSION;
                    break;

                case (iter == 4):
                    // Middle Column 1st
                    x += (Constants.BOARD.CELL_DIMENSION * sideMultiplier)
                    break

                case (iter < 12):
                    // Middle Column
                    y += Constants.BOARD.CELL_DIMENSION
                    break

                case (iter == 12):
                    // End Column 1st
                    x -= (Constants.BOARD.CELL_DIMENSION * sideMultiplier)
                    break

                default:
                    // End Column
                    y -= Constants.BOARD.CELL_DIMENSION
            }
        }
    }
}