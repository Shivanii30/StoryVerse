// script.js

const road = document.getElementById('road');
const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const startButton = document.getElementById('start-button');
const gameOverText = document.getElementById('game-over');
const scoreDisplay = document.getElementById('score');
const crashSound = document.getElementById('crash-sound');
const backgroundMusic = document.getElementById('background-music');

let carPosition = 110; // Initial position of the car
let obstaclePosition = 0; // Initial position of the obstacle
let score = 0; // Initial score
let gameActive = false;
let gameSpeed = 5; // Speed of the game

function moveCar(event) {
  if (gameActive) {
    switch (event.key) {
      case 'ArrowLeft':
        if (carPosition > 60) carPosition -= 10; // Move car left
        break;
      case 'ArrowRight':
        if (carPosition < 160) carPosition += 10; // Move car right
        break;
    }
    car.style.left = carPosition + 'px'; // Update car position
  }
}

function moveObstacle() {
  if (gameActive) {
    obstaclePosition += gameSpeed; // Move obstacle downwards
    if (obstaclePosition >= 500) {
      obstaclePosition = -50; // Reset obstacle position when it reaches the bottom
      score++; // Increment score when obstacle passes the car
      scoreDisplay.textContent = 'Score: ' + score;
    }
    obstacle.style.top = obstaclePosition + 'px'; // Update obstacle position

    // Check for collision between car and obstacle
    if (carPosition + 80 >= obstacle.offsetLeft && carPosition <= obstacle.offsetLeft + 50 && obstaclePosition >= 400) {
      endGame();
    }
  }
}

function startGame() {
  if (!gameActive) {
    gameActive = true;
    startButton.style.display = 'none';
    gameOverText.style.display = 'none';
    backgroundMusic.play(); // Start background music
    window.addEventListener('keydown', moveCar); // Listen for arrow key events
    setInterval(moveObstacle, 50); // Move obstacle every 50 milliseconds
  }
}

function endGame() {
  gameActive = false;
  gameOverText.style.display = 'block';
  crashSound.play(); // Play crash sound effect
  backgroundMusic.pause(); // Pause background music
}

startButton.addEventListener('click', startGame);
