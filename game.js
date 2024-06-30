let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    const button = document.getElementById(randomChosenColour);
    button.classList.add("fade");
    setTimeout(() => button.classList.remove("fade"), 200);
    playSound(randomChosenColour);
  }
  
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateClick(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateClick(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent =
      "Game Over, Press Any Key to Restart";
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}