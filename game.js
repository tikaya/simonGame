var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level =0;

function playSound(name){
  var audio=new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100)
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("succes");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }else{
    console.log("wrong");
    audioLoss=new Audio("./sounds/wrong.mp3");
    audioLoss.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  console.log("Le nombre géneré au hasard est: "+randomNumber);
  var randomChosenColour =buttonColours[randomNumber];
  console.log("La couleur choisir au hasard est: "+randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(" ajout de la couleur generer  à la fin de liste gamePattern: "+gamePattern);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  console.log("userChosenColour affiche l'id du button cliqué par user qui est ici: "+userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log("userClickedPattern est un tableau qui affiche les differente couleurs de button cliqué par user: "+userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastIndexAnswer=userClickedPattern.length-1;
  console.log("le numero d'index de la dernier couleur choisir par utilisateur est :"+lastIndexAnswer)
  checkAnswer(lastIndexAnswer)
})

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    console.log("La touche est pressé pour la premiere fois donc nextSequence se lance");
    started=true;
    
  }
  
})
