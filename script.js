// Timer Variables 
let timerInterval = null; 
let timeLeft = 25 * 60; // Default to Pomodoro (25 minutes)
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const taskInput = document.getElementById("task-input");
const tasksContainer = document.getElementById("tasks");

// Set Timer Mode
function setMode(mode, minutes) {
   clearInterval(timerInterval);
   timerInterval = null;

   timeLeft = minutes * 60; // Convert minutes to seconds
   updateDisplay();
   updateActiveMode(mode);
   isRunning = false;

   document.getElementById("start-btn").textContent = "Start"; // Reset button text
}

// Update Active Mode Button Styling
function updateActiveMode(mode) {
   [pomodoroBtn, shortBreakBtn, longBreakBtn].forEach((btn) =>
       btn.classList.remove("active-mode")
   );
   if (mode === "Pomodoro") pomodoroBtn.classList.add("active-mode");
   else if (mode === "Short Break") shortBreakBtn.classList.add("active-mode");
   else if (mode === "Long Break") longBreakBtn.classList.add("active-mode");
}

// Start Timer
function startTimer() {
   if (!isRunning) {
       isRunning = true;

       document.getElementById("start-btn").textContent = "Pause";

       timerInterval = setInterval(() => {
           if (timeLeft > 0) {
               timeLeft--;
               updateDisplay();
           } else {
               clearInterval(timerInterval);
               isRunning = false;

               document.getElementById("alarm").play(); // Play alarm sound

               alert("Time's up!");
           }
       }, 1000);
   } else {
       pauseTimer();
   }
}

// Pause Timer
function pauseTimer() {
   clearInterval(timerInterval);
   isRunning = false;

   document.getElementById("start-btn").textContent = "Start";
}

// Reset Timer
function resetTimer() {
   clearInterval(timerInterval);
   isRunning = false;

   if (pomodoroBtn.classList.contains("active-mode")) setMode("Pomodoro", 25);
   else if (shortBreakBtn.classList.contains("active-mode")) setMode("Short Break", 5);
   else if (longBreakBtn.classList.contains("active-mode")) setMode("Long Break", 15);
}

// Update Display
function updateDisplay() {
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   timerDisplay.textContent =
       `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Add Task
function addTask() {
   const taskText = taskInput.value.trim();

   if (taskText !== "") {
       const taskItem = document.createElement("li");
       taskItem.textContent = taskText;

       tasksContainer.appendChild(taskItem);
       taskInput.value = ""; // Clear input field
   }
}

// Event Listeners for Mode Buttons
pomodoroBtn.addEventListener("click", () => setMode("Pomodoro", 25));
shortBreakBtn.addEventListener("click", () => setMode("Short Break", 5));
longBreakBtn.addEventListener("click", () => setMode("Long Break", 15));

// Initialize Default Mode
setMode("Pomodoro", 25);
