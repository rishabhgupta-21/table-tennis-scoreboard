// Variables
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#winningScore');
let isGameOver = false;
let winningScore = null;
let deuce = false;

// Objects for both Players
const p1 = {
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    score: 0
}

const p2 = {
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    score: 0
}

// HELPER - Function to Reset Game
const resetGame = function () {
    isGameOver = false;
    deuce = false;
    winningScoreSelect.removeAttribute('disabled', '');
    winningScoreSelect.selectedIndex = 0;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.innerText = '0';
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.setAttribute('disabled', '');
    }
}

// HELPER - Function that is called when Game is Over
const gameOver = function (winner, loser) {
    isGameOver = true;

    winner.display.classList.add('has-text-success');
    loser.display.classList.add('has-text-danger');

    // Disabled player buttons so that the score CANNOT be increased now!
    winner.button.setAttribute('disabled', '');
    loser.button.setAttribute('disabled', '');
}

// HELPER - Function that is called when Game is Over
const deucePoint = function () {
    if (p1.score === winningScore && p2.score === winningScore) {
        // Reduce both scores (back to Deuce)
        p1.score--;
        p2.score--;
        // Display Current Scores again
        p1.display.textContent = p1.score;
        p2.display.textContent = p2.score;
    }
    else if (p1.score === winningScore && p2.score === winningScore - 1) {
        // Display advantage Strings
        p1.display.textContent = 'ADV';
        p2.display.textContent = '-';
    }
    else if (p1.score === winningScore - 1 && p2.score === winningScore) {
        // Display advantage Strings
        p1.display.textContent = '-';
        p2.display.textContent = 'ADV';
    }

    // Winning Scenario
    else if (p1.score === winningScore + 1) {
        // Display Current Scores again
        p1.display.textContent = p1.score;
        p2.display.textContent = p2.score;
        gameOver(p1, p2);
    }
    // Winning Scenario
    else if (p2.score === winningScore + 1) {
        // Display Current Scores again
        p1.display.textContent = p1.score;
        p2.display.textContent = p2.score;
        gameOver(p2, p1);
    }
}

// HELPER - Function that is called when a Player Button is clicked
const updateScore = function (player) {
    // Disable Changing of Winning Score as soon as game starts
    winningScoreSelect.setAttribute('disabled', '');

    // Increment score
    player.score++;
    player.display.textContent = player.score;

    // DEUCE - check
    if (deuce) {
        deucePoint();
    }
    else {
        deuce = (p1.score === winningScore - 1) && (p2.score === winningScore - 1);

        // Game Over if a player wins - check if game is over
        if (player.score === winningScore) {
            if (player === p1)
                gameOver(p1, p2);
            else
                gameOver(p2, p1);
        }
    }
}

// Changing the Selected Option
winningScoreSelect.addEventListener('change', () => {
    // If it is changed to anything other than the default option
    if (winningScoreSelect.selectedIndex) {
        // Set Winning Score
        winningScore = parseInt(winningScoreSelect.selectedOptions[0].textContent);

        // Enable Buttons
        p1.button.removeAttribute('disabled', '');
        p2.button.removeAttribute('disabled', '');
    }
})

// Clicking on Player 1 Button
p1.button.addEventListener('click', (e) => {
    if (!isGameOver)
        updateScore(p1);
})

// Clicking on Player 2 Button
p2Button.addEventListener('click', (e) => {
    if (!isGameOver)
        updateScore(p2);
})

// Clicking on Reset Button
resetButton.addEventListener('click', resetGame)