var inquirer = require("inquirer");
var Word = require("./word");


var wordList = ["Lorde","Hemmingway", "Austen", "Shakespeare","Fitzgerald","Faulkner","Baldwin","DuBois","Morrison","Angelou"];
var guessingWord;
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var gameRound = 0;



function newRound() {
    guessingWord = new Word(wordBank[Math.floor(Math.random()*wordBank.length)]);
    guessingWord.populateLetters();
}

newRound();

console.log(guessingWord);