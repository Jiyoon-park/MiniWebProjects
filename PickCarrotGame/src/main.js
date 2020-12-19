'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
})

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (started === false) {
        return
    }
    if (item === 'carrot') {
        updateScoreBoard(++score);
        if (score === CARROT_COUNT) {
            finishGame(true)
        }
    } else if (item === 'bug') {
        finishGame(false)
    }
}

function updateScoreBoard(score) {
    gameScore.innerText = CARROT_COUNT - score;
}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBg();
}

function stopGame() {
    started = false;
    stopGameTimer();
    showStartButton();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY?')
    sound.stopBg();
}

function finishGame(result) {
    started = false;
    stopGameTimer();
    showStartButton();
    hideGameButton();
    sound.stopBg();
    if (result) {
        sound.playGameWin();
    } else {
        sound.playBug();
    }
    gameFinishBanner.showWithText(result? 'YOU WIN 🏆' : 'YOU LOST 💩');
}

function showStopButton() {
    gameBtn.style.visibility = 'visible';
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showStartButton() {
    const icon = gameBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=> {
        if (remainingTimeSec <= 0 ) {
            clearInterval(timer);
            finishGame(false);
            return
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}


function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}
