buttonColours = ["red", "blue", "green", "yellow"];
pattern = [];
user = [];
var randomChosenColour;
var level = 0;

function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = randomNumber * 3;
  randomNumber = Math.floor(randomNumber + 1);
  level++;
  $("h1").text("level " + level);
  randomChosenColour = buttonColours[randomNumber];
  pattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  //console.log("patttern "+pattern);
}

$(document).on("keypress", function(event) {
  if(level==0)
  nextSequence();

});

$(".btn").click(function(event) {
  playSound(event.target.id);
  animatePress(event.target.id);
  user.push("" + event.target.id);
  //console.log("user "+user);
  if (level == user.length)
    checkAnswer();
  // else {
  //   user = [];
  //   playSound("wrong");
  //   pattern = [];
  //   $("h1").text("Game Over");
  //   $("body").addClass("wrong");
  //   setTimeout(function() {
  //     $("body").removeClass("wrong");
  //     $("h1").text("Press A Key to Start");
  //   }, 200);
  //}
});

function checkAnswer() {
  var flag = 0;
  for (var x = 0; x < level;x++) {
    console.log(pattern[x]+"  "+user[x]);
    if (pattern[x] !== user[x]) {
      flag = 1;
      break;
    }
  }
    //console.log("flag  "+flag);

  if (flag === 1) {
    level=0;
    playSound("wrong");
    pattern = [];
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h1").text("Press A Key to Start");
    }, 200);
  } else if (flag === 0) {
    nextSequence();
  }
  user = [];
}

function playSound(currentColor) {
  var a = new Audio("sounds/" + currentColor + ".mp3");
  a.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
