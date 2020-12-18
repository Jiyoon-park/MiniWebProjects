'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = popUp.querySelector('.pop-up__message');
const popUpreDo = popUp.querySelector('.pop-up__redo');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
    if (started === false) {
        return
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        updateScoreBoard(++score);
        if (score === CARROT_COUNT) {
            finishGame(true)
        }
    } else if (target.matches('.bug')) {
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
    score = 0;
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    started = false;
    stopGameTimer();
    showStartButton();
    hideGameButton();
    showPopUpWithText('REPLAY?');
}

function finishGame(result) {
    started = false;
    stopGameTimer();
    showStartButton();
    hideGameButton();
    showPopUpWithText(result? 'YOU WIN' : 'YOU LOST');
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

function showPopUpWithText(text) {
    popUp.classList.remove('pop-up--hide');
    popUpText.innerText = text;
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    gameTimer.innerText = timer;
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0; 
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i=0;i<count;i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

popUpreDo.addEventListener('click', ()=> {
    hidePopUp();
    startGame();
})