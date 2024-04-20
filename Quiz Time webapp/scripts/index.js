window.onload = () => {
    const elm = document.querySelector("#score-elm");

    if (localStorage.quizeData) {
        console.log("that's the player!!!");

        if (JSON.parse(localStorage.quizeData).isPlayer) {
            console.log(elm);
            elm.querySelector("span").innerText = JSON.parse(localStorage.quizeData).score;
            elm.style.visibility = "visible";
        }
    } else {
        console.log("new player!!!");
    }
};
