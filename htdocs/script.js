

const currentDate = document.querySelector(".current-date"),
      daysTag = document.querySelector(".days"),
      prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

let selectedDate = "";
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  // Previous month's trailing dates
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  // Current month days with event logic
  for (let i = 1; i <= lastDateofMonth; i++) {
    const fullDate = `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
    let eventDot = events[fullDate] ? '<span class="event-indicator">•</span>' : "";
    liTag += `<li class="${isToday} calendar-day" data-date="${fullDate}">${i}${eventDot}</li>`;
  }

  // Next month's leading dates
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  attachDayListeners();
};

function attachDayListeners() {
  document.querySelectorAll(".calendar-day").forEach(day => {
    day.addEventListener("click", () => {
      selectedDate = day.dataset.date;
      const savedEvents = events[selectedDate] || [];

      document.getElementById("eventDateTitle").innerText = `Events for ${selectedDate}`;

      const input = document.getElementById("eventInput");
      input.value = "";

      const eventList = document.getElementById("eventList");
      eventList.innerHTML = savedEvents.map((e, i) => `<li>${i + 1}. ${e}</li>`).join("");

      document.getElementById("eventModal").classList.remove("hidden");
    });
  });
}

function closeEventModal() {
  document.getElementById("eventModal").classList.add("hidden");
}

function saveEvent() {
  const input = document.getElementById("eventInput").value.trim();
  if (input !== "") {
    if (!events[selectedDate]) {
      events[selectedDate] = [];
    }
    events[selectedDate].push({ text: input, done: false });
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    renderEvents();
    renderCalendar();
    closeEventModal();
  }
}

function removeEvent() {
  if (events[selectedDate]) {
    delete events[selectedDate];
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    renderEvents();
    renderCalendar();
    closeEventModal();
  }
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
}


// Initial render
renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date(); // Reset to today's date
    }
    renderCalendar();
  });
});

function renderEvents() {
  // Calendar indicators
  document.querySelectorAll(".calendar-day").forEach(day => {
    const date = day.dataset.date;
    const existing = day.querySelector(".event-indicator");
    if (existing) existing.remove();
    if (events[date] && events[date].length > 0) {
      const span = document.createElement("span");
      span.classList.add("event-indicator");
      span.innerText = "• Event";
      day.appendChild(span);
    }
  });

  // Populate To-Do List
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const sortedDates = Object.keys(events).sort((a, b) => new Date(a) - new Date(b));
  sortedDates.forEach(date => {
    events[date].forEach((event, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = event.done || false;

      checkbox.addEventListener("change", () => {
        events[date][index].done = checkbox.checked;
        localStorage.setItem("calendarEvents", JSON.stringify(events));
        renderEvents(); // re-render for style
      });

      const label = document.createElement("span");
      label.textContent = `${date}: ${event.text}`;
      label.style.marginRight = "10px";
      if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        label.style.opacity = 0.6;
      }

      // ✏️ Edit Button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.style.marginLeft = "10px";
      editBtn.onclick = () => {
        const newText = prompt("Edit event:", event.text);
        if (newText !== null && newText.trim() !== "") {
          events[date][index].text = newText.trim();
          localStorage.setItem("calendarEvents", JSON.stringify(events));
          renderEvents();
        }
      };

      // 🗑️ Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.style.marginLeft = "5px";
      deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this event?")) {
          events[date].splice(index, 1);
          if (events[date].length === 0) delete events[date];
          localStorage.setItem("calendarEvents", JSON.stringify(events));
          renderEvents();
          renderCalendar();
        }
      };

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  });
}




// Digital Clock
setInterval(() => {
  const time = document.getElementById("time");
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day_night = "AM";
  if(hours > 12){
    day_night = "PM";
    hours = hours - 12;
  }
  if(hours == 0){
    hours = 12;
  }
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
});

// --- Clock ---
function updateClock() {
  const timeDisplay = document.getElementById("timeDisplay");
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  timeDisplay.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- Timer ---
let timerInterval;
let timerSeconds = 0;

function startTimer() {
  const hrs = parseInt(document.getElementById("timerHrs").value) || 0;
  const mins = parseInt(document.getElementById("timerMins").value) || 0;
  const secs = parseInt(document.getElementById("timerSecs").value) || 0;

  timerSeconds = hrs * 3600 + mins * 60 + secs;

  if (timerSeconds <= 0) return;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    } else {
      timerSeconds--;
      displayTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  document.getElementById("timerDisplay").textContent = "00:00:00";
  document.getElementById("timerHrs").value = "";
  document.getElementById("timerMins").value = "";
  document.getElementById("timerSecs").value = "";
}

function displayTimer() {
  const hrs = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById("timerDisplay").textContent = `${hrs}:${mins}:${secs}`;
}

// --- Stopwatch ---
let stopwatchInterval;
let stopwatchTime = 0;
function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    displayStopwatch();
  }, 1000);
}
function stopStopwatch() {
  clearInterval(stopwatchInterval);
}
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  document.getElementById("stopwatchDisplay").textContent = "00:00:00";
}
function displayStopwatch() {
  const hrs = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  const mins = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  const secs = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById("stopwatchDisplay").textContent = `${hrs}:${mins}:${secs}`;
}

// --- Tab Switching ---
document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  });

});

function getCurrentFormattedTime() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(date) {
  return date.toLocaleDateString('en-CA'); // format: YYYY-MM-DD
}

function timeIn() {
  const now = new Date();
  const time = formatTime(now);
  const date = formatDate(now);

  document.getElementById("timeInDisplay").innerText = `Time In: ${time}`;
  document.getElementById("dateInDisplay").innerText = `Date: ${date}`;

  localStorage.setItem("timeIn", JSON.stringify({ time, date }));
}

function timeOut() {
  const now = new Date();
  const time = formatTime(now);
  const date = formatDate(now);

  document.getElementById("timeOutDisplay").innerText = `Time Out: ${time}`;
  document.getElementById("dateOutDisplay").innerText = `Date: ${date}`;

  localStorage.setItem("timeOut", JSON.stringify({ time, date }));
}

function resetTimeLog() {
  localStorage.removeItem("timeIn");
  localStorage.removeItem("timeOut");

  document.getElementById("timeInDisplay").textContent = "Time In: --:--:--";
  document.getElementById("timeOutDisplay").textContent = "Time Out: --:--:--";
  document.getElementById("dateInDisplay").textContent = "Date: --/--/----";
  document.getElementById("dateOutDisplay").textContent = "Date: --/--/----";
}

function updateClockWithDate() {
  const now = new Date();

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', options);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const clockDisplay = document.getElementById("clockDisplay");
  if (clockDisplay) {
    clockDisplay.textContent = `${dateStr} `;
  }
}

// Start clock update every second
setInterval(updateClockWithDate, 1000);
updateClockWithDate(); // Initial call

// Load saved logs on refresh
window.addEventListener("load", () => {
  const savedTimeIn = localStorage.getItem("timeIn");
  const savedTimeOut = localStorage.getItem("timeOut");

  if (savedTimeIn) {
    const { time, date } = JSON.parse(savedTimeIn);
    document.getElementById("timeInDisplay").textContent = `Time In: ${time}`;
    document.getElementById("dateInDisplay").textContent = `Date: ${date}`;
  }

  if (savedTimeOut) {
    const { time, date } = JSON.parse(savedTimeOut);
    document.getElementById("timeOutDisplay").textContent = `Time Out: ${time}`;
    document.getElementById("dateOutDisplay").textContent = `Date: ${date}`;
  }
});
