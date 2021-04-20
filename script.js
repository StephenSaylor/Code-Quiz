const startButton = document.getElementById('start-btn')
const questionBoxElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const submitFormElement = document.getElementById('submit-form')
const submitButtonElement = document.getElementById('submit')
var scoreEl = document.getElementById('score')
var timeLeftEl = document.getElementById('time-left')


var score = 0
var timeLeft = timeLeftEl


startButton.addEventListener('click', startQuiz) 
answerButtonsElement.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionBoxElement.classList.remove('hide')
    setNextQuestion()
    timer()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)  
        answerButtonsElement.appendChild(button)  
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    } 
}

function selectAnswer(event) {
    console.log(event.target.getAttribute('data-correct'))
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        startButton.classList.add('hide')
    } else {
        startButton.classList.remove('hide')
        startButton.innerText = 'Try Again?'
        questionElement.innerText = ''
    }
    if (correct === "true") {
        score + 10
        scoreEl.innerText = (score += 10)
    } else {
        if (correct === null)
        timeLeft - 10
        timeLeftEl.innerText = (timeLeft -= 10)
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function timer(){
    var sec = 74;
    var timer = setInterval(function(){
        timeLeftEl.innerHTML = sec;
        sec--;
        if (sec < 0 || shuffledQuestions.length < currentQuestionIndex + 1) {
            clearInterval(timer);
            endMessage()
        }
    }, 1000);
}

function endMessage() {
    timeLeftEl.textContent = "Time's Up!"
    startButton.classList.remove('hide')
    startButton.innerText = 'Try Again?'
    questionElement.innerText = " "
    answerButtonsElement.innerText = " "
    submitFormElement.classList.remove('hide')
}

const questions = [
    {
      question: 'JavaScript is:',
      answers: [
          { text: 'A way of writing with coffee', correct: false },
          { text: 'Annoying', correct: false },
          { text: 'A program native to the island Java in Indonesia', correct: false },
          { text: 'A programming language', correct: true }
      ]
    },
    {
        question: 'Which is not one of the three main data types used in JavaScript?',
        answers: [
            { text: 'Confirms', correct: true },
            { text: 'Booleans', correct: false },
            { text: 'Numbers', correct: false },
            { text: 'Strings', correct: false }
        ]
    },
    {
        question: 'What do strings need to be encased in?',
        answers: [
            { text: 'Prompts', correct: false },
            { text: 'Quotation marks', correct: true },
            { text: 'Parentheses', correct: false },
            { text: 'Curly Braces', correct: false }
        ]
    },
    {
        question: 'In reference to arrays, the index starts...',
        answers: [
            { text: 'After the brackets', correct: false },
            { text: 'At 1', correct: false },
            { text: 'At 0', correct: true },
            { text: 'As undefined', correct: false }
        ]
    },
    {
        question: 'Functions are called using...',
        answers: [
            { text: 'Brackets', correct: false },
            { text: 'Conjunction Junction', correct: false },
            { text: 'Var', correct: false },
            { text: 'Parentheses', correct: true },
        ]
    }
]
