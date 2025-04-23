import { supaClient } from "../app.js";
import { subtractDates } from "../utilities/dateCalc.js";

const userName = document.querySelector(".user__name");
function updateWeekCalendar() {
  // Get current date
  const today = new Date();

  // Find what day of the week today is (0 = Sunday, 1 = Monday, etc.)
  const currentDayOfWeek = today.getDay();

  // Calculate the start date (Saturday)
  // In JavaScript, 0 is Sunday, so 6 is Saturday
  // We need to find the most recent Saturday
  const startDate = new Date(today);
  const daysToSubtract = currentDayOfWeek === 6 ? 0 : currentDayOfWeek + 1;
  startDate.setDate(today.getDate() - daysToSubtract);

  // Get all day boxes
  const dayBoxes = document.querySelectorAll(".week__calendar-day-box");

  // Update each day box with the correct date
  dayBoxes.forEach((dayBox, index) => {
    // Calculate the date for this box
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    // Update the day number
    const dayNumber = dayBox.querySelector(".day__number");
    dayNumber.textContent = date.getDate();

    // Highlight current day if it matches today
    const isSameDate =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isSameDate) {
      dayBox.classList.add("current-day");
    } else {
      dayBox.classList.remove("current-day");
    }
  });
}

// Function to advance the calendar to the next week
function nextWeek() {
  const firstDayNumber = document.querySelector(".day__number").textContent;
  const startDate = new Date();

  // Set the date to the first displayed day plus 7
  startDate.setDate(parseInt(firstDayNumber) + 7);
  updateWeekWithDate(startDate);
}

// Function to go back to the previous week
function prevWeek() {
  const firstDayNumber = document.querySelector(".day__number").textContent;
  const startDate = new Date();

  // Set the date to the first displayed day minus 7
  startDate.setDate(parseInt(firstDayNumber) - 7);
  updateWeekWithDate(startDate);
}

// Update the calendar with a specific date as reference
function updateWeekWithDate(referenceDate) {
  // Calculate the Saturday of the week containing the reference date
  const referenceDayOfWeek = referenceDate.getDay();
  const startDate = new Date(referenceDate);
  const daysToSubtract = referenceDayOfWeek === 6 ? 0 : referenceDayOfWeek + 1;
  startDate.setDate(referenceDate.getDate() - daysToSubtract);

  // Get all day boxes
  const dayBoxes = document.querySelectorAll(".week__calendar-day-box");

  // Update each day box with the correct date
  dayBoxes.forEach((dayBox, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    // Update the day number
    const dayNumber = dayBox.querySelector(".day__number");
    dayNumber.textContent = date.getDate();
    // You might want to update the day names too if needed
    // const dayName = dayBox.querySelector('.day__name');
    // const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // dayName.textContent = dayNames[date.getDay()];
  });
}

// Run the update when the page loads
document.addEventListener("DOMContentLoaded", function () {
  updateWeekCalendar();

  // Example of how to add navigation buttons
  // If you have navigation buttons, you can add event listeners like this:
  // document.getElementById("prev-week-btn").addEventListener("click", prevWeek);
  // document.getElementById("next-week-btn").addEventListener("click", nextWeek);
});

// Optional: Update the calendar every day at midnight
// This is useful if your website stays open for long periods
function scheduleNextUpdate() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeUntilMidnight = tomorrow - now;

  setTimeout(() => {
    updateWeekCalendar();
    scheduleNextUpdate(); // Schedule the next update
  }, timeUntilMidnight);
}

// Start the schedule
scheduleNextUpdate();
// console.log(supaClient);
////////////////////////////////////////

//////////////////////////////////////////////////////////
const saturdayRow = document.querySelector(".saturday__row");
const sundayRow = document.querySelector(".sunday__row");
const mondayRow = document.querySelector(".monday__row");
const tuesdayRow = document.querySelector(".tuesday__row");
const wednesdayRow = document.querySelector(".wednesday__row");
const thursdayRow = document.querySelector(".thursday__row");
const fridayRow = document.querySelector(".friday__row");

const today = new Date();

const dayOfWeek = today.getDay();
const diffToSaturday = (dayOfWeek + 1) % 7;
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - diffToSaturday);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);
endOfWeek.setHours(23, 59, 59, 999);

export const startStr = startOfWeek.toISOString();
export const endStr = endOfWeek.toISOString();

const middleSide = document.querySelector(".middle__side");
const dayRow = document.querySelector(".day__row");
const studentId = sessionStorage.getItem("studentId");
console.log("studentId", studentId);
async function getCalendarEvents() {
  const { data, error } = await supaClient
    .from("calendar_event")
    .select("*")
    .eq("student_id", studentId)
    .gte("event_startdatetime", startStr)
    .lte("event_startdatetime", endStr);

  if (error) {
    console.error("Error fetching calendar events:", error);
    return null;
  }
  if (data) {
    console.log(data);
    return data;
  }
}

async function renderWeeklyEvents(eventsArray) {
  console.log("eventsArray", eventsArray);
  const events = await eventsArray;
  events.sort(
    (a, b) => new Date(b.event_startdatetime) - new Date(a.event_startdatetime)
  );
  if (!events) {
    console.error("No events found for the week.");
    return;
  }
  events.forEach((event) => {
    const eventNameLength = event.event_name.length;
    // console.log(event.event_name.split(" "));
    const day = new Date(event.event_startdatetime).getDay();
    if (day === 0) {
      // Sunday
      sundayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 1) {
      // Monday
      mondayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 2) {
      // Tuesday
      tuesdayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 3) {
      // Wednesday
      wednesdayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 4) {
      // Thursday
      thursdayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 5) {
      // Friday
      fridayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day + 2}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
    if (day === 6) {
      // Saturday
      saturdayRow.insertAdjacentHTML(
        "afterbegin",
        `<div class="day__event day-${day - 5}__event ${
          event.event_type === "student event" ? "student-event" : ""
        }">
            <div class="event__time__left">${subtractDates(
              new Date(event.event_enddatetime),
              new Date(event.event_startdatetime)
            )} min</div>
            <div class="event__type" style="font-size:${
              eventNameLength > 8 && 12
            }px">${event.event_name}</div>
          </div>`
      );
    }
  });
}
renderWeeklyEvents(getCalendarEvents());
// getCalendarEvents();
{
  /* <div class="event__time__left">${subtractDates(
  new Date(event.event_enddatetime),
  new Date(event.event_startdatetime)
)} min</div> */
}
async function getName() {
  const { data, error } = await supaClient
    .from("student")
    .select("student_name")
    .eq("student_id", studentId);
  if (error) {
    console.error("Error fetching calendar events:", error);
    return null;
  }
  if (data) {
    const name = data[0].student_name;
    userName.textContent = name;
  }
}
getName();
