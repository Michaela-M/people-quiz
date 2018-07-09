 let questionNumber = 0;
 let score = 0;

function displayQuizDetails() {
  console.log('`displayQuizDetails` ran');
  const quizDetails = `<p>Question: ${questionNumber}/10</p><p>Score: ${score}</p>`;
  $('#display-details').html(quizDetails);
}

function renderStartPage() {
  // rendering the start page
  console.log('`renderStartPage` ran');
  const startPage = `<section role="region">
      <h2>Fun Fact: Those with higher than average people skills make $29,000 more per year!</h2>
      <button id="start-button" class="button" role="button">Start Quiz</button>
  </section>`;
  $('#displayed-page').html(startPage);    
}

function generateQuestion() {
  // generate quiz questions, one at a time
  console.log('`generateQuestion` ran');
  let currentQuestion = STORE[questionNumber];
  if (questionNumber < STORE.length) {
  const questionsString = `<section role="region">
        <form id="questionIndex">
          <fieldset>
          <legend class="question">${currentQuestion.question}</legend>
            
              <input type="radio" name="answer" id="answer1"  value="${currentQuestion.answers[0]}" required aria-required='true'>
              <label class="answerOption" for="answer1">${currentQuestion.answers[0]}</label>
            
            
              <input type="radio" name="answer" id="answer2" value="${currentQuestion.answers[1]}" required aria-required='true'>
              <label class="answerOption" for="answer2">${currentQuestion.answers[1]}</label>
            
            
              <input type="radio" name="answer" id="answer3" value="${currentQuestion.answers[2]}" required aria-required='true'>
              <label class="answerOption" for="answer3">${currentQuestion.answers[2]}</label>
            
            
              <input type="radio" name="answer" id="answer4" value="${currentQuestion.answers[3]}" required aria-required='true'>
              <label class="answerOption" for="answer4">${currentQuestion.answers[3]}</label>
            
          </fieldset>
          <div>
            <input type="submit" id="submit-button" form="questionIndex" class="submit-button"></input>
          </div>
        </form>
      </section>`;
  $('#displayed-page').html(questionsString);
  } else {
    renderFinalPage();
    handleTryAgainButton();
  }
}

function handleCorrectFeedback() {
  // this function will handle showing the user positve feedback
  console.log('`handleCorrectFeedback` ran');
  const correctFeedback = `<section role="region">
    <p>Correct!</p>
    <p>You know your people!</p>
    <button type="button" id="js-next-button" role="button" class="button">Next</button>
  </section>`;
  $('#displayed-page').html(correctFeedback);
}

function handleIncorrectFeedback() {
  // this function will handle incorrect feedback
  let currentQuestion = STORE[(questionNumber - 1)];
  let correctAnswer = `${currentQuestion.correctAnswer}`;
  console.log('`handleIncorrectFeedback` ran');
  const incorrectFeedback = `<section role="region">
    <p>Not quite!</p>
    <p>The correct answer is "${correctAnswer}."</p>
    <button type="button" id="js-next-button" role="button" class="button">Next</button>
  </section>`;
  $('#displayed-page').html(incorrectFeedback);
}

function handleSubmitButton() {
  // this function might handle moving to the next question
  console.log('`handleSubmitButton` ran');
  $('#displayed-page').on('submit', '#questionIndex', function(event) {
    event.preventDefault();
    let answer = $('input[type=radio]:checked').val();
    let correctAnswer = `${STORE[(questionNumber - 1)].correctAnswer}`;
    if (answer === correctAnswer) {
      handleCorrectFeedback();
      increaseScore();
    } else {
      handleIncorrectFeedback();
    }
    });
}

function nextQuestionNumber() {
  if (questionNumber < 10) {
  questionNumber++;
  displayQuizDetails();
}
}

function increaseScore() {
  score+=10;
  displayQuizDetails();
}

function handleStartButton() {
  console.log('`handleStartButton` ran');
  $('#displayed-page').on('click', '#start-button', function() {
    generateQuestion();
    nextQuestionNumber();
  });
}

function handleNextButton() {
  console.log('`handleNextButton` ran');
  $('#displayed-page').on('click', '#js-next-button', function() {
    generateQuestion();
    nextQuestionNumber();
  });
}

function handleTryAgainButton() {
  console.log('`handleTryAgainButton` ran');
  $('#displayed-page').on('click', '#try-again', function(event) {
    questionNumber = 0;
    score = 0;
    displayQuizDetails();
    renderStartPage();
  });
}

function renderFinalPage() {
  // this function will render the final page
  console.log('`renderFinalPage` ran');
  if (score >= 80) {
    $('#displayed-page').html(`<section role="region">
      <p>Final Score</p>
      <p>${score}/100</p>
      <p>Wohoo! You should be proud!</p> 
      <p>(And ask for a raise!)</p>
      <button id="try-again" type="button" role="button" class="button">Why Not Try Again</button></section>`)

  } else if (score < 80 && score >= 50) {
      $('#displayed-page').html(`<section role="region">
      <p>Final Score</p>
      <p>${score}/100</p> 
      <p>Nice! You're on your way!</p>
      <button id="try-again" type="button" role="button" class="button">Try Again</button>
      </section>`)
      
  } else {
      $('#displayed-page').html(`<section role="region">
      <p>Final Score</p>
      <p>${score}/100</p>
      <p>Yikes! The good news is you can only improve!</p>
      <button id="try-again" type="button" role="button" class="button">Try Again Now</button>
      </section>`)
}
}

function handleQuiz() {
  displayQuizDetails();
  renderStartPage();
  handleStartButton();
  handleSubmitButton();
  handleTryAgainButton();
  handleNextButton();
}

$(handleQuiz);