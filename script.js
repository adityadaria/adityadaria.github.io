let timerInterval;
let timeLeft = 25 * 60; // Initial time in seconds

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        }, 1000);
    }
    // Add to startTimer() function
const progress = document.querySelector('.progress');
const radius = progress.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progress.style.strokeDasharray = `${circumference} ${circumference}`;
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
