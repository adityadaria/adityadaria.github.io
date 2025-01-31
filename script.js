let timerInterval; 
let timeLeft; 
let isWorkSession = true; 
let sessionCount = 0;

// Get references to DOM elements
const progress = document.querySelector('.progress');
const radius = progress.r.baseVal.value; 
const circumference = 2 * Math.PI * radius; 
progress.style.strokeDasharray = `${circumference} ${circumference}`;

function updateProgress(percent) {
   const offset = circumference - (percent * circumference);
   progress.style.strokeDashoffset = offset; 
}

// Timer Modes
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');

// Event listeners for mode buttons
pomodoroBtn.addEventListener('click', () => setMode(25));
shortBreakBtn.addEventListener('click', () => setMode(5));
longBreakBtn.addEventListener('click', () => setMode(15));

function setMode(minutes) {
   clearInterval(timerInterval);
   timerInterval = null;

   timeLeft = minutes * 60; // Convert minutes to seconds
   updateDisplay();
   updateProgress(1);

   // Update active mode styling
   document.querySelectorAll('.timer-modes button').forEach(button => button.classList.remove('active-mode'));
   if (minutes === 25) pomodoroBtn.classList.add('active-mode');
   else if (minutes === 5) shortBreakBtn.classList.add('active-mode');
   else if (minutes === 15) longBreakBtn.classList.add('active-mode');
}

// Start the timer
function startTimer() {
   if (!timerInterval) {
      timerInterval = setInterval(() => {
         timeLeft--;
         updateDisplay();

         const totalTime = isWorkSession ? (25 * 60) : (5 * 60); // Total time for current session
         updateProgress(timeLeft / totalTime);

         if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            document.getElementById('alarm').play(); // Play alarm sound

            if (isWorkSession) {
               sessionCount++;
               document.getElementById('sessions').textContent = `Completed Sessions: ${sessionCount}`;
            }

            isWorkSession = !isWorkSession; // Switch session type
            setMode(isWorkSession ? 25 : 5); // Switch to next mode
         }
      }, 1000);
   }
}

// Pause the timer
function pauseTimer() {
   clearInterval(timerInterval);
   timerInterval = null; 
}

// Reset the timer
function resetTimer() {
   clearInterval(timerInterval);
   timerInterval = null;

   isWorkSession = true; // Reset to work session
   setMode(25); // Reset to Pomodoro mode

   sessionCount = 0; // Reset session count
   document.getElementById('sessions').textContent = `Completed Sessions: ${sessionCount}`;
}

// Update the timer display
function updateDisplay() {
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   document.getElementById('timer').textContent =
       `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize the app with Pomodoro mode by default
setMode(25); 
