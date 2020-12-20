'use strict';

import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';
import PopUp from './popup.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder().gameDuration(5).carrotCount(1).bugCount(15).build();

game.setGameStopListener((result) => {
    let message;
    switch (result) {
        case Reason.cancel:
            message = 'REPLAY?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WIN 🏆';
            sound.playGameWin();
            break;
        case Reason.lose:
            message = 'YOU LOST 💩';
            sound.playBug();
            break
        default:
            throw new Error('not valid reasult');
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})