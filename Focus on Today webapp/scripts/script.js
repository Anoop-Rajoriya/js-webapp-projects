console.log("script is running!");

const goalsContainer = document.querySelector(".goals-container");
const progressBar = document.querySelector(".progress-bar");
const errorElm = document.querySelector(".error");
const checkBoxList = goalsContainer.querySelectorAll(".check-box");
const inputList = goalsContainer.querySelectorAll(".check-box + input");

const goalsData = {
  goal0: "",
  checkBox0: -1,
  goal1: "",
  checkBox1: -1,
  goal2: "",
  checkBox2: -1,
};

window.onload = function () {
  let data = localStorage.getItem("goalsData");
  if (data === null) return;

  data = JSON.parse(data);
  console.log("onload is run");
  console.log(data);

  inputList.forEach((inp, index) => (inp.value = data[`goal${index}`]));

  checkBoxList.forEach((checkBox, index) => {
    console.log(data[`checkBox${index}`], index);
    if (data[`checkBox${index}`] === index)
      checkBox.parentElement.classList.toggle("completed");
  });

  adjustProgressBar();
};

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (event) => {
    const allGoalsAdded = [...inputList].every((input) => input.value);

    if (allGoalsAdded) {
      errorElm.style.display = "none";
      checkBox.parentElement.classList.toggle("completed");
      storeMYGoals();
      adjustProgressBar();
    } else {
      errorElm.style.display = "block";
    }
  });
});

function adjustProgressBar() {
  const progress = [...checkBoxList].filter(
    (e) => e.parentElement.classList[1] === "completed"
  );

  if (progress.length === 1) {
    progressBar.firstElementChild.style.width = 40 + "%";
    progressBar.classList.add("completed");
  } else if (progress.length === 2)
    progressBar.firstElementChild.style.width = 60 + "%";
  else if (progress.length === 3)
    progressBar.firstElementChild.style.width = 100 + "%";
  else progressBar.classList.remove("completed");

  progressBar.querySelector("div span").innerText = progress.length;
}

function storeMYGoals() {
  let inputGoals = [...inputList].map((input) => input.value);
  let checked = [...checkBoxList].map((checkBox, index) => {
    if (checkBox.parentElement.classList[1] === "completed") {
      return index;
    } else {
      return -1;
    }
  });

  inputGoals.forEach((elm, index) => (goalsData[`goal${index}`] = elm));
  checked.forEach((elm, index) => (goalsData[`checkBox${index}`] = elm));

  localStorage.setItem("goalsData", JSON.stringify(goalsData));
}
