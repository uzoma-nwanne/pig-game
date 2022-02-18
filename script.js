'use strict';

//initialize variables to hold elements
const diceEl = document.querySelector('.dice');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

let scores , currentScore, activePlayer, playing;


//function to initialize elements and values to default values
const init = function(){ 
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    diceEl.classList.add('hidden');

}

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');
}

init(); //initiate to default values

btnRoll.addEventListener('click', function(){
    if(playing){
        diceEl.classList.remove('hidden');
        const dice = Math.trunc(Math.random() * 6) + 1; //get an uumber between 1 and 6
        //update the dice
        diceEl.src = `dice-${dice}.png`;
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            scores[activePlayer] += dice;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        }else{
            switchPlayer();
        }
    }  
   
})

btnHold.addEventListener('click', function(){
    if(playing){
            // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
})


//Reset values when new button is clicked
btnNew.addEventListener('click', init)//


