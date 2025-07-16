const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight * 0.85) {
      el.classList.add("reveal-active");
    }
  });
}

window.addEventListener("DOMContentLoaded", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);
