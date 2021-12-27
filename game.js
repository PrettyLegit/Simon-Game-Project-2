//Ensures the game runs once on keypress
var gameStarted = false;

const buttonColours = ["red", "blue", "green", "yellow"];

var currentLevel = 0;
var gamePattern = [];
var userClickPattern = [];

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

  userClickPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
});

//Generates the next sequence
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
  userClickPattern = [];
}

//Play a sound given the name
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animates the keypress
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Compares the value at a given index
function checkAnswer(index) {
  if (userClickPattern[index] === gamePattern[index]) {
    if (userClickPattern.length === gamePattern.length) {
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

//Reset the values
function startOver() {
  currentLevel = 0;
  gamePattern = [];
  gameStarted = false;
}
