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
// check if the gamePattern[index]===userclickedPattern[index]
// then it checks the lenght to switch to another level
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
// creating a random index between 0 and 3 to choose color from the color array buttoncolours[random] numbers
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
// make a fade when the game pattern add colours colours
function fadeInOut(element) {
  element.style.transition = "opacity 100ms";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 100);
}
// when the user click a class pressed for a time 1 second
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
