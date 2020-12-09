const startBtn = document.querySelector('.start-btn');
const stopWatch = document.querySelector('.stop-watch');
const content = document.querySelector('content');
const result = document.querySelector('.result-popup');

// 1. 시작 버튼을 누르면 10초 카운트 버튼 작동.
let count = 10;
startBtn.addEventListener('click', () => {
    let startCount = setInterval(()=> {
        if (count >= 0) {
            stopWatch.innerText = count;
            count -= 1;
        } else {
            count = 10;
            clearInterval(startCount);
        }
    }, 1000) 
})

// 2. 랜덤으로 숫자 생성해서 위치 지정.
function putBugs() {
    let randomPosition = (Math.random() * content.height());
    console.log(randomPosition)
}