function mapNumber(number) {
    // Ensure the input number is within the range [0, 360]
    number = number % 360;
    if (number < 0) {
        number += 360;
    }

    // Map the number to the desired output range
    if (number <= 180) {
        // Map the number from [0, 180] to [90, 0]
        return 90 - number * (90 / 180);
    } else {
        // Map the number from (180, 360] to [0, -90]
        return -(number - 180) * (90 / 180);
    }
}
function progress(val) {
    let number = Math.min(Math.max(val, 0), 100);
    number = (number / 100) * 360;

    const root = document.querySelector(".outer-progress");
    // console.log(val, mapNumber(number));

    root.style.setProperty("--progress-size", number);
    root.style.setProperty("--progress-move", mapNumber(number));
}


const totleQue = JSON.parse(localStorage.getItem("quizeData")).gameCount + 1;
const correctAns = JSON.parse(localStorage.getItem("quizeData")).correctAns
console.log('your rank is: ', ((correctAns / totleQue) * 100).toFixed(2));
const score =  ((correctAns / totleQue) * 100).toFixed(1);

progress(100 - score)

document.querySelector(".green") .innerText = (Math.round(score) + "%");
document.querySelector(".red") .innerText = (Math.round(100 - score) + "%");
document.querySelector('.inner-progress').innerText = `${correctAns}/${totleQue}`


document.querySelector('main button').addEventListener('click', e=> {
    localStorage.clear();
    location.replace('http://127.0.0.1:5500/Quiz%20Time%20webapp')
})


const data = {
    title: 'Quize time webApp',
    description: 'click url and see my score!!',
    url: 'http://127.0.0.1:5500/Quiz%20Time%20webapp/routs/result.html'
}
document.querySelector('.share-elm').addEventListener('click', async (e)=> {
    try {
        await navigator.share(data);
    } catch (error) {
        console.log(error);
    }
    console.log('share clicked');
})