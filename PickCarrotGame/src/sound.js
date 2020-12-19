const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playGameWin() {
    playSound(gameWinSound);
}

export function playBg() {
    playSound(bgSound);
}

export function stopBg() {
    stopSound(bgSound);
}

function playSound(sound) {
    sound.play();
}

function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}