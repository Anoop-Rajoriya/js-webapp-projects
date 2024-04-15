console.log("script is running!");


if (document.querySelector(".hamburger-clicker")) {
    document.querySelector(".hamburger-clicker").addEventListener('click', (e) => {
        document.querySelector('header').classList.add("hamburger-click")
    })

    document.querySelector('.cross').addEventListener('click', (e) => {
        document.querySelector('header').classList.remove("hamburger-click");
    })

    document.querySelector("main").addEventListener('click', () => {
        if (document.querySelector('header').classList[0]) {

            document.querySelector('header').classList.remove('hamburger-click');
        }
    })
}