const gameBox = document.getElementById('game-box');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

const MAX_LETTERS = 92;
const HALFWAY = 46;
let currentLetters = HALFWAY;
let gameActive = true;

function initializeGame() {
    currentLetters = HALFWAY;
    gameBox.value = 's'.repeat(HALFWAY);
    statusElement.textContent = "Game ready! Press 'S' or 'Backspace' to play.";
    gameActive = true;
}

initializeGame();

document.addEventListener('keydown', (event) => {
    if (!gameActive) return;
    
    if (event.key.toLowerCase() === 's' && currentLetters < MAX_LETTERS) {
        event.preventDefault();
        currentLetters++;
        gameBox.value += 's';
        checkWin();
    } else if (event.key === 'Backspace' && currentLetters > 0) {
        event.preventDefault();
        currentLetters--;
        gameBox.value = gameBox.value.slice(0, -1);
        checkWin();
    }
});

function checkWin() {
    if (currentLetters === MAX_LETTERS) {
        statusElement.textContent = 'Player 1 wins!';
        gameActive = false;
    } else if (currentLetters === 0) {
        statusElement.textContent = 'Player 2 wins!';
        gameActive = false;
    } else {
        statusElement.textContent = `Current letters: ${currentLetters}`;
    }
}

resetButton.addEventListener('click', initializeGame);