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
    var allTask = document.querySelector(".allTask");
    var sum = "";
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

