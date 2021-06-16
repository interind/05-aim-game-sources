const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.createElement('div');


const colors = [
  '#fff',
  '#00f',
  '#0f0',
  '#6fc',
  '#cff',
  '#c69',
  '#6f6',
  '#c00'
];
let time = 0;
let score = 0;

start.addEventListener('mousedown', (evt) => {
  evt.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('time-btn')) {
    time = parseInt(evt.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('circle')) {
    evt.target.remove();
    score++;
    createRandomCircle();
  }
});

function startGame() {
  if (time > 0) {
    board.classList.add('board');
    screens[2].append(board);
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
  }
}

function decreaseTime() {
  let current = --time;
  if (current < 0) {
    finishGame();
    clearInterval();
  } else {
    setTime(current);
    clearInterval();
  }
}

function setTime(value) {
  timeEl.innerHTML = (value < 10) ? `00:0${value}` : `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.background = colors[getRandomNumber(0, colors.length)];
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  board.append(circle);
}
