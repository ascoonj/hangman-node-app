var Letter = require("./letter");

var Word = function (word) {

    this.word = word;
    this.lettersOfWord = [];
    this.solved = false;

    // this.populateLetters = function () {
    //     for (var i = 0; i < this.word.length; i++) {
    //         this.lettersOfWord.push(new Letter(this.word[i]));
    //     }

    // };
};

Word.prototype.populateLetters = function () {
    for (var i = 0; i < this.word.length; i++) {
        this.lettersOfWord.push(new Letter(this.word[i]));
    }

}

Word.prototype.checkGuessedLetter = function (userGuess) {
    this.lettersOfWord.forEach((element) => {
        //console.log(element.letter);
        if (element.letter === userGuess) {
            element.show = true;
            return true;
        } else {
            return false;
        }
    });
};

Word.prototype.checkIfWordSolved = function () {
    // var allLettersGuessed = false;
    // this.lettersOfWord.forEach(element => {
    //     if (element.show) {
    //         allLettersGuessed = true;
    //     } else {
    //         allLettersGuessed = false
    //     }
    // })

    // if (allLettersGuessed) {
    //     this.show = false;
    // } else this.show = true;

    function letterShowing(eachLetter) {
        return eachLetter.show;
        // console.log(eachLetter.show);
    }

    this.solved = this.lettersOfWord.every(letterShowing);

    return this.solved;


};

Word.prototype.displayWord = function () {
    var wordString = "";

    this.lettersOfWord.forEach((element) => {
        wordString += element.displayLetter();
    });

    return wordString;
};

module.exports = Word;

// var myWord = new Word("flower");

// console.log(myWord.lettersOfWord);

// myWord.populateLetters();

// //console.log(myWord.lettersOfWord);

// myWord.checkGuessedLetter("f");
// myWord.checkGuessedLetter("w");
// myWord.checkGuessedLetter("o");
// myWord.checkGuessedLetter("e");
// myWord.checkGuessedLetter("r");
// myWord.checkGuessedLetter("l");

// console.log(myWord.lettersOfWord);

// myWord.checkIfWordSolved();
// console.log(myWord.solved);
// var msg = myWord.displayWord();
// console.log(msg);


// let myLetter = new Letter ("t");
// console.log("my letter: " + myLetter.displayLetter());
// myLetter.inWord = true;
// console.log("letter in word: " + myLetter.displayLetter());