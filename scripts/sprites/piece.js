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
        // moveCell = 
    }
}