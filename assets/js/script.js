const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const yodas = document.querySelectorAll('.yoda');
const countdownBoard = document.querySelector('.countdown');
const startBtn = document.querySelector('.startBtn');
const cursor = document.querySelector('.cursor img');

window.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;
    

    window.addEventListener('click',() => {
        cursor.style.animation = 'hit 0.1s ease';
        setTimeout(() =>{
            cursor.style.removeProperty('animation');
        }, 100);
    });
});

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function yodaPopUp() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) yodaPopUp();
    }, time);
}

function startGame() {
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    yodaPopUp();
    setTimeout(function() {
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
countdown -= 1;
countdownBoard.textContent = countdown;
if (countdown < 0) {
    countdown = 0;
    clearInterval(startCountdown);
    countdownBoard.textContent = 'Your time is UP!!';
}
    }, 1000);
}
startBtn.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url("assets/images/yoda2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("assets/images/yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 600);
    scoreBoard.textContent =score;
}
yodas.forEach(yoda => yoda.addEventListener('click', whack));

