const wrapper = document.getElementById("wrapper");
const hexCode = document.getElementById("hexCode");
const button = document.getElementById("btn");

let hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

function CreateRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function CreateRandomIdx() {
  let randomIdx = [];
  for (let i = 0; i < 6; i++) {
    randomIdx.push(CreateRandomNum(0, hex.length));
  }
  return randomIdx;
}

function createRandomCode() {
  let res = "#";
  let randomIdx = CreateRandomIdx();
  for (let i = 0; i < randomIdx.length; i++) {
    res += hex[randomIdx[i]];
  }
  return res;
}

function changeColor() {
  let randomCode = createRandomCode();
  hexCode.innerText = randomCode;
  wrapper.style.background = randomCode;
}

button.addEventListener("click", changeColor);
