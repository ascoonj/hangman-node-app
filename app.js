var inquirer = require("inquirer");
var Word = require("./word");


var wordList = [
    'archipelago', 'coconut', 'tropical', 'hurricane', 'reggae', 'caribbean', 'fishing', 'relaxation', 'peninsula', 'islander', 'palms', 'oasis', 'hammock', 'tranquility', 'steelpan', 'shoreline', 'sunglasses', 'carnival', 'vacation', 'tourist', 'rumpunch', 'sunshine', 'bachata', 'paradise', 'cricket', 'seaside', 'rainforest', 'vegetation', 'snorkeling', 'yacht', 'snorkeling', 'cocktails', 'catamaran', 'sandcastle', 'surfboard', 'mangrove', 'nutmeg', 'chutney', 'calypso', 'curry', 'crab', 'flora', 'fauna', 'ocean'
];
var guessingWord;
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var gameRound = 0;
var guessedLetters = [];





// newRound();

//console.log("Letters of word", guessingWord.lettersOfWord);
//console.log

function startGame() {
    guessingWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
    guessedLetters.length = 0;

    console.log("Welcome to my Command Line Hangman Gamep. You'll guess things related to island life!");

    inquirer.prompt([{
        type: "confirm",
        name: "start",
        message: "Wanna give it a go? ",
        default: true
    }]).then(function (inqResponse) {
        //After receiving the user response
        //execute game if the user responds affirmatively.
        if (inqResponse.start === true) {
            console.log("Awesome! You'll have 10 guesses! \n")
            guessingWord.populateLetters();
            guessingWord.displayWord();
            runGame(guessingWord);
            //Otherwise, provide an exit message.
        } else {
            console.log("============================================================");
            console.log("Okay, maybe next time!");
        }
    });
}

function runGame(wordInPlay) {
    //  wordInPlay.populateLetters();
    console.log("letters already guessed: ", guessedLetters.join(", "));
    console.log(`You have ${guessesLeft} tries remaining`);
    console.log(wordInPlay.displayWord());

    inquirer.prompt([{
        type: "input",
        name: "guess",
        message: "Guess a letter: ",
        validate: function (keyPress) {

            //Check whether the user entered a letter
            if (keyPress.match(/^[A-Za-z]+$/)) {
                if (guessedLetters.indexOf(keyPress.toLowerCase()) !== -1) {
                    return "You already guessed that; try again"
                } else {
                    guessedLetters.push(keyPress.toLocaleLowerCase());
                    //guessesLeft--;
                    return true;
                }
            } else {
                return "That was an invalid charater; only letters allowed here";

            }
        }
    }]).then(function (inqResponse) {

            guess = inqResponse.guess;
            //Pass the user-provided screen-name to the function containing the API call
            wordInPlay.checkGuessedLetter(guess.toLowerCase());
            wordInPlay.checkIfWordSolved();
            console.log("guess.show: ", guess.show);
            if (wordInPlay.solved) {
                console.log("Awesome job! You got it!");
                playAgain();
            } else if (guessesLeft === 0) {
                console.log("Uh oh... you've run out of chances :-(");
                playAgain();
            } else if (!guess.show) {
                guessesLeft--;
                // console.log(wordInPlay.displayWord());
            }
            // console.log(wordInPlay.displayWord());

            runGame(wordInPlay);

        });


    }

        // if (wordInPlay.solved) {
        //     console.log("Awesome job! You won!");
        // } else if (guessesLeft === 0) {
        //     console.log("Uh oh... you've run out of chances :-(");
        //     playAgain();
        // } else {
        //     runGame(wordInPlay);
        // }

function playAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "anotherRound",
        message: "Wanna play again?",
        default: true

    }]).then(function (inqResponse) {
        //After the response is returned, if the user responds affirmatively, re-display the main menu of options
        if (inqResponse.anotherRound) {
            newRound();
        } else {
            //Otherwise, display a friendly exit message.
            console.log("============================================================");
            console.log("Thanks for trying Hangman! Come back soon.");
        }
    });
}


function newRound() {
    guessedLetters.length = 0;
    guessesLeft = 10;
    guessingWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
    guessingWord.populateLetters();
    runGame(guessingWord);
}


startGame();