const gameGrid = document.querySelector('.game-grid');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
const whackSound = document.getElementById('whack-sound');

let score = 0;
let moleInterval;
let gameOver = true;

function createMoleHole() {
  const moleHole = document.createElement('div');
  moleHole.classList.add('mole-hole');
  const mole = document.createElement('div');
  mole.classList.add('mole');
  moleHole.appendChild(mole);
  moleHole.addEventListener('click', whackMole);
  return moleHole;
}

function randomMoleHole() {
  const holes = document.querySelectorAll('.mole-hole');
  const randomIndex = Math.floor(Math.random() * holes.length);
  return holes[randomIndex];
}

function popUpMole() {
  const hole = randomMoleHole();
  const mole = hole.querySelector('.mole');
  mole.style.display = 'block';
  moleInterval = setTimeout(() => {
    mole.style.display = 'none';
    if (!gameOver) popUpMole();
  }, 1000);
}

function whackMole() {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
    whackSound.currentTime = 0;
    whackSound.play();
    this.querySelector('.mole').style.display = 'none';
  }
}

function startGame() {
  if (gameOver) {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = score;
    for (let i = 0; i < 9; i++) {
      const moleHole = createMoleHole();
      gameGrid.appendChild(moleHole);
    }
    popUpMole();
    setTimeout(() => {
      gameOver = true;
      alert('Game over! Your score: ' + score);
      gameGrid.innerHTML = '';
    }, 15000);
  }
}

startButton.addEventListener('click', startGame);
