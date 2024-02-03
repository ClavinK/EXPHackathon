let timer;
let minutes = 25;
let seconds = 0;

function startTimer() {
    document.getElementById("startBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false;

    timer = setInterval(function () {
        updateTimer();
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            resetTimer();
        }
    }, 1000);
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }

    document.getElementById("time").innerText = formatTime();
}

function resetTimer() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    document.getElementById("time").innerText = formatTime();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("resetBtn").disabled = true;
}

function formatTime() {
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
