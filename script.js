function openFeatures() {
  let allElem = document.querySelectorAll(".elems");
  let fullElemPage = document.querySelectorAll(".fullelem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullelem .back");

  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function TodoList() {
  let form = document.querySelector(".addTask form");
  let textInput = document.querySelector(".addTask form #task-input");
  let textDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
            <h5>${elem.task} <span class="${elem.imp}">*imp</span></h5>
          <button id=${idx}>Mark As Completed</button>
          </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: textInput.value,
      details: textDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    textInput.value = "";
    textDetailsInput.value = "";
    taskCheckbox.checked = false;
  });
}
TodoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00 `,
  );

  var wholeDaySum = "";
  var dayPlannerData =
    JSON.parse(localStorage.getItem("dayPlannerData")) || {} || {};

  hours.forEach(function (elem, idx) {
    var savedData = dayPlannerData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
    <p>${elem}</p>
    <input id = ${idx} type="text" placeholder="..." value = ${savedData}>
    </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;
  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlannerData[elem.id] = elem.value;
      localStorage.setItem("dayPlannerData", JSON.stringify(dayPlannerData));
    });
  });
}
dailyPlanner();

function motivationalQuotes() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");
  async function fetchQuotes() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();
    motivationQuote.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;
  }
  fetchQuotes();
}
motivationalQuotes();

function pomoTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;
  let totalSeconds = 25 * 60;
  var timerInterval = null;
  function upDateTimer() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    timer.innerHTML = `${String(min).padStart("2", "0")}:${String(sec).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take A Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    isWorkSession = true;
    clearInterval(timerInterval);
    upDateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomoTimer();