//Define Global Scope Veriables
let turn
let turnScore;
let scores = [];


//Resting the game when ever the page is refreshed
initialize();

//Trigger clicking Buttons
let roll = document.getElementById("roll").addEventListener('click', rollDice);
let rest = document.getElementById("new").addEventListener('click', initialize);
let hold = document.getElementById("hold").addEventListener('click', holdScore);


//Function to roll the dice.

function rollDice() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  let randomDiceImage = "dice" + randomNumber + ".png";
  let randomImageSource = "images/" + randomDiceImage;
  let image = document.querySelectorAll("img")[0];
  image.setAttribute("src", randomImageSource);

  if (randomNumber !== 1) {
    turnScore += randomNumber;
    document.getElementById("player" + turn).innerHTML = "Turn Score: " + turnScore;
  } else {
    //Add an audio and background effect in case of the dice is equall to 1. 
    var audio = new Audio("sounds/wrong.mp3"); 
    audio.play();
    document.body.classList.add("round-over"); 
    setTimeout(() => {
      document.body.classList.remove("round-over"); 
    }, 150); 
    
    turnScore = 0;
    document.getElementById("player" + turn).innerHTML = "Turn Score: " + turnScore;
    turn === 0 ? turn = 1 : turn = 0;
    changeTurns(turn);
  }

}


//Hold Function
function holdScore() {
  //Add the turn score to the total score and updated scores
  scores[turn] += turnScore;
  turnScore = 0;
  document.getElementById("total" + turn).innerHTML = "Total Score: " + scores[turn];
  document.getElementById("player" + turn).innerHTML = "Turn Score: " + turnScore;

  //Check if player's socre is 30, below, or higehr. 
  if (scores[turn] >= 30) {
    //Add an audio and a background color in case of wining. 
    var audio = new Audio("sounds/winner.mp3"); 
    audio.play();
    document.body.classList.add("winner"); 
    setTimeout(() => {
      document.body.classList.remove("winner"); 
    }, 150); 
    
    document.querySelectorAll("h1")[0].innerHTML = "Player " + (turn + 1) + " Won 🔥";
    if (turn === 0) {
      document.getElementById("player-name-" + turn).innerHTML = "Winner 🔥"
    } else {
      document.getElementById("player-name-" + turn).innerHTML = "Winner 🔥"
    }
    //Disable roll and hold buttons if there's a winner
    document.getElementById("new-game").innerHTML = "Start A New Game!";
    document.getElementById("roll").disabled = true;
    document.getElementById("hold").disabled = true;

  } else {
    turn === 0 ? turn = 1 : turn = 0;
    changeTurns(turn);
  }
}

//Function for Resting The Game

function initialize() {
  scores = [0, 0];
  turnScore = 0;
  turn = 0;

  //Remove Start a new Game
  document.getElementById("new-game").innerHTML = ""; 
  //Rest Names
  document.getElementById("player-name-0").innerHTML = "Player 1";
  document.getElementById("player-name-1").innerHTML = "Player 2";
  //Rest Scores
  document.querySelectorAll("p")[1].innerHTML = "Total Score: " + '0';
  document.querySelectorAll("p")[2].innerHTML = "Turn Score: " + '0';
  document.querySelectorAll("p")[4].innerHTML = "Total Score: " + '0';
  document.querySelectorAll("p")[5].innerHTML = "Turn Score: " + '0';

  //Reenable buttons 
  document.getElementById("roll").disabled = false;
  document.getElementById("hold").disabled = false;

  //Change Player turn
  changeTurns(turn);

}


//Function for switching Players Turns
function changeTurns(n) {
  if (n == 0) {
    document.querySelectorAll("h1")[0].innerHTML = "Player One Turn!";
  } else {
    document.querySelectorAll("h1")[0].innerHTML = "Player Two Turn!"
  }
}