'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');

let started = false;
let score = 0;
let timer = 0;

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
}

function stopGame() {}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 당근과 벌레 랜덤 배치
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
// 1. 시작 버튼을 누르면 10초 카운트 버튼 작동.
// let count = 10;
// startBtn.addEventListener('click', () => {
//     let startCount = setInterval(()=> {
//         if (count >= 0) {
//             gameTimer.innerText = count;
//             count -= 1;
//         } else {
//             count = 10;
//             clearInterval(startCount);
//         }
//     }, 1000) 
// })

// 2. 랜덤으로 숫자 생성해서 위치 지정.
// function putBugs() {
//     let randomPosition = (Math.random() * content.height());
//     console.log(randomPosition)
// }