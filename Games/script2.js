const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

const X_CLASS = 'x';
const O_CLASS = 'o';
const CLICK_SOUND = new Audio('tic-tac-81751.mp3'); // Replace 'click_sound.mp3' with the path to your audio file

let xIsNext = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell'));

  if (gameBoard[cellIndex] !== '' || !gameActive) return;

  placeMark(cell, cellIndex);
  playSound(CLICK_SOUND); // Play sound when a player makes a move
  if (checkWin(X_CLASS) || checkWin(O_CLASS)) {
    gameActive = false;
    endGame(checkWin(X_CLASS) ? 'X wins!' : 'O wins!');
  } else if (isDraw()) {
    gameActive = false;
    endGame("It's a draw!");
  } else {
    swapTurns();
    setNextTurnMessage();
  }
}

function placeMark(cell, cellIndex) {
  const currentClass = xIsNext ? X_CLASS : O_CLASS;
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
  gameBoard[cellIndex] = currentClass;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}



function swapTurns() {
  xIsNext = !xIsNext;
}

function setNextTurnMessage() {
  status.innerText = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
}

function checkWin(player) {
  const winPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPositions.some(position => {
    return position.every(index => {
      return gameBoard[index] === player;
    });
  });
}

function isDraw() {
  return gameBoard.every(cell => {
    return cell !== '';
  });
}

function endGame(message) {
  status.innerText = message;
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  xIsNext = true;
  gameActive = true;
  board.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.innerText = '';
  });
  setNextTurnMessage();
}

board.addEventListener('click', handleClick);
restartButton.addEventListener('click', restartGame);
