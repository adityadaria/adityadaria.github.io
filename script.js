let timerInterval;
let timeLeft;
let isWorkSession = true;
let sessionCount = 0;

const progress = document.querySelector('.progress');
const radius = progress.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progress.style.strokeDasharray = `${circumference} ${circumference}`;

function updateProgress(percent) {
    const offset = circumference - (percent * circumference);
    progress.style.strokeDashoffset = offset;
}

function startTimer() {
    if (!timerInterval) {
        const workDuration = document.getElementById('workTime').value * 60;
        const breakDuration = document.getElementById('breakTime').value * 60;
        
        if (!timeLeft) {
            timeLeft = isWorkSession ? workDuration : breakDuration;
        }

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            const totalTime = isWorkSession ? workDuration : breakDuration;
            updateProgress(timeLeft / totalTime);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                document.getElementById('alarm').play();
                
                if (isWorkSession) {
                    sessionCount++;
                    document.getElementById('sessions').textContent = `Completed Sessions: ${sessionCount}`;
                }
                
                isWorkSession = !isWorkSession;
                timeLeft = null;
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isWorkSession = true;
    timeLeft = document.getElementById('workTime').value * 60;
    sessionCount = 0;
    document.getElementById('sessions').textContent = `Completed Sessions: 0`;
    updateDisplay();
    updateProgress(1);
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize timer
resetTimer();
