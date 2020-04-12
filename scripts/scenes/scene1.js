class Scene1 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

    preload() {

        this.load.image("player-1", "/assets/images/player1.png")
        this.load.image("player-2", "/assets/images/player2.png")

        player[0].id = 1
        player[1].id = 2

        player[0].piecePosition = 100
        player[1].piecePosition = config.width - 100

        this.turn = 0

    }

    create() {


        // Align Pieces
        for (var i = 0; i < 2; i++) {
            var pieces = this.add.group()
            var sprite = "player-" + player[i].id
            var x = player[i].piecePosition
            var y = 35
            for (var j = 0; j < 7; j++) {
                var piece = new Piece(this, sprite, x, y)

                piece.setDepth(5)
                piece.playerId = i;
                piece.boardPosition = -1;
                piece.id = j;

                pieces.add(piece)
                y += config.pieces.width + 10
            }
            player[i].pieces = pieces;
        }

        // player[0].pieces.on('pointerdown', () => this.movePiece(this))


        //Build Board Route
        for (var i = 0; i < player.length; i++) {

            var x = (config.width / 2 - config.board.cellDimension) + (config.board.cellDimension * 2 * i)
            var y = (config.height / 2 - config.board.cellDimension / 2)

            var sideMultiplier = 1
            if (i == 1)
                sideMultiplier = -1

            player[i].route = this.buildBoard(x, y, sideMultiplier)
        }




        // Dice
        this.dice = this.add.rectangle(100, config.height - 50, 70, 40, 0x000000)
        this.dice.setInteractive()

        this.dice.on("pointerdown", () => this.rollDice())

    }

    buildBoard(x, y, sideMultiplier) {

        var board = this.add.group()
        var iter = 0;

        while (iter < 14) {
            var square = this.add.rectangle(x, y, config.board.cellDimension, config.board.cellDimension, 0x000000)

            square.setDepth(1)
            square.isStroked = true
            square.lineWidth = 2
            square.strokeColor = 0xff0000

            square.occupied = -1;

            board.add(square)
            iter++

            switch (true) {
                case (iter < 4):
                    // Start Column
                    y -= config.board.cellDimension
                    break

                case (iter == 4):
                    // Middle Column 1st
                    x += (config.board.cellDimension * sideMultiplier)
                    break

                case (iter < 12):
                    // Middle Column
                    y += config.board.cellDimension
                    break

                case (iter == 12):
                    // End Column 1st
                    x -= (config.board.cellDimension * sideMultiplier)
                    break

                default:
                    // End Column
                    y -= config.board.cellDimension
            }
        }

        return board
    }



    rollDice() {
        this.roll = Math.round(Math.random() * 4)
        if (this.roll > 0) {
            this.dice.removeInteractive()
            console.log(this.roll)

            this.input.setHitArea(player[this.turn].pieces.getChildren()).on('gameobjectdown', (pointer, gameObject) => this.movePiece(pointer, gameObject))
        } else {
            this.turn = 1 - this.turn;
        }

    }

    movePiece(pointer, piece) {

        var playerId = this.turn

        if (piece.playerId == playerId) {

            if (piece.isMovable(this.roll)) {
                piece.move(this.roll);

                this.changeTurn()
            }
        }

    }

    changeTurn() {
        // Change Turn
        this.turn = 1 - this.turn;

        this.input.removeAllListeners('gameobjectdown')
        this.dice.setInteractive()
    }

}