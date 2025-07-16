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

  function typeToElement(el, lines, delay = 75, showCursor = false) {
    let i = 0;
    let line = 0;

    const cursorSpan = document.createElement("span");
    if (showCursor) {
      cursorSpan.classList.add("blink");
      cursorSpan.textContent = "█";
      el.appendChild(cursorSpan);
    }

    function type() {
      if (line < lines.length) {
        if (i < lines[line].length) {
          cursorSpan.before(document.createTextNode(lines[line].charAt(i)));
          i++;
          setTimeout(type, delay);
        } else {
          el.insertBefore(document.createElement("br"), cursorSpan);
          i = 0;
          line++;
          setTimeout(type, delay * 2);
        }
      }
    }

    type();
  }

  if (loading1 && loading2) {
    typeToElement(loading1, [
      ">>> Initializing GrimmWare OS_",
      "Authenticating system integrity...",
      "Initializing GWOS...",
      "SYSTEM BREACH IMMINENT..."
    ], 60, true);

    setTimeout(() => {
      typeToElement(loading2, [
        "> Compiling pain...  Complete",
        "> Processing guilt...  Complete",
        "> Detecting honesty...  Complete",
        "!! WARNING: Emotional stability compromised...",
        "> Manifesting audio signal..."
      ], 65);
    }, 3500);
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
