import { supaClient } from "./app.js";
const courseModal = document.querySelector(".courses__modal");
const coursesEl = document.querySelectorAll(".course");
const overlay = document.querySelector(".overlay");

coursesEl.forEach((coursesEl) => {
  coursesEl.addEventListener("click", () => {
    showCourseModal();
  });
});
function showCourseModal() {
  courseModal.classList.remove("modal-hidden");
  courseModal.classList.add("modal-show");
  overlay.style.display = "block";
}

function hideCourseModal() {
  courseModal.classList.remove("modal-show");
  courseModal.classList.add("modal-hidden");
  overlay.style.display = "none";
}
document.addEventListener("click", function (e) {
  if (
    e.target.closest(".courses__modal") !== courseModal &&
    e.target === overlay
  ) {
    hideCourseModal();
  }
});
// console.log(supaClient);
