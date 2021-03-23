const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const yodas = document.querySelectorAll('.yoda');
const countdownBoard = document.querySelector('.countdown');
const startBtn = document.querySelector('.startBtn');
const cursor = document.querySelector('.cursor img');

window.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;
    cursor.nodeName;

    window.addEventListener('click',() => {
        cursor.style.animation = 'hit 0.1s ease';
    });
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
    const time = Math.random() * 1200 + 200;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}

function startGame() {
    countdown = 20;
    scoreBoard.textContent = 0;
    scoreBoard.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, 20);

    let startCountdown = setInterval(function(){
countdown -= 1;
countdownBoard.textContent = countdown;
if (countdown < 0) {
    countdown = 0;
    clearInterval(startCountdown);
    countdownBoard.textContent = 'Your time is UP!!';
}
    }, 20000);
}
startBtn.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url("assets/images/yoda2.png")';
    setTimeout(function(){}, 800);
}
yodas.forEach(yoda => yoda.addEventListener('click', whack));

