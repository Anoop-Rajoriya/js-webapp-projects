let quizeData = {
    queArr: [],
    isPlayer: false,
    gameCount: 0,
    correctAns: 0,
};

const questionElm = document.querySelector(".question-container");
const optionElmArr = document.querySelectorAll(".option");
const appCounter = document.querySelector(".question-counter");
const appTimer = document.querySelector(".question-timer");
const nextElm = document.querySelector(".next");
const app = document.querySelector(".app-wraper");
const muteButton = document.querySelector(".audio");

let showAnsTimeout;
let canNext = false;
let timeCount = 30;
let timerFlage;
let isMuted = false;

// const clockAudio = new Audio('../assets/audio/clock-tic-tic.mp3');
const correctAudio = new Audio("../assets/audio/currect.mp3");
const wrongAudio = new Audio("../assets/audio/wrong.mp3");
const nextAudio = new Audio("../assets/audio/next-click.mp3");

if (!localStorage.quizeData) {
    try {
        fetch(
            `https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&encode=base64`
        )
            .then((res) => res.json())
            .then(fetchData);
    } catch (error) {
        // console.log(error, "please reload page data not fetched!");
    }
} else fetchData();

function fetchData(params) {
    if (!localStorage.getItem("quizeData")) {
        params.results.forEach((element) => {
            const question = {
                que: element.question,
                ans: element.correct_answer,
                option: [],
            };

            element.incorrect_answers.forEach((option) => {
                question.option.push(option);
            });

            quizeData.queArr.push(question);
        });

        setTimeout(
            () => localStorage.setItem("quizeData", JSON.stringify(quizeData)),
            500
        );
    } else quizeData = JSON.parse(localStorage.getItem("quizeData"));

    gameStart();
}

function gameStart(params) {
    updateQuesAndAns();
    optionElmArr.forEach((option) => {
        option.addEventListener("click", checkUserAns, false);
    });
    nextElm.addEventListener("click", nextLevel, false);
}

function checkUserAns(params) {
    startTimer(false);
    if (
        params.target.innerText ==
        atob(quizeData.queArr[quizeData.gameCount].ans)
    ) {
        playSound("PlayCorrectAnsSound");

        params.target.classList.add("currect");
        quizeData.correctAns++;
    } else {
        playSound("PlayWrongAnsSound");
        params.target.classList.add("wrong");
    }

    optionElmArr.forEach((option) => {
        option.removeEventListener("click", checkUserAns, false);
    });

    showAnsTimeout = setTimeout((e) => {
        optionElmArr.forEach((e) => {
            e.classList.remove("currect");
            e.classList.remove("wrong");
        });

        optionElmArr.forEach((e) => {
            if (e.innerText !== atob(quizeData.queArr[quizeData.gameCount].ans))
                e.classList.add("wrong");
            else e.classList.add("currect");
        });
    }, 800);
    // quizeData.score = ((quizeData.correctAns / 25) * 100).toFixed(2)
    canNext = true;
}

function nextLevel(params) {
    playSound("PlayNextButtonSound");
    quizeData.isPlayer = true;
    localStorage.setItem("quizeData", JSON.stringify(quizeData));
    if (!canNext) return;
    nextElm.removeEventListener("click", nextLevel, false);
    clearTimeout(showAnsTimeout);
    app.classList.add("time-100");
    app.classList.remove("time-15");
    canNext = false;
    quizeData.gameCount++;
    if (quizeData.gameCount <= 24) {
        gameStart();
    } else {
        gameEnd();
    }
}

function updateQuesAndAns(params) {
    optionElmArr.forEach((e) => {
        e.classList.remove("currect");
        e.classList.remove("wrong");
    });

    startTimer(true);

    if (quizeData.gameCount <= 24) {
        appCounter.firstElementChild.innerText = quizeData.gameCount + 1;
        questionElm.innerText = atob(quizeData.queArr[quizeData.gameCount].que);
        let keyElm = optionElmArr[Math.floor(Math.random() * 4)];
        keyElm.innerText = atob(quizeData.queArr[quizeData.gameCount].ans);
        const filteredNodeList = [...optionElmArr].filter((e) => e !== keyElm);

        filteredNodeList.forEach((option, index) => {
            if (quizeData.queArr[quizeData.gameCount].option[index])
                option.innerText = atob(
                    quizeData.queArr[quizeData.gameCount].option[index]
                );
            else option.innerText = "option not available!";
        });
    } else {
        gameEnd();
    }
}

function gameEnd(params) {
    setTimeout(() => {
        console.log("game end !!!!!");
        window.location.replace(
            "https://anoop-rajoriya.github.io/js-webapp-projects/Quiz%20Time%20webapp/routs/result.html"
        );
    }, 500);
}

function startTimer(params) {
    if (params) {
        appTimer.innerText = `00:00`;
        app.classList.add("time-100");
        app.classList.remove("time-50");
        app.classList.remove("time-15");

        timerFlage = setInterval((e) => {
            if (timeCount >= 0) {
                if (timeCount <= 15 && timeCount > 5) {
                    // console.log("hurry up !!!");
                    app.classList.add("time-50");
                    app.classList.remove("time-100");
                } else if (timeCount <= 5 && timeCount >= 0) {
                    // console.log("damm it !!!");
                    app.classList.add("time-15");
                    app.classList.remove("time-50");
                }
                appTimer.innerText = `00:${timeCount}`;
                timeCount--;
                return;
            }

            showAnsTimeout = setTimeout((e) => {
                optionElmArr.forEach((e) => {
                    e.classList.remove("currect");
                    e.classList.remove("wrong");
                });

                optionElmArr.forEach((e) => {
                    if (
                        e.innerText !==
                        atob(quizeData.queArr[quizeData.gameCount].ans)
                    )
                        e.classList.add("wrong");
                    else e.classList.add("currect");
                });

                canNext = true;
            }, 800);
            // appTimer.innerText = `00:00`;
            timeCount = 30;
            clearInterval(timerFlage);
        }, 500);
    } else {
        // console.log("user clear!!");
        // appTimer.innerText = `00:00`;
        timeCount = 30;
        clearInterval(timerFlage);
    }
}

function playSound(params) {
    if (!isMuted) {
        if (params == "PlayCorrectAnsSound") {
            correctAudio.play();
        } else if (params == "PlayWrongAnsSound") {
            wrongAudio.play();
        } else if (params == "PlayNextButtonSound") {
            nextAudio.play();
        }
    }
}

function playSoundEventHandler(params) {
    // muteButton.removeEventListener("click", playSoundEventHandler, false);
    isMuted = !isMuted;

    if (isMuted) muteButton.firstElementChild.src = "../assets/icon _Volume Mute_.svg";
    else muteButton.firstElementChild.src = "../assets/icon _Volume Up_.svg";

    // console.log("is muted: ", isMuted);
}

muteButton.addEventListener("click", playSoundEventHandler, false);