// async function getDailySchedule() {
//   const { data, error } = await supaClient
//     .from("calendar_event")
//     .select("*")
//     .eq("student_id", studentId)
//     .gte("event_startdatetime", startStr)
//     .lte("event_startdatetime", endStr);
//   if (error) {
//     return;
//   }
//   if (data) {
//     return data;
//   }
// }

// // renderDailyEvents(getDailySchedule());
// // async function renderDailyEvents(eventsArray) {
// //   const events = await eventsArray;
// //   let markup = "";
// //   events.forEach((event, index) => {
// //     const day = new Date(event.event_startdatetime).getDay();
// //     const eventDate = new Date(event.event_startdatetime).getDate();
// //     const today = new Date().getDate();
// //     if (eventDate === today) {
// //       markup += `
// //         <div class="daily__event daily__event-${day + 2}" data-day=${day}>
// //                     <p class="daily__event-time">${new Date(
// //                       event.event_startdatetime
// //                     ).toLocaleTimeString()}</p>
// //                     <p class="daily__event-title">${event.event_name}</p>
// //                     <p class="daliy__event-description">
// //                       ${event.event_details}
// //                     </p>
// //                   </div>`;
// //     }
// //   });

// //   dailySchedule.insertAdjacentHTML("beforeend", markup);
// // }
// // document.addEventListener("DOMContentLoaded", () => {
// //   document.querySelectorAll(".calendar__day").forEach((dayEl) => {
// //     let markup = "";
// //     // Clear previous events
// //     dayEl.addEventListener("click", async (e) => {
// //       const selectedDay = +e.target.textContent;
// //       const { data, error } = await supaClient
// //         .from("calendar_event")
// //         .select("*")
// //         .eq("student_id", studentId)
// //         .gte("event_startdatetime", startStr)
// //         .lte("event_startdatetime", endStr);
// //       if (error) {
// //         return;
// //       }
// //       if (data) {
// //         data.forEach((event) => {
// //           const day = new Date(event.event_startdatetime).getDay();
// //           if (new Date(event.event_startdatetime).getDate() === selectedDay) {
// //             const number = day === 6 ? day - 5 : day + 2;
// //             markup += `
// //                 <div class="daily__event daily__event-${number}" data-day=${selectedDay}>
// //                         <p class="daily__event-time">${new Date(
// //                           event.event_startdatetime
// //                         ).toLocaleTimeString()}</p>
// //                         <p class="daily__event-title">${event.event_name}</p>
// //                         <p class="daliy__event-description">
// //                           ${event.event_details}
// //                         </p>
// //                       </div>`;
// //           }
// //         });
// //       }
// //       dailySchedule.innerHTML = markup;
// //       markup = "";
// //     });
// //   });
// // });

import { supaClient } from "../app.js";
import { subtractDates } from "../utilities/dateCalc.js";
import { endStr, startStr } from "./weeklyCalendar.js";
const dailySchedule = document.querySelector(".daily__event-container");
const studentId = sessionStorage.getItem("studentId");
async function getDailySchedule() {
  const { data, error } = await supaClient
    .from("calendar_event")
    .select("*")
    .eq("student_id", studentId)
    .gte("event_startdatetime", startStr)
    .lte("event_startdatetime", endStr);
  if (error) {
    return;
  }
  if (data) {
    return data;
  }
}
renderDailyEvents(getDailySchedule());

async function renderDailyEvents(eventsArray) {
  const events = await eventsArray;
  let markup = "";

  // Sort events by start time
  events.sort(
    (a, b) => new Date(a.event_startdatetime) - new Date(b.event_startdatetime)
  );

  events.forEach((event) => {
    const day = new Date(event.event_startdatetime).getDay();
    const eventDate = new Date(event.event_startdatetime).getDate();
    const today = new Date().getDate();
    if (eventDate === today) {
      markup += `
        <div class="daily__event daily__event-${day + 2}" data-day=${day}>
          <p class="daily__event-time">${new Date(
            event.event_startdatetime
          ).toLocaleTimeString()}</p>
          <p class="daily__event-title">${event.event_name}</p>
          <p class="daliy__event-description">
            ${event.event_details}
          </p>
        </div>`;
    }
  });

  dailySchedule.insertAdjacentHTML("beforeend", markup);
}

export function attachDayClickListeners() {
  document.querySelectorAll(".calendar__day").forEach((dayEl) => {
    let markup = "";
    // Clear previous events
    dayEl.addEventListener("click", async (e) => {
      const selectedDay = +e.target.textContent;

      // Get the month and year information
      const elementMonth = parseInt(dayEl.dataset.month);
      const elementYear = parseInt(dayEl.dataset.year);

      const { data, error } = await supaClient
        .from("calendar_event")
        .select("*")
        .eq("student_id", studentId)
        .gte("event_startdatetime", startStr)
        .lte("event_startdatetime", endStr);

      if (error) {
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
            const day = eventDate.getDay();
            const number = day === 6 ? day - 5 : day + 2;

            markup += `
              <div class="daily__event daily__event-${number}" data-day=${selectedDay}>
                <p class="daily__event-time">${eventDate.toLocaleTimeString()}</p>
                <p class="daily__event-title">${event.event_name}</p>
                <p class="daliy__event-description">
                  ${event.event_details}
                </p>
              </div>`;
          }
        });
      }

      dailySchedule.innerHTML =
        markup || `<p class="no-events">No events for this day</p>`;
      markup = "";
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the click listeners for the initial calendar render
  attachDayClickListeners();
});
