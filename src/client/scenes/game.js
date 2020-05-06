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

        this.roll = -1;
    }

    create() {
        // Dice
        this.dice = new Dice(this);
        this.dice.setInteractive();

        // Players
        this.players = new Array();
        this.players[0] = new Player(this, 0, 100);
        this.players[1] = new Player(this, 1, Constants.CONFIG.width - 100);

        this.players[0].hasTurn = true;
    }

    endTurn() {
        this.dice.endTurn(this);
    }
}