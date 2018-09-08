window.addEventListener('load', init);

// available levels
const levels = {
    easy: 5,
    medium: 3, 
    hard: 2 
}

// To channge levels
const currentLevel = levels.easy;

// Globals
let time = currentLevel; // seconds
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];

// Inititlize Game
function init(){
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);   
}

// Start Match
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    if(score === -1){
        scoreDisplay.innerHTML = '0';
    } else {
        scoreDisplay.innerHTML = score;
    }
    
}

// Match current word to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!';
        return true;
    } else {
        return false;
    }
}

// Pick a random word and show it
function showWord(words){
    // generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Ouput a random word
    currentWord.innerHTML = words[randIndex];
}

// Count timer
function countdown(){
    // Make sure time is not run out
    if(time > 0){
        // decrease the time (decrement)
        time--;
    } else if(time === 0){
        // game is over 
        isPlaying = false;
    } 

    // Show time 
    timeDisplay.innerHTML = time;
}

// Check playing status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!!!'
        score = -1;
    }
}