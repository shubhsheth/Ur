import Constants from '../../shared/constants';
import Piece from './piece';
import Route from './route';

export default class Player {
    constructor(scene, id, piecePosition) {
        this.id = id;
        this.piecePosition = piecePosition;
        this.pieceSprite = 'player-' + (id + 1);
        this.hasTurn = false;

        // Create Pieces and Route
        this.createPieces(scene);
        this.createRoute(scene);
    }

    createPieces(scene) {
        this.pieces = scene.add.group();

        var x = this.piecePosition;
        var y = 35;

        for (var j = 0; j < 7; j++) {
            var piece = new Piece(scene, x, y, this.pieceSprite).setInteractive();
            piece.id = j;
            piece.playerId = this.id;
            this.pieces.add(piece);

            y += Constants.PIECE.WIDTH + 10;
        }
    }

    createRoute(scene) {
        this.route = new Route(scene, this.id);
    }

    switchTurn() {
        this.hasTurn = !this.hasTurn;
    }

    getPieceById(pos) {
        return this.pieces.children.entries[pos];
    }

}