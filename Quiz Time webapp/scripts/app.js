let quizeData = {
    queArr: [],
    isPlayer: false,
    score: "0",
    gameCount: 0,
};

const questionElm = document.querySelector(".question-container");
const optionElmArr = document.querySelectorAll(".option");
const appCounter = document.querySelector(".question-counter");
const appTimer = document.querySelector(".question-timer");
const nextElm = document.querySelector(".next");

let showAnsTimeout;
let canNext = false;

if (!localStorage.quizeData) {
    try {
        fetch(
            `https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&encode=base64`
        )
            .then((res) => res.json())
            .then(fetchData);
    } catch (error) {
        console.log(error, "please reload page data not fetched!");
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
    if (
        params.target.innerText ==
        atob(quizeData.queArr[quizeData.gameCount].ans)
    ) {
        // console.log('currect ans');
        params.target.classList.add("currect");
    } else {
        // console.log('wrong ans')
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

    canNext = true;
}

function nextLevel(params) {
    console.log('hello');
    nextElm.removeEventListener("click", nextLevel, false);
    clearTimeout(showAnsTimeout);
    if (!canNext) return;
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
        gameEnd()
    }
}

function gameEnd(params) {
    console.log("game end !!!!!");
}