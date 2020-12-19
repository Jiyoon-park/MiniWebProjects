'use strict';

import PopUp from './popup.js';
import Game from './game.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    game.start();
})

const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
game.setGameStopListener((result) => {
    let message;
    switch (result) {
        case 'cancel':
            message = 'REPLAY?';
            break;
        case 'win':
            message = 'YOU WIN 🏆';
            break;
        case 'lose':
            message = 'YOU LOST 💩';
            break
    }
    gameFinishBanner.showWithText(message);
})