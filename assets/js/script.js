const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const yodas = document.querySelectorAll('.yoda');
const countdownBoard = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 10000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(hole);
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1400 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}

popOut();

function startGame() {
    countdown = 10;
    scoreBoard.textContent = 0;
    countdownBoard.textContent = countdown;
    timeUp = false;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, 10);
}