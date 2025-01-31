// Timer Variables
let timerInterval;
let timeLeft = 25 * 60; // Default to 25 minutes
let isRunning = false;
let currentMode = "Pomodoro"; // Default mode
const taskList = [];

// DOM Elements
const timerDisplay = document.getElementById("timer");
const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const taskInput = document.getElementById("task-input");
const tasksContainer = document.getElementById("tasks");

// Timer Modes
pomodoroBtn.addEventListener("click", () => setMode("Pomodoro", 25));
shortBreakBtn.addEventListener("click", () => setMode("Short Break", 5));
longBreakBtn.addEventListener("click", () => setMode("Long Break", 15));

// Set Timer Mode
function setMode(mode, minutes) {
    clearInterval(timerInterval);
    timeLeft = minutes * 60;
    currentMode = mode;
    updateDisplay();
    updateActiveButton(mode);
    isRunning = false;
}

// Update Active Button Styling
function updateActiveButton(mode) {
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
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert(`${currentMode} session completed!`);
                // Auto-switch to next mode
                if (currentMode === "Pomodoro") setMode("Short Break", 5);
                else setMode("Pomodoro", 25);
            }
        }, 1000);
    }
}

// Pause Timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    if (currentMode === "Pomodoro") setMode("Pomodoro", 25);
    else if (currentMode === "Short Break") setMode("Short Break", 5);
    else setMode("Long Break", 15);
}

// Update Timer Display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Add Task to Task List
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        taskList.push(taskText);
        renderTasks();
        taskInput.value = "";
    }
}

// Render Task List
function renderTasks() {
    tasksContainer.innerHTML = ""; // Clear existing tasks
    taskList.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `#${index + 1} ${task}`;
        tasksContainer.appendChild(taskItem);
    });
}
