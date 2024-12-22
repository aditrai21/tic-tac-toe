const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const status = document.getElementById('status');

let currentPlayer = 'X'; // Player 'X' starts first
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', '']; // Empty board

// Winning combinations (index positions of the cells)
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  // Ignore if cell is already filled or the game is over
  if (boardState[clickedIndex] !== '' || !gameActive) {
    return;
  }

  // Update the board state and the UI
  boardState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Check for a winner
  checkWinner();

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if there's a winner
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      status.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  // Check for a draw
  if (!boardState.includes('')) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

// Restart the game
function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Restart the game when button is clicked
restartButton.addEventListener('click', restartGame);
