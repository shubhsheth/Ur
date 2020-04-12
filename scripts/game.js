var config = {
    width: 800,
    height: 550,
    backgroundColor: 0x2089b9,

    board: {
        cellDimension: 65
    },
    pieces: {
        width: 40,
        height: 40
    }
}

game = new Phaser.Game(config)

var player = [];
player[0] = new Player()
player[1] = new Player()

game.scene.add("playGame", Scene1)
game.scene.start("playGame")
