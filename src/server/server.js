const express = require('express');
const webpack = require('webpack');
const socketio = require('socket.io');
// const Game = require('./game');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');

const Constants = require('../shared/constants');

// Listen on port
const port = process.env.PORT || 3000;

// Setup an Express server
const app = express();
app.use(express.static('public'));
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Webpack Config
if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
}

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
    console.log('Player connected!', socket.id);

    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on('disconnect', onDisconnect);
});

// Setup the Game
// const game = new Game();

function joinGame(username) {
    //   game.addPlayer(this.username);
    console.log("Joined Game");
}

function handleInput(dir) {
    // game.handleInput(this, dir);
    console.log("Input");
}

function onDisconnect() {
    // game.removePlayer(this);
    console.log(`Disconnected`);
}




