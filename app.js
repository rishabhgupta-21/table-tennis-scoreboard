const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const selectedWinningScore = document.querySelector('#winningScore');

let isGameOver = false;
let winningScore = null;
let p1Score = 0;
let p2Score = 0;

console.dir(selectedWinningScore);

// Function to Reset Game
const resetGame = function () {
    isGameOver = false;
    selectedWinningScore.removeAttribute('disabled', '');
    selectedWinningScore.selectedIndex = 0;
    p1Score = 0;
    p2Score = 0;
    p1Display.innerText = '0';
    p2Display.innerText = '0';
    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');
    p1Button.setAttribute('disabled', '');
    p2Button.setAttribute('disabled', '');
}

// Function that is implemented when Game is Over
const gameOver = function (winner, loser) {
    isGameOver = true;

    if (winner === 'p1') {
        p1Display.classList.add('has-text-success');
        p2Display.classList.add('has-text-danger');
    }
    else {
        p2Display.classList.add('has-text-success');
        p1Display.classList.add('has-text-danger');
    }

    p1Button.setAttribute('disabled', '');
    p2Button.setAttribute('disabled', '');
}

// Changing the Selected Option
selectedWinningScore.addEventListener('change', () => {
    if (selectedWinningScore.selectedIndex) {
        // Set Winning Score
        winningScore = parseInt(selectedWinningScore.selectedOptions[0].textContent);

        // Enable Buttons
        p1Button.removeAttribute('disabled', '');
        p2Button.removeAttribute('disabled', '');
    }
})

// Clicking on Player 1 Button
p1Button.addEventListener('click', (e) => {
    // Disable Changing of Winning Score as soon as game starts
    selectedWinningScore.setAttribute('disabled', '');

    // selectedWinningScore.selectedOptions[0].textContent

    if (!isGameOver) {
        // Increment value
        p1Score++;
        p1Display.textContent = p1Score;
    }

    if (p1Score === winningScore) {
        gameOver('p1', 'p2');
    }
})

// Clicking on Player 2 Button
p2Button.addEventListener('click', (e) => {
    selectedWinningScore.setAttribute('disabled', '');

    if (!isGameOver) {
        // Increment value
        p2Score++;
        p2Display.textContent = p2Score;
    }

    if (p2Score === winningScore) {
        gameOver('p2', 'p1');
    }
})

// Clicking on Reset Button
resetButton.addEventListener('click', resetGame)