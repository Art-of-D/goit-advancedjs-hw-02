const elements = {
    bodyBG: document.querySelector("body"),
    startButton: document.querySelector("[data-start]"),
    stopButton: document.querySelector("[data-stop]"),
}
elements.stopButton.disabled = true;
let isFirstClick = true;
let timerId;

elements.startButton.addEventListener('click', function () {
    elements.startButton.disabled = true;
    elements.stopButton.disabled = false;
    timerId = setBGColor();
});

elements.stopButton.addEventListener('click', function () {
    elements.stopButton.disabled = true;
    elements.startButton.disabled = false;
    isFirstClick = true;
    clearInterval(timerId);
});


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function autoSetBGColor() {
    elements.bodyBG.style.backgroundColor = getRandomHexColor();
}

function setBGColor() {
    if (isFirstClick) {
        autoSetBGColor();
        isFirstClick = false;
    }

    return setInterval(autoSetBGColor, 1000);
}