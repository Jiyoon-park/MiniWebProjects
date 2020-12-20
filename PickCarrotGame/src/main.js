'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    game.start();
})

const game = new GameBuilder().gameDuration(5).carrotCount(15).bugCount(15).build();
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
        default:
            throw new Error('not valid reasult');
    }
    gameFinishBanner.showWithText(message);
})