window.onload = () => {
    const elm = document.querySelector("#score-elm");

    if (localStorage.quizeData) {
        // console.log("that's the player!!!");
        console.log(JSON.parse(localStorage.quizeData).correctAns);

        if (JSON.parse(localStorage.quizeData).isPlayer) {
            console.log(elm);
            // elm.innerText = JSON.parse(localStorage.quizeData).correctAns;
            const score = JSON.parse(localStorage.quizeData).correctAns / 25 * 100
            console.log(score);
            elm.innerText = `highest score: ${score}`;
            // ((correctAns / totleQue) * 100).toFixed(1)
            elm.style.visibility = "visible";
        }
    } else {
        console.log("new player!!!");
    }
};


document.querySelector('.app-wraper button').addEventListener('click', e=> {
    console.log('click');
    location.replace('http://127.0.0.1:5500/Quiz%20Time%20webapp/routs/app.html')
})