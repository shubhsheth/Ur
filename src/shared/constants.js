module.exports = Object.freeze({
    CONFIG: {
        width: 800,
        height: 550,
        backgroundColor: 0x2089b9,
    },
    BOARD: {
        CELL_DIMENSION: 65
    },
    PIECE: {
        WIDTH: 40,
        HEIGHT: 40,
    },
    MSG_TYPES: {
        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        GAME_OVER: 'dead',
    },
});