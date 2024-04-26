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
            elm.innerText = `Your score: ${score}`;
            // ((correctAns / totleQue) * 100).toFixed(1)
            elm.style.visibility = "visible";
        }
    } else {
        console.log("new player!!!");
    }
};


document.querySelector('.app-wraper button').addEventListener('click', e=> {
    console.log('click');
    location.replace('https://anoop-rajoriya.github.io/js-webapp-projects/Quiz%20Time%20webapp/routs/app.html')
})