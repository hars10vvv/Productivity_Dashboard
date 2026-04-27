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
      }, 10);
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
      }, 10);
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

function weatherFunctionality() {
  var Header1Time = document.querySelector(".header1 h1");
  var Header1Date = document.querySelector(".header1 h2");
  var Header1Temp = document.querySelector(".header2 h2");
  var Header1Condition = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");
  var city = "Bhopal";
  var data = null;

  async function weatherAPICall() {
    var apiKey = "7160b581e9544a2db10101900262404";
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    data = await response.json();
    Header1Temp.innerHTML = `${data.current.temp_c}°C`;
    Header1Condition.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Precipitation: ${data.current.precip_mm}mm`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  }
  setInterval(() => {
    weatherAPICall();
  }, 1000);

  function dateTime() {
    const totalDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var daysOfWeek = totalDays[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    Header1Time.innerHTML = `${daysOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} ${ampm}`;
    Header1Date.innerHTML = `${tarik} ${month} ${year}`;
  }
  dateTime();
  setInterval(dateTime, 1000);
}
weatherFunctionality();


var rootElement = document.documentElement;
rootElement.style.setProperty('--pri')