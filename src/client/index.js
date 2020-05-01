import { downloadAssets } from './assets';
import { connect } from './networking';
import Phaser from 'phaser';
import Player from './scripts/player';

import './css/style.css';

const Constants = require('../shared/constants');

Promise.all([
    connect(),
    downloadAssets(),
]).then(() => {
    const game = new Phaser.Game

    var player = [];
    player[0] = new Player()
    player[1] = new Player()

    game.scene.add("playGame", Scene1)
    game.scene.start("playGame")

});