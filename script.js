// script.js
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let gameBoard = Array(9).fill(null); // Array to track game state
let currentPlayer = 'X'; // Start with Player X
let isGameActive = true; // Game state

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Create the board dynamically
function createBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) {
            cellElement.textContent = cell;
            cellElement.classList.add('taken');
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

// Handle cell clicks
function handleCellClick(index) {
    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
    createBoard();
}

// Update the game message
function updateMessage() {
    if (isGameActive) {
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for a winner
function checkWinner() {
    let winner = null;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winner = gameBoard[a];
        }
    });

    if (winner) {
        message.textContent = `Player ${winner} Wins!`;
        isGameActive = false;
    } else if (!gameBoard.includes(null)) {
        message.textContent = 'It\'s a Tie!';
        isGameActive = false;
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    isGameActive = true;
    updateMessage();
    createBoard();
});

// Initialize the game
createBoard();
