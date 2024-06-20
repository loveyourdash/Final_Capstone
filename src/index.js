const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } else {
    return 1000;
  }
}

function chooseHole(holes) {
  let index = randomInteger(0, holes.length - 1);
  let hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    clearScore(); // Reset the score to 0 when game is over
    return stopGame();
  }
}

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  if (time < 0) {
    gameOver();
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function whack(event) {
  updateScore();
}

function setEventListeners(moles) {
  moles.forEach(mole => mole.addEventListener('click', whack));
}

function setDuration(duration) {
  time = duration;
}

function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

function startGame() {
  setDuration(10); // Set game duration to 10 seconds
  startTimer(); // Start the timer
  showUp(); // Show the mole
  return "game started"; // Return confirmation message
}

// Attach event listeners to moles
setEventListeners(moles);

// Event listener for the start button
startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
