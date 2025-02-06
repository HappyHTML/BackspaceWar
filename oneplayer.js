const gameBox = document.getElementById('game-box');
const statusElement = document.getElementById('status');
const scoreElement = document.getElementById('score');
const scoreboardElement = document.getElementById('scoreboard');
const resetButton = document.getElementById('reset-button');

const MAX_LETTERS = 92;
const HALFWAY = 46;
let currentLetters = HALFWAY;
let gameActive = false;
let botInterval;
let botSpeed = 500; // Starting speed in milliseconds
let round = 1;
let playerScore = 0;
let botScore = 0;
let lastBackspaceTime = 0;
const BACKSPACE_DELAY = 100; // Minimum delay between backspace presses in milliseconds

function initializeGame() {
    currentLetters = HALFWAY;
    gameBox.value = 's'.repeat(HALFWAY);
    statusElement.textContent = "Game ready! Press any key to start.";
    scoreElement.textContent = `Round: ${round}`;
    updateScoreboard();
    gameActive = false;
    clearInterval(botInterval);
}

function startRound() {
    currentLetters = HALFWAY;
    gameBox.value = 's'.repeat(HALFWAY);
    gameActive = true;
    statusElement.textContent = "Game in progress!";
    botInterval = setInterval(botAction, botSpeed);
}

function botAction() {
    if (currentLetters < MAX_LETTERS) {
        currentLetters++;
        gameBox.value += 's';
        checkWin();
    }
}

function updateScoreboard() {
    scoreboardElement.textContent = `Player: ${playerScore} | Bot: ${botScore}`;
}

initializeGame();

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (!gameActive) {
        startRound();
    } else if (event.key === 'Backspace' && currentLetters > 0) {
        const currentTime = Date.now();
        if (currentTime - lastBackspaceTime >= BACKSPACE_DELAY) {
            currentLetters--;
            gameBox.value = gameBox.value.slice(0, -1);
            checkWin();
            lastBackspaceTime = currentTime;
        }
    }
});

function checkWin() {
    if (currentLetters === 0) {
        statusElement.textContent = 'You win! Press any key to start next round.';
        gameActive = false;
        clearInterval(botInterval);
        playerScore++;
        round++;
        botSpeed = Math.max(50, botSpeed - 50); // Speed up bot, minimum 50ms
        scoreElement.textContent = `Round: ${round}`;
        updateScoreboard();
    } else if (currentLetters === MAX_LETTERS) {
        statusElement.textContent = 'Bot wins! Game Over. Press any key to restart.';
        gameActive = false;
        clearInterval(botInterval);
        botScore++;
        round = 1;
        botSpeed = 500; // Reset bot speed
        scoreElement.textContent = `Round: ${round}`;
        updateScoreboard();
    }
}

resetButton.addEventListener('click', () => {
    round = 1;
    playerScore = 0;
    botScore = 0;
    botSpeed = 500;
    initializeGame();
});