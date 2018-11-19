var $newGame = document.getElementById('newGame');
var $underScores = document.getElementById('underscores');
// var $newGame = document.getElementById('Guessed');
var $wrong = document.getElementById('wrong');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $guessesLeft = document.getElementById('guessesleft')
var $guessedLetters = document.getElementById('Guessed');
// console.log($newGame, 'new game')
// console.log($underScores, 'new game')
var words = ['Spongebob', 'Simpsons', 'Pokemon', 'Warp Drive', 'Interstellar'];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var chosenWord = '';
var gameRunning = false;
var wrong = [];
var chosenWordplaceholder = [];
var chosenLetterbank = [];
var wrongLetterbank = [];
var guessedLetters = [];

//This is the function for starting a new game
function newGame() {

  resetGame();
  gameRunning = true;
  guessesleft = 9;
  underScores = [];
  wrong = [];
  chosenWordplaceholder = [];
  
  //Choosing random worf from word bank
  chosenWord = words[Math.floor(Math.random() * words.length)];


  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === ' ') {
      chosenWordplaceholder.push(' ');
    } else {
      chosenWordplaceholder.push('_ ');
    }
  }
  $guessesLeft.textContent = guessesLeft;
  $underScores.textContent = chosenWordplaceholder.join('');
  $guessedLetters.textContent = wrongLetterbank;
  guessesLeft.textContent = guessesLeft;
}

//Function for guessed letter 
function guesses(letter) {
  console.log(letter, 'letter');
  if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    for (var i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i].toLowerCase() === letter.toLowerCase()) {
        chosenWordplaceholder[i] = chosenWord[i];
      }
    }
    $underScores.textContent = chosenWordplaceholder.join('');
    //Pass letter to checkIncorrect letter function
    checkIncorrect(letter);
  } else {
    if (gameRunning === false){
      alert("No Game");
    } else{
      alert('you tried this letter');
    }
  }
}

//check incorrect letter
function checkIncorrect(letter) {
  //check to see if Letter is incorrect
  if(chosenWordplaceholder.indexOf(letter.toLowerCase()) === -1 && chosenWordplaceholder.indexOf(letter.toUpperCase()) === -1 ){
    console.log('wrong letter?')
    //Decrement guesses
    guessesLeft --;
    //add wrong letter to wrong letter bank
    wrongLetterbank.push(letter);
    $guessedLetters.textContent = wrongLetterbank.join(' ');
    $guessesLeft.textContent = guessesLeft
  }
  checkLoss();
}

//Check Loss
function checkLoss() {
  if( guessesLeft === 0){
    console.log('loss')
    losses++;
    gameRunning = false;
    $losses.textContent = losses;
    $underScores.textContent = chosenWord;
    resetGame();
  }
  checkWin();
}

//Check for Win
function checkWin() {
  if (chosenWord.toLowerCase() === chosenWordplaceholder.join('').toLowerCase()){
    console.log('wins')
    wins++;
    gameRunning = false;
    $wins.textContent = wins;
  }
 
}

function resetGame() {
  chosenLetterbank = [];
  wrongLetterbank = [];
  guessedLetters = [];
  guessesLeft = 9
}


// Add onkeyup event to trigger guess (letter) function
document.onkeyup = function (event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    guesses(event.key);
        // console.log(event.keyCode, 'event key')
  }
}


//Add event listener to new game button
$newGame.addEventListener('click', newGame);

