//Ensures the game runs once on keypress
var gameStarted = false;

var currentLevel = 0;
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Start the Game
$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + currentLevel);
    nextSequence();
    gameStarted = true;
  }
});

//Event handler clicking the buttons
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
  userClickedPattern = [];
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    $(document.body).addClass("game-over");
    setTimeout(function () {
      $(document.body).removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  currentLevel = 0;
  gamePattern = [];
  gameStarted = false;
}
