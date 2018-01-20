var Letter = require("./letter");

var Word = function (word) {

    this.word = word;
    this.lettersOfWord = [];
    this.solved = false;

    this.populateLetters = function () {
        for(var i = 0; i < this.word.length; i++) {
			this.lettersOfWord.push(new Letter(this.word[i]));
		}

    };
};

Word.prototype.checkGuessedLetter = function(userGuess) {
    this.lettersOfWord.forEach(function (element) {
        //console.log(element.letter);
        if (element.letter === userGuess) {
            element.show = true;
        }
    })
};

Word.prototype.checkIfWordSolved = function() {

    function letterShowing(eachLetter) {
        return eachLetter.show;
        console.log(eachLetter.show);
    }

    this.solved === this.lettersOfWord.every(letterShowing);
   
    return this.solved;
       
};

Word.prototype.displayWord = function() {
    var wordString = "";

    this.lettersOfWord.forEach(function (element) {
        wordString += this.element.displayLetter();
    });

    return wordString;
};


// function isBelowThreshold(currentValue) {
//     return currentValue < 40;
//   }
  
//   var array1 = [1, 30, 39, 29, 10, 13];
  
//   console.log(array1.every(isBelowThreshold));
  // expected output: true


// Letter.prototype.allLettersGuessed = function() {


// }

var myWord = new Word("flower");

console.log(myWord.lettersOfWord);

myWord.populateLetters();

//console.log(myWord.lettersOfWord);

myWord.checkGuessedLetter("f");
//myWord.checkGuessedLetter("w");
//myWord.checkGuessedLetter("o");
myWord.checkGuessedLetter("e");
myWord.checkGuessedLetter("r");
myWord.checkGuessedLetter("l");

console.log(myWord.lettersOfWord);

myWord.checkIfWordSolved();
console.log(myWord.solved);
myWord.displayWord();
// let myLetter = new Letter ("t");
// console.log("my letter: " + myLetter.displayLetter());
// myLetter.inWord = true;
// console.log("letter in word: " + myLetter.displayLetter());