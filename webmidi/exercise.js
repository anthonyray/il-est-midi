function Exercise(){
	this.score = 0;
	this.questions = [];
	this.currentQuestion = null;
}

Exercise.prototype.addQuestion = function(question) {
	this.questions.push(question)
};

Exercise.prototype.addQuestions = function(questionsArray) {
	var self = this
	questionsArray.forEach(function(q){ self.questions.push(q)});
};

Exercise.prototype.hasNext = function() {
	return this.currentQuestion < (this.questions.length)
};

Exercise.prototype.start = function(){
	if (this.questions.length > 0){
		this.currentQuestion = 0
	}
}

Exercise.prototype.answerQuestion = function(answer) {
	console.log(this.currentQuestion)
	var q = this.questions[this.currentQuestion]
	if (q.isCorrect(answer)) {
		this.increaseScore()
		this.currentQuestion += 1
		return true
	}
	else {
		return false
	}
};

Exercise.prototype.increaseScore = function() {
	this.score += 1
};

Exercise.prototype.skipQuestion = function() {
	this.currentQuestion += 1
};