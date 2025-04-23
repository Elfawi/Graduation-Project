// // async function getDailySchedule() {
// //   const { data, error } = await supaClient
// //     .from("calendar_event")
// //     .select("*")
// //     .eq("student_id", studentId)
// //     .gte("event_startdatetime", startStr)
// //     .lte("event_startdatetime", endStr);
// //   if (error) {
// //     return;
// //   }
// //   if (data) {
// //     return data;
// //   }
// // }

// // // renderDailyEvents(getDailySchedule());
// // // async function renderDailyEvents(eventsArray) {
// // //   const events = await eventsArray;
// // //   let markup = "";
// // //   events.forEach((event, index) => {
// // //     const day = new Date(event.event_startdatetime).getDay();
// // //     const eventDate = new Date(event.event_startdatetime).getDate();
// // //     const today = new Date().getDate();
// // //     if (eventDate === today) {
// // //       markup += `
// // //         <div class="daily__event daily__event-${day + 2}" data-day=${day}>
// // //                     <p class="daily__event-time">${new Date(
// // //                       event.event_startdatetime
// // //                     ).toLocaleTimeString()}</p>
// // //                     <p class="daily__event-title">${event.event_name}</p>
// // //                     <p class="daliy__event-description">
// // //                       ${event.event_details}
// // //                     </p>
// // //                   </div>`;
// // //     }
// // //   });

// // //   dailySchedule.insertAdjacentHTML("beforeend", markup);
// // // }
// // // document.addEventListener("DOMContentLoaded", () => {
// // //   document.querySelectorAll(".calendar__day").forEach((dayEl) => {
// // //     let markup = "";
// // //     // Clear previous events
// // //     dayEl.addEventListener("click", async (e) => {
// // //       const selectedDay = +e.target.textContent;
// // //       const { data, error } = await supaClient
// // //         .from("calendar_event")
// // //         .select("*")
// // //         .eq("student_id", studentId)
// // //         .gte("event_startdatetime", startStr)
// // //         .lte("event_startdatetime", endStr);
// // //       if (error) {
// // //         return;
// // //       }
// // //       if (data) {
// // //         data.forEach((event) => {
// // //           const day = new Date(event.event_startdatetime).getDay();
// // //           if (new Date(event.event_startdatetime).getDate() === selectedDay) {
// // //             const number = day === 6 ? day - 5 : day + 2;
// // //             markup += `
// // //                 <div class="daily__event daily__event-${number}" data-day=${selectedDay}>
// // //                         <p class="daily__event-time">${new Date(
// // //                           event.event_startdatetime
// // //                         ).toLocaleTimeString()}</p>
// // //                         <p class="daily__event-title">${event.event_name}</p>
// // //                         <p class="daliy__event-description">
// // //                           ${event.event_details}
// // //                         </p>
// // //                       </div>`;
// // //           }
// // //         });
// // //       }
// // //       dailySchedule.innerHTML = markup;
// // //       markup = "";
// // //     });
// // //   });
// // // });

// import { supaClient } from "../app.js";
// import { subtractDates } from "../utilities/dateCalc.js";
// import { endStr, startStr } from "./weeklyCalendar.js";
// const dailySchedule = document.querySelector(".daily__event-container");
// const studentId = sessionStorage.getItem("studentId");
// const hours = [...document.querySelectorAll(".hour")];
// let timeHours = [];
// async function getDailySchedule() {
//   const { data, error } = await supaClient
//     .from("calendar_event")
//     .select("*")
//     .eq("student_id", studentId);
//   // .gte("event_startdatetime", startStr)
//   // .lte("event_startdatetime", endStr);
//   if (error) {
//     return;
//   }
//   if (data) {
//     return data;
//   }
// }
// renderDailyEvents(getDailySchedule());

// async function renderDailyEvents(eventsArray) {
//   const events = await eventsArray;
//   let markup = "";
//   // timeHours = events.map((event) => event.event_startdatetime);
//   // console.log(timeHours);
//   // Sort events by start time
//   events.sort(
//     (a, b) => new Date(a.event_startdatetime) - new Date(b.event_startdatetime)
//   );

//   events.forEach((event, index, arr) => {
//     const day = new Date(event.event_startdatetime).getDay();
//     const eventDate = new Date(event.event_startdatetime).getDate();
//     const today = new Date().getDate();
//     if (eventDate === today) {
//       timeHours.push(event.event_startdatetime);
//       markup += `
//         <div class="daily__event daily__event-${day + 2}" data-day=${day}>
//           <p class="daily__event-time">${new Date(
//             event.event_startdatetime
//           ).toLocaleTimeString()}</p>
//           <p class="daily__event-title">${event.event_name}</p>
//           <p class="daliy__event-description">
//             ${event.event_details}
//           </p>
//         </div>`;
//     }
//   });
//   console.log(timeHours);
//   timeHours.forEach((time, index, arr) => {
//     hours[index].textContent = new Date(time).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//     hours[index].dataset.time = time;
//     hours[index].dataset.index = index;
//     hours.length = timeHours.length;
//   });
//   console.log(timeHours);
//   console.log(hours);
//   dailySchedule.insertAdjacentHTML("beforeend", markup);
// }

// export function attachDayClickListeners() {
//   document.querySelectorAll(".calendar__day").forEach((dayEl) => {
//     let markup = "";
//     // Clear previous events
//     dayEl.addEventListener("click", async (e) => {
//       const selectedDay = +e.target.textContent;

//       // Get the month and year information
//       const elementMonth = parseInt(dayEl.dataset.month);
//       const elementYear = parseInt(dayEl.dataset.year);

//       const { data, error } = await supaClient
//         .from("calendar_event")
//         .select("*")
//         .eq("student_id", studentId);
//       // .gte("event_startdatetime", startStr)
//       // .lte("event_startdatetime", endStr);

//       if (error) {
//         return;
//       }

//       if (data) {
//         // Sort events by start time
//         data.sort(
//           (a, b) =>
//             new Date(a.event_startdatetime) - new Date(b.event_startdatetime)
//         );

//         data.forEach((event) => {
//           const eventDate = new Date(event.event_startdatetime);
//           const eventDay = eventDate.getDate();
//           const eventMonth = eventDate.getMonth();
//           const eventYear = eventDate.getFullYear();

//           // Check if the event matches the selected day AND the correct month and year
//           if (
//             eventDay === selectedDay &&
//             eventMonth === elementMonth &&
//             eventYear === elementYear
//           ) {
//             const day = eventDate.getDay();
//             const number = day === 6 ? day - 5 : day + 2;

//             markup += `
//               <div class="daily__event daily__event-${number}" data-day=${selectedDay}>
//                 <p class="daily__event-time">${eventDate.toLocaleTimeString()}</p>
//                 <p class="daily__event-title">${event.event_name}</p>
//                 <p class="daliy__event-description">
//                   ${event.event_details}
//                 </p>
//               </div>`;
//           }
//         });
//       }

//       dailySchedule.innerHTML =
//         markup || `<p class="no-events">No events for this day</p>`;
//       markup = "";
//     });
//   });
// }
// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize the click listeners for the initial calendar render
//   attachDayClickListeners();
// });
import { supaClient } from "../app.js";
import { subtractDates } from "../utilities/dateCalc.js";
import { endStr, startStr } from "./weeklyCalendar.js";
const dailySchedule = document.querySelector(".daily__event-container");
const studentId = sessionStorage.getItem("studentId");
const hoursContainer = document.querySelector(".time");
const time = document.querySelector(".time");
// Helper function to format time in a readable format
function formatTimeDisplay(dateTimeStr) {
  return new Date(dateTimeStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Helper function to clear and rebuild hours display
function updateHoursDisplay(timeArray) {
  // Clear existing hours
  hoursContainer.innerHTML = "";

  // If no events, display default hours
  if (!timeArray || timeArray.length === 0) {
    const defaultHours = [
      "8:00 AM",
      "10:00 AM",
      "12:00 PM",
      "2:00 PM",
      "4:00 PM",
      "6:00 PM",
      "8:00 PM",
    ];
    defaultHours.forEach((time) => {
      const hourElement = document.createElement("div");
      hourElement.className = "hour";
      hourElement.textContent = time;
      hoursContainer.appendChild(hourElement);
    });
    return;
  }

  // Sort times chronologically
  timeArray.sort((a, b) => new Date(a) - new Date(b));

  // Create hour elements for each time
  timeArray.forEach((time, index) => {
    const hourElement = document.createElement("div");
    hourElement.className = "hour";
    hourElement.textContent = formatTimeDisplay(time);
    hourElement.dataset.time = time;
    hourElement.dataset.index = index;
    hoursContainer.appendChild(hourElement);
  });
}

async function getDailySchedule() {
  const { data, error } = await supaClient
    .from("calendar_event")
    .select("*")
    .eq("student_id", studentId);

  if (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }

  return data || [];
}

// Display today's events by default
renderDailyEvents(getDailySchedule());

async function renderDailyEvents(eventsPromise) {
  const events = await eventsPromise;
  let markup = "";
  let timeHours = [];

  // Sort events by start time
  events.sort(
    (a, b) => new Date(a.event_startdatetime) - new Date(b.event_startdatetime)
  );

  const today = new Date().getDate();

  events.forEach((event) => {
    const eventDate = new Date(event.event_startdatetime);
    const eventDay = eventDate.getDate();

    if (eventDay === today) {
      timeHours.push(event.event_startdatetime);
      const day = eventDate.getDay();
      const number = day === 6 ? day - 5 : day + 2;

      markup += `
        <div class="daily__event daily__event-${number} ${
        event.event_type === "student event" ? "student-event" : ""
      }" data-day=${day}>
          <p class="daily__event-time">${formatTimeDisplay(
            event.event_startdatetime
          )}</p>
          <p class="daily__event-title">${event.event_name}</p>
          <p class="daliy__event-description">
            ${event.event_details}
          </p>
        </div>`;
    }
  });

  // Update hours display
  updateHoursDisplay(timeHours);

  // Update events display
  dailySchedule.innerHTML =
    markup || `<p class="no-events">No events for today</p>`;
}

export function attachDayClickListeners() {
  document.querySelectorAll(".calendar__day").forEach((dayEl) => {
    dayEl.addEventListener("click", async (e) => {
      // Clear previous content
      dailySchedule.innerHTML = "";
      let markup = "";
      let selectedTimeHours = [];

      const selectedDay = +e.target.textContent;
      const elementMonth = parseInt(dayEl.dataset.month);
      const elementYear = parseInt(dayEl.dataset.year);

      const { data, error } = await supaClient
        .from("calendar_event")
        .select("*")
        .eq("student_id", studentId);

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }

      if (data) {
        // Sort events by start time
        data.sort(
          (a, b) =>
            new Date(a.event_startdatetime) - new Date(b.event_startdatetime)
        );

        data.forEach((event) => {
          const eventDate = new Date(event.event_startdatetime);
          const eventDay = eventDate.getDate();
          const eventMonth = eventDate.getMonth();
          const eventYear = eventDate.getFullYear();

          // Check if the event matches the selected day AND the correct month and year
          if (
            eventDay === selectedDay &&
            eventMonth === elementMonth &&
            eventYear === elementYear
          ) {
            selectedTimeHours.push(event.event_startdatetime);
            const day = eventDate.getDay();
            const number = day === 6 ? day - 5 : day + 2;

            markup += `
              <div class="daily__event daily__event-${number} ${
              event.event_type === "student event" ? "student-event" : ""
            }" data-day=${selectedDay}>
                <p class="daily__event-time">${formatTimeDisplay(
                  event.event_startdatetime
                )}</p>
                <p class="daily__event-title">${event.event_name}</p>
                <p class="daliy__event-description">
                  ${event.event_details}
                </p>
              </div>`;
          }
        });
      }
      // Update hours display with the selected day's events
      updateHoursDisplay(selectedTimeHours);
      // Update events display
      dailySchedule.innerHTML =
        markup || `<p class="no-events">No events for this day</p>`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the click listeners for the initial calendar render
  attachDayClickListeners();
});
