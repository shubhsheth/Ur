import Constants from '../../shared/constants'

export default class Route extends Phaser.GameObjects.Group {

    constructor(scene, playerId) {
        super(scene, playerId);
        scene.add.existing(this);

        this.playerId = playerId;
        this.cellDimension = Constants.BOARD.CELL_DIMENSION; // shorten name

        this.createRouteCells(scene);
    }

    createRouteCells(scene) {
        var x = (Constants.CONFIG.width / 2 - this.cellDimension);
        var y = (Constants.CONFIG.height / 2 - this.cellDimension / 2);
        if (this.playerId == 1) { x += (this.cellDimension * 2); }

        var sideMultiplier = -1;
        if (this.playerId == 1) { sideMultiplier = 1; }

        for (var iter = 1; iter <= 15; iter++) {
            var square = scene.add.rectangle(
                x,
                y,
                this.cellDimension,
                this.cellDimension,
                0x000000
            );

            square.occupiedId = -1;

            square.setDepth(1);
            square.isStroked = true;
            square.lineWidth = 2;
            square.strokeColor = 0xff0000;
            if (iter == 15) { square.fillColor = 0xff0000; }


            this.add(square);

            switch (true) {
                case (iter < 4):
                    // Start Column
                    y -= this.cellDimension;
                    break;

                case (iter == 4):
                    // Middle Column 1st
                    x -= (this.cellDimension * sideMultiplier);
                    break;

                case (iter < 12):
                    // Middle Column
                    y += this.cellDimension;
                    break;

                case (iter == 12):
                    // End Column 1st
                    x += (this.cellDimension * sideMultiplier);
                    break;

                default:
                    // End Column
                    y -= this.cellDimension;
            }
        }
    }

    isOccupied(pos) {
        return (this.children.entries[pos].occupiedId >= 0);
    }

    movedPiece(pieceId, currentPos, newPos) {
        if (currentPos >= 0) {
            this.children.entries[currentPos].occupiedId = -1;
        }
        this.children.entries[newPos].occupiedId = pieceId;
    }

    killedPiece(pos) {
        this.children.entries[pos].occupiedId = -1;
    }

    getPieceAtPosition(pos) {
        return this.children.entries[pos].occupiedId;
    }

    getCoords(pos) {
        var coords = {
            x: this.children.entries[pos].x,
            y: this.children.entries[pos].y
        };

        return coords;
    }

}