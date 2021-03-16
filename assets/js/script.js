const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const yodas = document.querySelectorAll('.yoda');
const countdownBoard = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 10000;
let score = 0;
let countdown;