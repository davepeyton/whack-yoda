const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const yodas = document.querySelectorAll('.yoda');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const cursor = document.querySelector('.cursor img');

window.addEventListener('mousemove', (e) => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
console.log(e);
});

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
    scoreBoard.getElementsByClassName.display = 'block;'
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, 10);
}

let startCountdown = setInterval(function() {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
        countdown = 0;
        clearInterval(startCountdown);
        countdownBoard.textContent = 'Time is Up! Try Again';
    }
}, 1000);

startButton.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url("/..yoda2.png")';
    setTimeout(() => {
        this.style.backgroundImage = 'url("..yoda1.png")';
    }, 800);
}
yodas.forEach(yoda => yoda.addEventListener('click', whack));