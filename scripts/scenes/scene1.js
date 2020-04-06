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
                piece.setDepth(2)
                pieces.add(piece)
                y += config.pieces.width + 10
            }
            player[i].pieces = pieces;
        }


        //Build Board
        this.board = this.add.group()
        var x = config.width / 2 - config.board.cellWidth
        var y = config.height / 2 - (config.board.cellHeight / 2)
        var iter = 0;

        while (iter < 20) {
            var square = this.add.rectangle(x, y, config.board.cellWidth, config.board.cellHeight, 0x000000)
            square.setDepth(1)
            square.isStroked = true
            square.lineWidth = 2
            square.strokeColor = 0xff0000
            square.text = i
            this.board.add(square)

            iter++

            switch (true) {
                case (iter <= 7):
                    // Top 4 in Left and Right columns
                    if (iter % 2 == 0) {
                        y -= config.board.cellHeight
                        x -= (2 * config.board.cellWidth)
                    } else {
                        x += (2 * config.board.cellWidth)
                    }
                    break

                case (iter == 8):
                    // Top 1 in Middle column
                    x -= config.board.cellWidth
                    break

                case (iter == 16):
                    // Bottom Left
                    x -= config.board.cellWidth
                    break

                case (iter > 16):
                    // Bottom 3 in Left and Right Columns
                    if (iter % 2 == 0) {
                        y -= config.board.cellHeight
                        x -= (2 * config.board.cellWidth)
                    } else {
                        x += (2 * config.board.cellWidth)
                    }
                    break

                default:
                    // Middle column from 2nd
                    y += config.board.cellHeight
            }
        }



        // Dice
        this.dice = this.add.rectangle(100, config.height - 50, 70, 40, 0x000000)
        this.dice.setInteractive()

        this.dice.on("pointerdown", () => this.rollDice())

    }

    rollDice() {
        this.dice.removeInteractive()
        this.roll = Math.round(Math.random() * 4)
        console.log(this.roll)

        
    }

}