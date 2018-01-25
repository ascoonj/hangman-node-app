// Require packages and necessary files

var inquirer = require("inquirer");
var Word = require("./word");

// Create and array of words from which to select a random word for game play
var wordList = [
    'archipelago', 'coconut', 'tropical', 'hurricane', 'reggae', 'caribbean', 'fishing', 'relaxation', 'peninsula', 'islander', 'palms', 'oasis', 'hammock', 'tranquility', 'steelpan', 'shoreline', 'sunglasses', 'carnival', 'vacation', 'tourist', 'rumpunch', 'sunshine', 'bachata', 'paradise', 'cricket', 'seaside', 'rainforest', 'vegetation', 'snorkeling', 'yacht', 'snorkeling', 'cocktails', 'catamaran', 'sandcastle', 'surfboard', 'mangrove', 'nutmeg', 'chutney', 'calypso', 'curry', 'crab', 'flora', 'fauna', 'ocean'
];

// Declare global variables, setting intial values where appropriate
var guessingWord;
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var gameRound = 0;
var guessedLetters = [];

//Testing...
//console.log("Letters of word", guessingWord.lettersOfWord);


// Function to get the user interaction started, and select a word for guessing
function startGame() {
    // get a random word from the array of words, and create a new word object
    guessingWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);

    // and empty the guessedLetters array at the start of every new game
    guessedLetters.length = 0;


    // Short introdutory message user, and request of input to confirm that user wants to play
    console.log("Welcome to my Command Line Hangman Game. You'll guess things related to island life!");

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
            // call the function to run the game, passing it the word object as a parameter
            runGame(guessingWord);
            //Otherwise, provide an exit message.
        } else {
            console.log("============================================================");
            console.log("Okay, maybe next time!");
        }
    });
}

// Most of the game logic is in here. Accepts the user guess, evaluates whether the letter is in the word,
// whether the word is solved and whether the user has run out of tries.
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

            // Check whether the user entered a letter and only a letter,
            // and that letter has not yet been guessed
            if (keyPress.match(/^[A-Za-z]+$/)) {
                if (guessedLetters.indexOf(keyPress.toLowerCase()) !== -1) {
                    return "You already guessed that; try again"
                
                } 
                else if (keyPress.length > 1) {
                        return "Only one letter at a time"
                }

                else {
                    guessedLetters.push(keyPress.toLowerCase());
                    //guessesLeft--;
                    return true;
                }
            } else {
                return "That was an invalid character; only letters allowed here";

            }
        }
    }]).then(function (inqResponse) {

        var guess = inqResponse.guess;

        // call the Word object prototype functions on the current word in play to assess the status of game
        wordInPlay.checkGuessedLetter(guess.toLowerCase());
        wordInPlay.checkIfWordSolved();
        var inWord = wordInPlay.checkGuessedLetter(guess.toLowerCase()); // should return true or false
        //console.log("inWord: ", inWord); Still returns undefined, figure out why!!
        //console.log("guess.show: ", guess.show);

        // If the current guessing word is solved
        if (wordInPlay.solved) {
            console.log(wordInPlay.displayWord());      // display the solved word
            console.log("Awesome job! You got it!");    // congratulate user
            playAgain();                                // run function to give user the option to play again

            // if there are no guesses left
        } else if (guessesLeft === 0) {
            console.log("Uh oh... you've run out of chances :-(")    // display message to user
            console.log("The word was: ", wordInPlay.word);          // and tell them what the answer was
            playAgain();                                             // run function to give user the option to play again

            // if the current guess is in the word, call this fuction again, to prompt the user for another guess without decrementing the number of guesses left
        } else if (inWord) {            // condition never evaluates to true since inWord still returning undefined!!
            runGame(wordInPlay);        

            // this should be the case in which the user guessed wrong
        } else {
            guessesLeft--;          // decrement the # of tries legt
            runGame(wordInPlay);    // run this function again to prompt the user for another guess
        }
    });


}

// Function to give play the option to play again, wait for user input, and then start a new round if necessary
function playAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "anotherRound",
        message: "Wanna play again?",
        default: true

    }]).then(function (inqResponse) {
        //After the response is returned, if the user responds affirmatively, run function to reset game variables, and start a new game.
        if (inqResponse.anotherRound) {
            newRound();
        } else {
            //Otherwise, display a friendly exit message.
            console.log("============================================================");
            console.log("Thanks for trying Hangman! Come back soon.");
        }
    });
}

// Reset game variables, selects a new word and creates its Word object, and calls the function to run the game, passing it the new Word object
function newRound() {
    guessedLetters.length = 0;
    guessesLeft = 10;
    guessingWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
    guessingWord.populateLetters();
    runGame(guessingWord);
}

startGame();