'use strict';

import * as sound from './sound.js';
import Field from './field.js';

export default class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(count) {
        this.carrotCount = count;
        return this;
    }

    bugCount(count) {
        this.bugCount = count;
        return this;
    }

    build() {
        return new Game(this.gameDuration, this.carrotCount, this.bugCount);
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }
        })

        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.init();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBg();
    }

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.showStartButton();
        this.hideGameButton();
        sound.stopBg();
        this.onGameStop && this.onGameStop('cancel');
    }

    finish(result) {
        this.started = false;
        this.stopGameTimer();
        this.showStartButton();
        this.hideGameButton();
        sound.stopBg();
        if (result) {
            sound.playGameWin();
        } else {
            sound.playBug();
        }
        this.onGameStop && this.onGameStop(result? 'win' : 'lose');
    }

    init() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }

    onItemClick = item => {
        if (this.started === false) {
            return
        }
        if (item === 'carrot') {
            this.updateScoreBoard(++this.score);
            if (this.score === this.carrotCount) {
                this.finish(true)
            }
        } else if (item === 'bug') {
            this.finish(false)
        }
    }

    updateScoreBoard(score) {
        this.gameScore.innerText = this.carrotCount - score;
    }

    showStopButton() {
        this.gameBtn.style.visibility = 'visible';
        const icon = this.gameBtn.querySelector('.fa-play');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
    }
    
    showStartButton() {
        const icon = this.gameBtn.querySelector('.fa-stop');
        icon.classList.add('fa-play');
        icon.classList.remove('fa-stop');
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=> {
            if (remainingTimeSec <= 0 ) {
                clearInterval(this.timer);
                this.finish(false);
                return
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000)
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    


}