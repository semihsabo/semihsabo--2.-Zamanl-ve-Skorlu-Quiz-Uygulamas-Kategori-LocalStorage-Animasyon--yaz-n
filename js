const nqInput = document.getElementById("add-question");
const nqOptions = document.querySelectorAll(".nq-option");
const answer = document.getElementById("answer");
const form = document.getElementById("question-form");
const startQuizBtn = document.getElementById("start-quiz");
const quizScreen = document.getElementById("quiz-screen");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizTimer = document.getElementById("quiz-timer");
const quizScore = document.getElementById("quiz-score");
const resultDiv = document.getElementById("result");

let allQuestions = [];
let currentIndex = 0;
let score = 0;
let time = 10;
let timerInterval;

Array.from(nqOptions).forEach((option, index) =>
  option.addEventListener("input", () => {
    answer.options[index + 1].textContent = option.value;
    answer.options[index + 1].value = option.value;
  })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const optionsArray = Array.from(nqOptions).map((opt) => opt.value.trim());
  const title = nqInput.value.trim();
  const correctAnswer = answer.value;

  if (title === "" || optionsArray.includes("") || correctAnswer === "") return;

  allQuestions.push({ title, options: optionsArray, answer: correctAnswer });

  form.reset();
  alert("Soru eklendi!");
});

startQuizBtn.addEventListener("click", () => {
  if (allQuestions.length === 0) {
    alert("Lütfen önce soru ekleyin.");
    return;
  }
  startQuizBtn.style.display = "none";
  form.style.display = "none";
  quizScreen.style.display = "block";
  currentIndex = 0;
  score = 0;
  loadQuestion();
});

function loadQuestion() {
  clearInterval(timerInterval);
  time = 10;
  const current = allQuestions[currentIndex];
  quizQuestion.textContent = current.title;
  quizOptions.innerHTML = "";

  current.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(opt);
    quizOptions.appendChild(btn);
  });

  updateTimer();
  timerInterval = setInterval(() => {
    time--;
    updateTimer();
    if (time <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  quizTimer.textContent = `Süre: ${time}`;
  quizScore.textContent = `Skor: ${score}`;
}

function checkAnswer(selected) {
  const correct = allQuestions[currentIndex].answer;
  if (selected === correct) score += 10;
  clearInterval(timerInterval);
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < allQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizScreen.style.display = "none";
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `<h2>Quiz Bitti!</h2><p>Toplam Skor: ${score}</p>`;
}
nqInput.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  document.querySelector(".nq-options").style.transform = val ? "translateY(0)" : "translateY(-120%)";
});
