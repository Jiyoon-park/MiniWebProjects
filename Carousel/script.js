const leftBtn = document.getElementById("leftBtn");
const rigthBtn = document.getElementById("rightBtn");
const firstImg = document.querySelector(".img:first-child");
const lastImg = document.querySelector(".img:last-child");
const dots = document.querySelectorAll(".dot");

function nextImg() {
  const curImg = document.querySelector(".showing");
  if (curImg) {
    const nextImg = curImg.nextElementSibling;
    if (nextImg) {
      curImg.classList.remove("showing");
      nextImg.classList.add("showing");
    } else {
      curImg.classList.remove("showing");
      firstImg.classList.add("showing");
    }
  } else {
    firstImg.classList.add("showing");
  }
}

function previousImg() {
  const curImg = document.querySelector(".showing");
  if (curImg) {
    const previousImg = curImg.previousElementSibling;
    if (previousImg) {
      curImg.classList.remove("showing");
      previousImg.classList.add("showing");
    } else {
      curImg.classList.remove("showing");
      lastImg.classList.add("showing");
    }
  }
}

function showIndexImg(idx) {
  const imgs = document.querySelectorAll(".img");
  const curImg = document.querySelector(".showing");
  for (i = 0; i < imgs.length; i++) {
    if (i == idx) {
      if (curImg) {
        curImg.classList.remove("showing");
      }
      imgs[i].classList.add("showing");
    }
  }
}

rigthBtn.addEventListener("click", nextImg);
leftBtn.addEventListener("click", previousImg);

for (i = 0; i < dots.length; i++) {
  dots[i].index = i;
  dots[i].addEventListener("click", function (e) {
    showIndexImg(e.target.index);
  });
}
