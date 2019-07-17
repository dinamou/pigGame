
/*
Your 3 Challenges
Change the game to follow these rules:

1. A player loses Entire score when he rolls two 6 in a row. After that then it's the next player's turn. (HINT: Always save the previous dice roll in a seperate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (HINT: you can read that value with .value property in JavaScript. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  
  if (gamePlaying) {
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    document.querySelector('.dice-1').style.display = 'block';
    document.querySelector('.dice-2').style.display = 'block';
    document.querySelector('.dice-1').src = 'dice-' + dice1 + '.png';
    document.querySelector('.dice-2').src = 'dice-' + dice2 + '.png';


    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 === 6 && dice2 === 6) {
      //4. Lose Entire Score if the player roll two 6 in a row
      newRoundScore = 0;
      document.querySelector('#score-' + activePlayer).textContent = newRoundScore;
      scores[activePlayer] = newRoundScore;
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += (dice1 + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('#winning-score').value;
    var winningScore;
    // Undefined, 0, null, or '' are COERCED to false
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
  
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// Initialization function
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
  document.querySelector('#winning-score').value = '100';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
