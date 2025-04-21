import { supaClient } from "../app.js";
const startInput = document.getElementById("event-start-date");
const endInput = document.getElementById("event-end-date");
const saveEventBtn = document.getElementById("save-event");
const studentId = sessionStorage.getItem("studentId");
const addEventForm = document.getElementById("event-form");
// 1. Set min start date to today
const today = new Date().toISOString().slice(0, 16);
startInput.min = today;

// 2. Set min end date to selected start date
startInput.addEventListener("change", () => {
  const selectedStart = startInput.value;
  endInput.min = selectedStart;
  if (endInput.value && endInput.value <= selectedStart) {
    endInput.value = "";
  }
});

// 3. Optional: check that end date is after start
endInput.addEventListener("change", () => {
  if (endInput.value <= startInput.value) {
    alert("End date must be after start date!");
    endInput.value = "";
  }
});

// 4. Save event to database
addEventForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission
  const title = document.getElementById("event-title").value;
  const startDate = document.getElementById("event-start-date").value;
  const endDate = document.getElementById("event-end-date").value;
  const description = document.getElementById("event-description").value;
  if (!title || !startDate || !endDate || !description) {
    alert("Please fill in all fields!");
    return;
  }
  const { data, error } = await supaClient
    .from("calendar_event")
    .insert({
      event_name: title,
      event_startdatetime: startDate,
      event_enddatetime: endDate,
      event_type: null,
      event_details: description,
      student_id: studentId,
    })
    .select("*");
  if (error) {
    console.error("Error inserting event:", error);
    return;
  }
  if (data) {
    console.log("Event inserted:", data);
    alert("Event saved successfully!");
    window.location.href = "calendar.html"; // Redirect to the calendar page
  }
});
// saveEventBtn.addEventListener("click", async (e) => {});
