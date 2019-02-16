var userClickedPattern=[];
var gamePattern=[];
var started =false;
var level=0;

var buttonColors=["red", "blue", "green", "yellow"];
$(".btn").click(function (){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
  if(!started){

    nextSequence();

    started=true;
  }


})
function nextSequence() {
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text(level+" level");

  var randomNo=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNo];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}
function playSound(name){
  var audio =new Audio("sounds/"+name+".mp3");
  audio.play();

}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("Success");
    console.log(userClickedPattern);
    console.log(gamePattern);

  if(userClickedPattern.length===gamePattern.length){

    setTimeout(function(){
      nextSequence();
    },1000);

  }
}
  else  {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over,Press A Key To Start");
    startOver();
    console.log("Wrong");
  }

}
 function startOver(){
   gamePattern=[];

   started=false;
   level=0;
 }
