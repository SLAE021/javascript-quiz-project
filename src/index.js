document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("¿Cual de estos es un Digimon Mitologico?", ["Bagramon", "Merukimon", "Tactimon", "Blastimon"], "Merukimon", 3),

    new Question("Nombre de las dagas de JinWoo", ["Dagas del Rey Demonio", "Dagas infernales", "Colmillos de rey serpiente", "Dagas de Kamish"], "Dagas de Kamish", 3),
        
    new Question("¿cual de los siguientes es un pokemon tipo Ada", ["Bagramon", "Adamon", "Togepi", "Pikachu"], "Togepi", 3),
    
    new Question("¿En qué año se estrenó el primer capítulo de The Office?", ["2001", "2005", "1999", "2010"], "2005", 3),
    
    new Question("¿Qué edad tiene Jorge?", ["20", "30", "42", "no lo tengo claro"], "no lo tengo claro", 3),
    
  

    // Add more questions herea
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  // console.log(quiz.questions) !!!!!!!!!!!

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  // console.log(quiz.timeRemaining)
  let timer = setInterval(() => {
    quiz.timeRemaining--;

    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    // console.log(quiz.timeRemaining)

    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      alert("time is out, try again!"); // test alert message
    }
  }, 1000);

  //console.log(quiz.timeRemaining);

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // console.log(question.answer) !!!!!!!!!!!!!!!
    // console.log(question) // this is the question user read on screen
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    // console.log(question.text)
    // console.log(questionContainer)

    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    /* IMPORTANT CONSOLE LOGS

        console.log(quiz)
        console.log(question)

    ========================= */

    // console.log(questions.indexOf(quiz.currentQuestionIndex)
    // console.log(questions.indexOf(question))
    // console.log(questions.length)

    // status bar percentage = (index of current question + 1 / questions length) * 100
    let percentage = (quiz.currentQuestionIndex / questions.length) * 100;
    // console.log(percentage)

    progressBar.style.width = `${percentage}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      questions.length
    }`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

    // console.log(choiceContainer) // choiceContainer = <ul>
    // console.log(question.choices)

    question.choices.forEach((eachChoice) => {
      // console.log(eachChoice);

      const newRadioInputElement = document.createElement("input");
      newRadioInputElement.type = "radio";
      newRadioInputElement.name = "eachChoice";
      newRadioInputElement.value = eachChoice;

      const label = document.createElement("label");
      label.innerText = eachChoice;
      // console.log(label)

      const br = document.createElement("br");

      choiceContainer.append(newRadioInputElement);
      choiceContainer.append(label);
      choiceContainer.append(br);
      // console.log(choiceContainer)

      newRadioInputElement.innerText = eachChoice.value;
      // console.log(newRadioInputElement.innerText)
    });

    // console.log(question.answer)
    // return question.answer // creates variable to use outside the function
  }

  // let correctAnswer = showQuestion() // showed question's correct answer
  // console.log(correctAnswer)

  // console.log(questions[0].answer) // !!!!!!!!!!!!!!!!!

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value == user input
    // console.log(selectedAnswer)

    const allChoicesInputList = document.querySelectorAll("input");
    // console.log(allChoicesInputList)
    // console.log(allChoicesInputList[0].checked)
    // console.log(allChoicesInputList[1].checked)
    // console.log(allChoicesInputList[2].checked)
    // console.log(allChoicesInputList[3].checked)
    // checkAnswer()
    //onst question = quiz.getQuestion();

    allChoicesInputList.forEach((input) => {
      if (input.checked) {
        selectedAnswer = input.value;
        // console.log(input.value)
        // console.log(selectedAnswer)
        // console.log(showQuestion(question.answer))
        //console.log(selectedAnswer === correctAnswer)
      }
    });

    //if (selectedAnswer === question.answer) {
    quiz.checkAnswer(selectedAnswer);
    //}

    quiz.moveToNextQuestion();

    showQuestion();
  }

  // we have to check selected answer with the correct answer to the question showed in showQuestion()
  // if (selectedAnswer === questions.answer)

  /*

    function nextButtonHandler() {
  // recopilar la respuesta del usuario -- HECHO, l.185
  // revisar cada uno de los input, verificar cual está checked -- DONE, L 193
  // verificar esa respuesta contra la respuesta correcta de la pregunta actual
  // pasar a la siguiente pregunta
  // volver a ejecutar la funcion showQuestion

  ----
    checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1; // this.correctAnswers = this.correctAnswers + 1
    }
  }
    */

  // YOUR CODE HERE:
  //
  // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

  // 2. Loop through all the choice elements and check which one is selected
  // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
  //  When a radio input gets selected the `.checked` property will be set to true.
  //  You can use check which choice was selected by checking if the `.checked` property is true.

  // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
  // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
  // Move to the next question by calling the quiz method `moveToNextQuestion()`.
  // Show the next question by calling the function `showQuestion()`.

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  const restartButton = document.querySelector("#restartButton");

  restartButton.addEventListener("click", () => {
    quizView.style.display = "block";
    endView.style.display = "none";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
    quiz.timeRemaining = quizDuration;
  });
});
