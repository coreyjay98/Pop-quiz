//All Vars necessary were created up here
var startButton = document.querySelector('#startButton')
var quizButtonContainer = document.querySelector('#quizButtons')
var questionAsk = document.querySelector('#question')
var timeWarning = document.querySelector('.timeWarning')
var resultHead = document.querySelector('.resultHead')
var resultDiv = document.querySelector('.resultDiv')
var scoreOut = document.querySelector('#scoreOut')
var restartButton = document.querySelector('#restartButton')
var quizArray = Array.from(document.querySelectorAll('.answer'))
const timeDisplay = document.querySelector('.timer')

const choiceOne = document.querySelector('#choice1')
const choiceTwo = document.querySelector('#choice2')
const choiceThree = document.querySelector('#choice3')
const choiceFour = document.querySelector('#choice4')
// Array for all questions and answers
var questions = [{
    question: 'What would I use to alter the appearance of my website?',
    answers: ['CSS', 'Java', 'Python', 'HTML'],
    correct: 3
},
{
    question: 'What does the R in MERN stand for?',
    answers: ['Reason', 'React', 'Revive', 'Replay'],
    correct: 3
},
{
    question: 'What CSS selector will change the text colour?',
    answers: ['font', 'font-color', 'color', 'font-style'],
    correct: 3
},
{
    question: 'Choose the correct HTML for the largest heading',
    answers: ['<head>', '<header>', '<big-head>', '<h1>'],
    correct: 3
},
{
    question: 'In JavaScript what symbol would you use to start an array?',
    answers: ['{', '"', '[', '('],
    correct: 3
}
]
// Way to manage what question user is seeing
var questionIndex = 0
// Simple number VAR that I can increment and use to keep the user's score
var currentScore = 0

// Function for when high scores button is clicked
$('#highScores').click(function () {
    var highScoreDiv = $('#highScoreDiv')
    highScoreDiv.toggle('hide')
})

// Funsction for the timer, currently incomplete
var Timer = function () {
    var secs = 0;
    var id = setInterval(function () {
        secs++; $('.timer').text(secs);
        if (scoreOut.textContent == '') {
            clearInterval(id);
            alert('Total Time: ' + secs + ' seconds');
            console.log(secs)
        }
    }, 1000);
};

// Listener on the start button to start the whole quiz 

startButton.addEventListener("click", function () {
    console.log('Started Quiz');
    startButton.classList.add('hide')
    quizButtonContainer.classList.remove('hide')
    questionAsk.classList.remove('hide')
    nextQuestion()
    Timer()
})

// This function is ran every time a question is answered correctly, gives the next question
var nextQuestion = function () {

    for (let i = 0; i < 4; i++) {
        questionAsk.textContent = (questions[questionIndex].question)
        var button = document.querySelector('.answer')
        button.textContent = (questions[questionIndex].answers[i])
        quizButtonContainer.append(button)
    }
}

// if statements for if the user gets the question right or wrong 

$('#choice1').click(function () {
    if (choiceOne.textContent == 'CSS') {
        console.log('Correct')
        questionIndex++
        currentScore++
        nextQuestion()
    } else {

    }
})
$('#choice2').click(function () {
    if (choiceTwo.textContent == 'React') {
        console.log('Correct')
        questionIndex++
        currentScore++
        nextQuestion()

    } else {

    }
})
$('#choice3').click(function () {
    if (choiceThree.textContent == 'color') {
        console.log('Correct')
        questionIndex++
        currentScore++
        nextQuestion()
    } else {

    }
})
$('#choice4').click(function () {
    if (choiceFour.textContent == '<h1>') {
        console.log('Correct')
        questionIndex++
        currentScore++
        nextQuestion()
    } else {

    }
})
$('#choice3').click(function () {
    if (choiceThree.textContent == '[') {
        console.log('Correct')
        questionIndex++
        currentScore++
        console.log(currentScore)
        quizDone()
    } else {

    }
})

// Function for when the quiz is finished

var quizDone = function () {
    quizButtonContainer.classList.add('hide')
    questionAsk.classList.add('hide')
    timeWarning.classList.add('hide')
    resultDiv.classList.remove('hide')
    scoreOut.append(currentScore)
    restartButton.classList.remove('hide')
}

restartButton.addEventListener('click', function () {
    restartGame()
})

// Refresh function for when the restart button is pressed
var restartGame = function () {
    console.log('Restart')
    window.location = window.location
    restartButton.classList.add('hide')
}
// Empty arrays used to store the names submitted from the users
var names = []
var scoreTotal = []

var scoreRecord = document.querySelector('#scoreRecord')

// Function ran when name was submitted by user, storing their names and the score, This part is incomplete currently
var nameSubmit = $('#scoreRecord').click(function (event) {
    event.preventDefault();
    var submission = $('#nameInput').val()
    if (submission == '') {
        alert('Please Enter a name to proceed')
    } else {
        names.push(submission)
        scoreTotal.push(currentScore)
        $('.scoreList1').append(names + '' + ':' + currentScore)
    }
})
