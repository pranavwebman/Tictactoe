let gameBoard = Array(9).fill('');
let playerScore = 0;
let computerScore = 0;

function renderBoard() {
  const gameContainer = document.getElementById('game');
  gameContainer.innerHTML = '';
  gameBoard.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = val;
    cell.onclick = () => playerMove(i);
    gameContainer.appendChild(cell);
  });
}

function playerMove(index) {
  if (gameBoard[index] === '') {
    gameBoard[index] = '❌';
    if (checkWin('❌')) {
      playerScore++;
      alert('You win!');
      updateScore();
      resetGame();
      return;
    }
    if (!gameBoard.includes('')) {
      alert('Draw!');
      resetGame();
      return;
    }
    computerMove();
  }
}

function computerMove() {
  let emptyIndices = gameBoard.map((val, i) => val === '' ? i : null).filter(i => i !== null);
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  gameBoard[move] = '⭕';
  if (checkWin('⭕')) {
    computerScore++;
    alert('Computer wins!');
    updateScore();
    resetGame();
    return;
  }
  if (!gameBoard.includes('')) {
    alert('Draw!');
    resetGame();
    return;
  }
  renderBoard();
}

function checkWin(player) {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winConditions.some(comb => comb.every(i => gameBoard[i] === player));
}

function updateScore() {
  document.getElementById('playerScore').innerText = playerScore;
  document.getElementById('computerScore').innerText = computerScore;
}

function resetGame() {
  gameBoard = Array(9).fill('');
  renderBoard();
}

window.addEventListener('load', () => {
  renderBoard();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
});
