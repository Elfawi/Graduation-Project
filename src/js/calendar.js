// calendar.on("dateClick", function (info) {
//   console.log("clicked on " + info.dateStr); // geting the clicked date
//   console.log(info);
//   // info.dayEl.querySelector(".fc-daygrid-day-events").textContent = "hello";
// });
////////////////////////// Calendar Events
// calendar.addEvent(event[prompt("enter date")]);
const event = {
  events: [
    {
      id: "a",
      title: "my event",
      start: "2018-09-01",
    },
  ],
  addEvent: function (event) {
    this.events.push(event);
  },
};

const addEventButton = document.querySelector(".add__event-btn");
const eventModal = document.querySelector(".event-modal");

const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
overlay.style.height = document.body.clientHeight + "px";
btnCloseModal.addEventListener("click", hideEventModal);
addEventButton.addEventListener("click", showEventModal);
function showEventModal() {
  eventModal.classList.remove("modal-hidden");
  eventModal.classList.add("modal-show");
  overlay.style.display = "block";
}

function hideEventModal() {
  eventModal.classList.remove("modal-show");
  eventModal.classList.add("modal-hidden");
  overlay.style.display = "none";
}
document.addEventListener("click", function (e) {
  // console.log(
  //   // e.target.closest(".event-modal").classList.contains("event-modal")
  // );
  // const modal = e.target
  //   .closest(".event-modal")
  //   .classList.contains("modal-show");
  // console.log(modal);
  if (e.target.closest(".event-modal") !== eventModal && e.target === overlay) {
    hideEventModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Destructure the Calendar constructor
  const { Calendar } = window.VanillaCalendarPro;
  // Create a calendar instance and initialize it.
  const optionsFull = {
    dateToday: "today",
    selectedTheme: "light",
    selectedMonth: 2,
    selectedYear: 2025,
    onClickDate(self, event) {
      console.log(event);
      console.log(self.context.selectedDates);
    },
    selectionDatesMode: "multiple",
  };
  const calendarfull = new Calendar("#calendar", optionsFull);

  calendarfull.init();
  // calendarfull.update({
  //   dates: true,
  //   holidays: false,
  //   time: true,
  // });
});

const height = window.outerHeight;
console.log(height);
console.log(window.screen.availHeight);
