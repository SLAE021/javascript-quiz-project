class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // returns the question from the questions array at the position of currentQuestionIndex
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // should increment the currentQuestionIndex by 1
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    let array = this.questions;
    for (let i = 0; i < array.length; i++) {
      // for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // should increase correctAnswers by 1 when called with a correct answer for the current question
  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1; // this.correctAnswers = this.correctAnswers + 1
    }
  }

  // should return false when currentQuestionIndex is less than the questions array length
  // should return true when currentQuestionIndex is equal to the questions array length
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter((questions) => {
        return questions.difficulty === difficulty;
      });
    }
    return this.questions;
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce((acc, eachQuestion) => {
      return acc + eachQuestion.difficulty;
    }, 0);

    return totalDifficulty / this.questions.length;
  }
}