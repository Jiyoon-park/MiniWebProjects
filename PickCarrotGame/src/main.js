'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder().gameDuration(5).carrotCount(15).bugCount(15).build();

game.setGameStopListener((result) => {
    let message;
    switch (result) {
        case Reason.cancel:
            message = 'REPLAY?';
            break;
        case Reason.win:
            message = 'YOU WIN 🏆';
            break;
        case Reason.lose:
            message = 'YOU LOST 💩';
            break
        default:
            throw new Error('not valid reasult');
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})