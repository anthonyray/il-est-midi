$(function() {
    
    var scoreTag = $("#score")
    var currentQuestionTag = $("#currentQuestion")
    var numberOfQuestionsTag = $("#numberOfQuestions")
    var skipButton = $("#skipButton")
    var trueButton = $("#trueButton")
    var falseButton = $("#falseButton")
    var chordTag = $("#chord")
    var notesTag = $("#notes")
    var completedTag = $("#completed")

    var exercise = new Exercise();
    exercise.addQuestions([
      new Question(), 
      new Question(),
      new Question(),
      new Question(),
      new Question()])

    if (exercise.questions.length > 0){
      initializeUI(scoreTag, currentQuestionTag, numberOfQuestionsTag, 0, 1, exercise.questions.length)
      exercise.start()
      
      skipButton.click(function(){
        if (exercise.hasNext()){
          exercise.skipQuestion()
          render(scoreTag, currentQuestionTag, chordTag, exercise)
        }
        else { // The quizz is completed
          showQuizzComplete(completedTag)
          disableButtons(trueButton, falseButton, skipButton)
        }
      });

      trueButton.click(function() {
        if (exercise.answerQuestion([])) { // We correctly answer the question
          if (exercise.hasNext()){ // There is some questions left
            showSuccess()
            render(scoreTag, currentQuestionTag, chordTag, exercise)
          }
          else { // We reached the end of the quizz
            render(scoreTag, currentQuestionTag, chordTag, exercise)
            showQuizzComplete(completedTag)
            disableButtons(trueButton, falseButton, skipButton)
          }
        }



        /*if (exercise.hasNext() && exercise.answerQuestion([])) { // Correct answer
          if (exercise.hasNext()){
            showSuccess()
            render(scoreTag, currentQuestionTag, chordTag, exercise)
          }
          else { // The quizz is completed
            showQuizzComplete(completedTag)
            disableButtons(trueButton, falseButton, skipButton)
          }
        } else { // Wrong answer
          console.log("Try Again")
        }*/
      });
      
      falseButton.click(function() {
      });
    }

});


function initializeUI(scoreElement, 
                      currentQuestionElement, 
                      numberOfQuestionsElement, 
                      scoreValue, 
                      currentQuestionValue, 
                      numberOfQuestionsValue){
  renderScore(scoreElement, scoreValue)
  renderCurrentQuestion(currentQuestionElement, currentQuestionValue)
  renderNumberOfQuestions(numberOfQuestionsElement, numberOfQuestionsValue)
}

function renderScore(scoreElement, scoreValue){
  scoreElement.text(scoreValue)
}

function renderCurrentQuestion(currentQuestionElement, currentQuestionValue){
  currentQuestionElement.text(currentQuestionValue)
}

function renderNumberOfQuestions(numberOfQuestionsElement, numberOfQuestionsValue) {
  numberOfQuestionsElement.text(numberOfQuestionsValue)
}

function render(scoreElement, currentQuestionElement, chordElement, exercise) {
  renderScore(scoreElement, exercise.score)
  renderCurrentQuestion(currentQuestionElement, exercise.currentQuestion + 1)
}

function showSuccess(){
  console.log("Success!")
}

function showQuizzComplete(completedElement){
  completedElement.show()
}

function disableButtons(trueButton, falseButton, skipButton){
  trueButton.prop('disabled', true)
  falseButton.prop('disabled', true)
  skipButton.prop('disabled', true)
}