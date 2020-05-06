const Constants = require('../shared/constants');
import { downloadAssets } from './assets';
import { connect } from './networking';
import './styles/main.css';

import Phaser from 'phaser';
import Game from './scenes/game';

Promise.all([
    connect(),
    downloadAssets(),
]).then(() => {
    Constants.CONFIG.scene = [
        Game
    ]
    const game = new Phaser.Game(Constants.CONFIG);
});