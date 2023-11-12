const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keypress", () => {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextLevel();
    started = true;
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent =
      "Game Over, Press Any Key To Restart";
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    gameOver();
  }
}
function nextLevel() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  const element = document.getElementById(randomChosenColour);
  fadeInOut(element);
  playSound(randomChosenColour);
}
function fadeInOut(element) {
  element.style.transition = "opacity 100ms";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 100);
}

function animatePress(currentColor) {
  const element = document.getElementById(currentColor);
  element.classList.add("pressed");
  setTimeout(() => {
    element.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
