const prompt = require('prompt-sync')({sigint: true});

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const MAX_ATTEMPTS = 10;

let secretNumber;
let attempts;
let isPlaying;

function initGame() {
    secretNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    attempts = 0;
    isPlaying = true;
    console.log(`Welcome to Number Guesser!`);
    console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
    console.log(`You have ${MAX_ATTEMPTS} attempts to guess it.\n`);
}

function playGame() {
    initGame();

    while (isPlaying && attempts < MAX_ATTEMPTS) {
        const guess = parseInt(prompt(`Attempt #${attempts+1}: Enter your guess: `));
        attempts++;

        if (isNaN(guess)) {
            console.log('Please enter a valid number.');
            attempts--;
        } else if (guess === secretNumber) {
            console.log(`Congratulations! You've guessed the number! It was ${secretNumber}!`);
            isPlaying = false;
        } else if (guess < secretNumber) {
            console.log('Too low!');
        } else {
            console.log('Too high!');
        }

        if (attempts === MAX_ATTEMPTS && isPlaying) {
            console.log(`Game over! You've used all ${MAX_ATTEMPTS} attempts!`);
            console.log(`The number was ${secretNumber}.`);
            isPlaying = false;
        }
    }

    const playAgain = prompt('Play again? (y/n): ').toLowerCase()
    if (playAgain === 'y') {
        playGame();
    } else {
        console.log('Thanks for playing!');
    }
}

playGame();