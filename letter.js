var Letter = function(letter) {

    this.letter = letter;

    this.show = false;

    this.placeHolder = "- ";

};

Letter.prototype.displayLetter = function() {
    if (!(this.show)) {
        return this.placeHolder;
    } else {
        return this.letter + " ";
    }
};

module.exports = Letter;