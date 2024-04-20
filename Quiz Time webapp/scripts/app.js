const quizeData = {
    queArr: [],
    isPlayer: false,
    score: "0",
};

let count = 1;

const questionElm = document.querySelector('.question-container');
const optionElmArr = document.querySelectorAll('.option')

const gameStart = () => {
    console.log('Game start!!');
    // console.log(quizeData);
    console.log(quizeData.queArr[count]);

    // console.log(atob(quizeData.queArr[count].que));
    questionElm.innerText = atob(quizeData.queArr[count].que)
    // let randomKey = Math.floor(Math.random() * 4);
    // console.log(randomKey);
    // console.log(optionElmArr[randomKey]);
    let keyElm = optionElmArr[Math.floor(Math.random() * 4)];
    keyElm.innerText = atob(quizeData.queArr[count].ans);
    // console.log(keyElm);

    // console.log([...optionElmArr].filter(e=> e !== keyElm));
    const filteredNodeList = [...optionElmArr].filter(e=> e !== keyElm);
    // console.log(filteredNodeList, quizeData.queArr[count].option);
    console.log(Object.values(quizeData.queArr[count].option));
    Object.values(quizeData.queArr[count].option).forEach((opt, index) => {
        filteredNodeList[index].innerText = atob(opt);
    })
    
}


function fetchData(data) {
    // console.log(data?.results);
    if (data.results) {
        data.results.forEach((element) => {
            let question = {
                que: element.question,
                ans: element.correct_answer,
                option: {
                    op1: "",
                    op2: "",
                    op3: "",
                },
            };
            Object.keys(question.option).forEach((key, index) => {
                question.option[key] = element.incorrect_answers[index];
                // console.log('value pused!');
            });
            // console.log(question);
            quizeData.queArr.push(question);
        });

        // console.log(quizeData);
        setTimeout(()=>  localStorage.setItem("quizeData", JSON.stringify(quizeData)), 1000)
        console.log('data fatched!!!');
        gameStart();
    }
}

function fetchStoreData() {
    const data = JSON.parse(localStorage.getItem('quizeData'));
    // console.log(data.queArr);

    data.queArr.forEach((elm) => {
        // console.log(elm);
        const question = {
            que: elm.que,
            ans: elm.ans,
            option: {
                op1: elm.option.op1,
                op2: elm.option.op2,
                op3: elm.option.op3,
            }
        }

        quizeData.queArr.push(question)
        // console.log(question);

    })

    gameStart();
}

window.onload = () => {
    if (!localStorage.quizeData) {
        fetch(
            `https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&encode=base64`
        )
            .then((res) => res.json())
            .then(fetchData);
    }
    else{
        console.log("data available!!!");
        // console.log(JSON.parse(localStorage.getItem('quizeData')));
        fetchStoreData()
    }
};


