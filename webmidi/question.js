function Question(){
	this.chord = null
	this.answered = false
}

Question.prototype.isCorrect = function(answer) {
	return Math.random() < 0.5
};