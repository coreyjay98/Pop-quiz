let baseQuestions = [
  {
    name: "Question One",
    question: "What would I use to alter the appearance of my website?",
    answers: ["HTML", "Java", "Python", "CSS"],
    correct: "CSS",
  },
  {
    name: "Question Two",
    question: "What does the R in MERN stand for?",
    answers: ["Reason", "React", "Revive", "Replay"],
    correct: "React",
  },
  {
    name: "Question Three",
    question: "What CSS selector will change the text colour?",
    answers: ["font", "font-color", "color", "font-style"],
    correct: "color",
  },
  {
    name: "Question Four",
    question: "Choose the correct HTML Tag for the largest heading",
    answers: ["head", "header", "big-head", "h1"],
    correct: "h1",
  },
  {
    name: "Question Five",
    question: "In JavaScript what symbol would you use to start an array?",
    answers: ["{", '"', "[", "(("],
    correct: "[",
  },
];

let questions = [];

const questionSelector = () => {
  const i = Math.floor(Math.random() * (questions.length - 1));
  return questions[i];
};

const finishedQuiz = () => {
  console.log("Finished Quiz");
  clearInterval(timer);
  $(".resultDiv").toggleClass("hide");
  $("#scoreOut").append(`Score: ${answerCount} Time : ${count}`);
  $("#scoreOut").append("");
};
const showQuestions = (obj) => {
  if (!obj) return finishedQuiz();
  return `            
  <h2 id="question">${obj.question}</h2>
  <button class='answer' id="choice1" data-id='1'>${obj.answers[0]}</button>
  <button class='answer' id="choice2" data-id='2'>${obj.answers[1]}</button>
  <br>
  <button class='answer' id="choice3" data-id='3'>${obj.answers[2]}</button>
  <button class='answer' id="choice4" data-id='4'>${obj.answers[3]}</button>`;
};

const answerChecker = (answer) => {
  questions.forEach((el) => {
    if (answer == el.correct) {
      rightAnswer(answer);
    } else {
      wrongAnswer();
    }
  });
};
const wrongAnswer = () => {
  return (count += 1);
};

let answerCount = 0;
const rightAnswer = (answer) => {
  answerCount += 1;
  questions.splice(
    questions.findIndex((el) => el.correct == answer),
    1
  );
  $("#quizButtons").html("");
  $("#quizButtons").append(showQuestions(questionSelector()));
};

$("#highScores").click(function () {
  const highScoreDiv = $("#highScoreDiv");
  highScoreDiv.toggleClass("hide");
});
let count = 0;

let timer;
$(".startButton").click(() => {
  count = 0;
  startQuiz();
  timer = setInterval(function () {
    count += 1;
    $(".timeDisplay").html("");
    $(".timeDisplay").append(count);
  }, 1000);
});

$("#quizButtons").on("click", (event) => {
  const answer = event.target.outerText;
  answerChecker(answer);
});
let scoreArray = [];

$(".submission").on("click", (event) => {
  const nameSubmission = $("#nameInput").val();
  if (nameSubmission == "") {
    return $("#nameInput").addClass("redBorder");
  }
  const score = {
    name: nameSubmission,
    answerCount: answerCount,
    timeCount: count,
  };
  scoreArray.push(score);
  $("#nameInput").val("");
  localStorage.setItem("Highscore", JSON.stringify(scoreArray));
  getStorage();
  restartOption();
  scoreArray = [];
});

$(document).ready(() => {
  getStorage();
});

const getStorage = () => {
  let score = JSON.parse(localStorage.getItem("Highscore"));
  if (!score) return $(".scoreList").html("");
  const sortedScores = score.sort((a, b) => a - b);
  sortedScores.forEach((el) => {
    $(".scoreList").append(
      `<li class="scoreList1">${el.name} : Score(${el.answerCount})  -  Time: ${el.timeCount}</li>`
    );
  });
};

const restartOption = () => {
  $("#scoreOut").html("");
  $(".resultDiv").toggleClass("hide");
  $("#restartButton").toggleClass("hide");
};

$("#restartButton").on("click", () => {
  $("#restartButton").toggleClass("hide");
  count = 0;
  startQuiz();
  timer = setInterval(function () {
    count += 1;
    $(".timeDisplay").html("");
    $(".timeDisplay").append(count);
  }, 1000);
});

const startQuiz = async () => {
  baseQuestions.forEach((el) => {
    questions.push(el);
  });
  answerCount = 0;
  console.log("Started Quiz");
  $(".startButton").addClass("hide");
  $("#quizButtons").append(showQuestions(questionSelector()));
};

$(".clearHighscores").click(async () => {
  const remove = await localStorage.removeItem("Highscore");
  await getStorage();
});
