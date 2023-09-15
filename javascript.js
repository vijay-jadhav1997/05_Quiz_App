const questions = [
  {
    question: 'What is the name of the smallest & biggest planet in our solar system?',
    answers: [
      {text: 'Saturn & Earth', correct: false},
      {text: 'Venus & Mars', correct: false},
      {text: 'Mercury & Jupiter', correct: true},
      {text: 'Neptune & Uranus', correct: false},
    ]
  },
  {
    question: 'Which is the largest continent of the world?',
    answers: [
      {text: 'Asia', correct: true},
      {text: 'Europe', correct: false},
      {text: 'Africa', correct: false},
      {text: 'Australia', correct: false},
    ]
  },
  {
    question: 'What is the Capital of India?',
    answers: [
      {text: 'Mumbai', correct: false},
      {text: 'Bangaluru', correct: false},
      {text: 'Delhi', correct: false},
      {text: 'New Delhi', correct: true},
    ]
  },
  {
    question: 'What is the national heritage animal of India?',
    answers: [
      {text: 'Elephant', correct: true},
      {text: 'Tiger', correct: false},
      {text: 'Fox', correct: false},
      {text: 'Deer', correct: false},
    ]
  },
  {
    question: 'Which is the national animal of India?',
    answers: [
      {text: 'Elephant', correct: false},
      {text: 'Bengal Tiger', correct: true},
      {text: 'Lion', correct: false},
      {text: 'Cow', correct: false},
    ]
  },
  {
    question: 'Which festival in India is called the festival of colours?',
    answers: [
      {text: 'Diwali', correct: false},
      {text: 'Dasera (Vijaya Dashami)', correct: false},
      {text: 'Chhat Puja', correct: false},
      {text: 'Holi', correct: true},
    ]
  },
  {
    question: 'Where is the headquarters of ISRO located?',
    answers: [
      {text: 'Bengaluru', correct: true},
      {text: 'Nagpur', correct: false},
      {text: 'Surat', correct: false},
      {text: 'Pune', correct: false},
    ]
  },
  {
    question: 'Who is the author of Ramayana?',
    answers: [
      {text: 'Kalidas', correct: false},
      {text: 'Maharshi Patanjali', correct: false},
      {text: 'Valmiki ji', correct: true},
      {text: 'Vyas ji', correct: false},
    ]
  },
  {
    question: 'Where in India did Gautam Buddha attain enlightenment?',
    answers: [
      {text: 'Bodh Gaya, Bihar', correct: true},
      {text: 'Ayodya, Uttar Pradesh', correct: false},
      {text: 'Dwarka, Gujrat', correct: false},
      {text: 'Varanasi, Uttar Pradesh', correct: false},
    ]
  },
  {
    question: 'What is the Indian national currency called?',
    answers: [
      {text: 'Yen', correct: false},
      {text: 'Euro', correct: false},
      {text: 'US Dollar', correct: false},
      {text: 'Rupee', correct: true},
    ]
  },
  {
    question: 'Which is the longest river in India?',
    answers: [
      {text: 'Yamuna', correct: false},
      {text: 'Godavari', correct: false},
      {text: 'The Ganges', correct: true},
      {text: 'Kaveri', correct: false},
    ]
  },
  {
    question: 'Which is the largest "Democracy" country in the world?',
    answers: [
      {text: 'China', correct: false},
      {text: 'India', correct: true},
      {text: 'USA', correct: false},
      {text: 'Russia', correct: false},
    ]
  },
  {
    question: 'Which is the largest "Populated" country in the world?',
    answers: [
      {text: 'India', correct: true},
      {text: 'USA', correct: false},
      {text: 'China', correct: false},
      {text: 'France', correct: false},
    ]
  },
  {
    question: 'Which is the largest country in the world (by area)?',
    answers: [
      {text: 'Russia', correct: true},
      {text: 'Japan', correct: false},
      {text: 'India', correct: false},
      {text: 'China', correct: false},
    ]
  },
];

// References
const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answerBtns');
const nextButton = document.querySelector('#nextBtn');
const skipButton = document.querySelector('#skipBtn');
const displayScore = document.querySelector('#displayScore');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  skipButton.innerHTML = `Skip`;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('button');
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
    score = score - 0.33;
  }
  score = score.toFixed(2)

  displayScore.innerHTML = `Your current score is ${score}`;
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
  skipButton.style.display = 'none';
}

function showScore() {
  resetState();
  
  if (score >= (questions.length * 2/3)) {
    questionElement.innerHTML = `Finally, you scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = `your performance is excellent...!  Congrates...!`;
  } else if (score >= (questions.length/2)) {
    questionElement.innerHTML = `Finally, you scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = `your performance is good! Congrates...!`;
  } else if (score >= (questions.length/3)) {
    questionElement.innerHTML = `Finally, you scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = `your performance is poor! Revise & you must try again...!`;
  } else  {
    questionElement.innerHTML = `Finally, you scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = `your performance is very poor! You really need to study hard & improve your GK...!`;
  }
  skipButton.innerHTML = `Play Again`;
  
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
  skipButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  displayScore.innerHTML = ``;
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

skipButton.addEventListener('click', () => {
  displayScore.innerHTML = ``;
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz()
