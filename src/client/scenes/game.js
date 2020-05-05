import Constants from '../../shared/constants';

// Sprites
import Player from '../sprites/player';
import Piece from '../sprites/piece';
import Dice from '../sprites/dice';

export default class Game extends Phaser.Scene {

    constructor() {
        super({
            key: 'Game',
        });
    }

    preload() {
        this.load.image("player-1", "/assets/player1.png")
        this.load.image("player-2", "/assets/player2.png")

        this.turn = 0
    }

    create() {

        // Dice
        this.dice = new Dice(this);
        this.dice.setInteractive();
        this.dice.on('pointerdown', () => this.dice.rollDice());

        // Players
        this.player = new Array();
        this.player[0] = new Player(this, 1, 100);
        this.player[1] = new Player(this, 2, Constants.CONFIG.width - 100);

    }

    update() {


    }
}