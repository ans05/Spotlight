// Pomodoro Timer
let timerInterval;
let timeLeft = 1500; // 25 minutes in seconds
const timerDisplay = document.getElementById('timer');

document.getElementById('start-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
      clearInterval(timerInterval);
      alert('Time is up! Take a break.');
    }
  }, 1000);
});

document.getElementById('reset-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timeLeft = 1500;
  timerDisplay.textContent = '25:00';
});

// Task Manager
const taskList = document.getElementById('task-list');
document.getElementById('add-task').addEventListener('click', () => {
  const taskInput = document.getElementById('new-task');
  if (taskInput.value) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskInput.value;
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
});

// Website Blocker
const blockedList = document.getElementById('blocked-list');
document.getElementById('block-site').addEventListener('click', () => {
  const blockUrl = document.getElementById('block-url').value;
  if (blockUrl) {
    const blockedItem = document.createElement('li');
    blockedItem.textContent = blockUrl;
    blockedList.appendChild(blockedItem);
    chrome.storage.sync.set({ [blockUrl]: true });
    document.getElementById('block-url').value = '';
  }
});

// Load blocked websites from storage
chrome.storage.sync.get(null, (items) => {
  Object.keys(items).forEach((url) => {
    const blockedItem = document.createElement('li');
    blockedItem.textContent = url;
    blockedList.appendChild(blockedItem);
  });
});