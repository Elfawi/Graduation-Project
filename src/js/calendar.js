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
const eventModal = document.querySelector(".event-modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
btnCloseModal.addEventListener("click", hideEventModal);
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    selectableHelper: true,
    select: function () {
      showEventModal();
    },
    dayRender: function (date, cell) {
      cell.css("background", "red");
      console.log(cell);
      console.log(date);
    },
    headerToolbar: {
      right: "prev,today,next",
      center: "title",
      left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      // center: "addEventButton",
    },
    footerToolbar: {
      // left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      center: "addEventButton",
    },
    buttonText: {
      today: "Today",
      dayGridMonth: "Month",
      timeGridWeek: "Week",
      timeGridDay: "Day",
      listWeek: "Events",
    },
    events: [
      {
        id: "a",
        title: "my event",
        start: "2025-02-01",
        end: "2025-02-04",
        color: "var(--color-primary)",
      },
      {
        id: "b",
        title: "my event 2",
        start: "2025-02-02",
        end: "2025-02-05",
        color: "var(--color-primary-dark)",
        textColor: "var(--color-grey-light-1)",
      },
    ],
    views: {
      dayGridMonth: {
        // name of view
        // titleFormat: { year: "2-digit", month: "2-digit", day: "2-digit" },
        // other view-specific options here
      },
    },
    // initialView: "dayGridMonth",
    // eventColor: "#ff0000",
    dateClick: function (info) {
      // alert("a day has been clicked!");
      console.log("clicked on " + info.dateStr); // geting the clicked date
      // info.dayEl.style.backgroundColor = "#8b30cd";
      // console.log(info.resource);
    },
    customButtons: {
      addEventButton: {
        text: "add event...",
        click: function () {
          // var dateStr = prompt("Enter a date in YYYY-MM-DD format");
          // var date = new Date(dateStr + "T00:00:00"); // will be in local time
          // console.log(date.valueOf());

          showEventModal();
          //   /// isNaN IS A FUNCTION THAT RETURN TRUE IF CONVERTED TO INT SUCCESSFULY
          // if (!isNaN(date.valueOf())) {
          //   // console.log(isNaN(date.valueOf));
          //   // valid?
          //   calendar.addEvent({
          //     // title: "dynamic event",
          //     title: prompt("Event title"),
          //     start: date,
          //     allDay: true,
          //   });
          //   calendar.addEvent(calendar.events[1]);
          //   alert("Great. Now, update your database...");
          // } else {
          //   alert("Invalid date.");
          // }
        },
      },
    },
  });
  calendar.render();
});

document.addEventListener("click", function (e) {
  // console.log(
  //   // e.target.closest(".event-modal").classList.contains("event-modal")
  // );
  // const modal = e.target
  //   .closest(".event-modal")
  //   .classList.contains("modal-show");
  // console.log(modal);
  if (
    e.target.closest(".event-modal") !== eventModal &&
    e.target.type !== "button"
  ) {
    hideEventModal();
  }
});
// calendar.on("dateClick", function (info) {
//   console.log("clicked on " + info.dateStr); // geting the clicked date
//   console.log(info);
//   // info.dayEl.querySelector(".fc-daygrid-day-events").textContent = "hello";
// });
////////////////////////// Calendar Events
// calendar.addEvent(event[prompt("enter date")]);

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
