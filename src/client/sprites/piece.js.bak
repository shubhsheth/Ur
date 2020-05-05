class Piece extends Phaser.GameObjects.Sprite {
    constructor(scene, key, x, y) {
        super(scene, x, y, key)
        scene.add.existing(this)
        this.x = x
        this.y = y
        this.displayWidth = config.pieces.width
        this.displayHeight = config.pieces.height
    }

    create() {

    }

    isMovable(roll) {

        var newPosition = this.boardPosition + roll
        var positionCell = player[this.playerId].route.children.entries[newPosition]

        if (positionCell.occupied >= 0) {
            return false
        } else if (newPosition == 7) {
            if (player[1 - this.playerId].route.children.entries[7].occupied >= 0) {
                return false
            }
        }

        return true
    }

    move(roll) {

        var newPosition = this.boardPosition + roll
        var currentCell = player[this.playerId].route.children.entries[this.boardPosition]
        var positionCell = player[this.playerId].route.children.entries[newPosition]
        var oppositionCell = player[1 - this.playerId].route.children.entries[newPosition]

        if (newPosition >= 4 && newPosition <= 11) {
            if (oppositionCell.occupied >= 0) {
                console.log("KILLING ID: " + oppositionCell.occupied)
                player[1 - this.playerId].pieces.children.entries[oppositionCell.occupied].kill()
                oppositionCell.occupied = -1
            }
        }

        console.log("MOVING TO POSITION: " + newPosition)

        if (currentCell != undefined)
            currentCell.occupied = -1

        this.x = positionCell.x
        this.y = positionCell.y
        this.boardPosition = newPosition
        positionCell.occupied = this.id

    }

    kill() {

        this.x = player[this.playerId].piecePosition;
        this.y = 100;
        this.boardPosition = -1;
    }
}