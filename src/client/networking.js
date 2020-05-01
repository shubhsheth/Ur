import io from 'socket.io-client';

const Constants = require('../shared/constants');

const socket = io(`ws://${window.location.host}`);
const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
        console.log("connected to the server!");
        resolve();
    });
});

export const connect = onGameOver => (
    connectedPromise.then(() => {
        socket.on(Constants.MSG_TYPES.GAME_UPDATE, () => {
            console.log('process game update');
        });
        socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    })
);

export const play = username => {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, username)
}

export const updateDirection = dir => {
    socket.emit(Constants.MSG_TYPES.INPUT, dir);
}
