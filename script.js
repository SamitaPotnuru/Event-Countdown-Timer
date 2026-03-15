let countdownInterval;
const events = {}; // store events with name: date

// pad 2-digit numbers
function pad(num) {
  return num.toString().padStart(2, "0");
}

// Update flip animation
function updateFlip(id, value) {
  const el = document.getElementById(id);
  const top = el.querySelector(".top");
  const bottom = el.querySelector(".bottom");

  if (top.textContent !== value) {
    top.textContent = value;
    bottom.textContent = value;

    el.style.transform = "rotateX(180deg)";
    setTimeout(() => el.style.transform = "rotateX(0deg)", 300);
  }
}

// Start countdown
function startCountdown(eventDate) {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.querySelector(".countdown").innerHTML = "🎉 Event Started!";
      return;
    }

    const days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

    updateFlip("days", days);
    updateFlip("hours", hours);
    updateFlip("minutes", minutes);
    updateFlip("seconds", seconds);
  }, 1000);
}

// Add / update event
document.getElementById("add-event-btn").addEventListener("click", () => {
  const name = document.getElementById("event-name-input").value.trim();
  const dateInput = document.getElementById("event-date-input").value;

  if(!name || !dateInput) {
    alert("Enter event name and date!");
    return;
  }

  const eventDate = new Date(dateInput).getTime();
  events[name] = eventDate;

  const select = document.getElementById("event-list");
  if(!Array.from(select.options).some(option => option.value === name)) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  }

  select.value = name;
  document.getElementById("event-name-display").textContent = name;
  document.querySelector(".countdown-container").classList.remove("hidden");

  startCountdown(eventDate);
});

// Change event
document.getElementById("event-list").addEventListener("change", (e) => {
  const selected = e.target.value;
  const eventDate = events[selected];

  document.getElementById("event-name-display").textContent = selected;
  document.querySelector(".countdown-container").classList.remove("hidden");

  startCountdown(eventDate);
});
