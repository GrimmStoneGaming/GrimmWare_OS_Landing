// === REVEAL ON SCROLL ===
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight) {
      el.classList.add("reveal-active");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // === TYPING ANIMATION SECTIONS ===
  const loading1 = document.getElementById("loading-1");
  const loading2 = document.getElementById("loading-2");

  function typeToElement(el, lines, delay = 100) {
    let i = 0;
    let line = 0;
    function type() {
      if (line < lines.length) {
        if (i < lines[line].length) {
          el.innerHTML += lines[line].charAt(i);
          i++;
          setTimeout(type, delay);
        } else {
          el.innerHTML += "<br/>";
          i = 0;
          line++;
          setTimeout(type, delay);
        }
      }
    }
    type();
  }

  if (loading1 && loading2) {
    typeToElement(loading1, [
      "> Authenticating system integrity...",
      "> Initializing GWOS...",
      "> SYSTEM BREACH IMMINENT..."
    ]);

    setTimeout(() => {
      typeToElement(loading2, [
        "> Compiling pain...  Complete",
        "> Processing guilt...  Complete",
        "> Detecting honesty...  Complete",
        "!! WARNING: Emotional stability compromised...",
        "> Manifesting audio signal..."
      ]);
    }, 3000);
  }
});

// === RED MATRIX EFFECT ===
const canvas = document.getElementById("matrix");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "01".split("");
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: columns }, () => 1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0000";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    });
  }

  setInterval(draw, 33);
}
