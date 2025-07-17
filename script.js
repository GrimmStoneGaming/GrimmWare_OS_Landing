
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

  const loading1 = document.getElementById("loading-1");
  const loading2 = document.getElementById("loading-2");

  const lines1 = [
    "> Authenticating system integrity...",
    "> Initializing GWOS...",
    "> SYSTEM BREACH IMMINENT..."
  ];

  const lines2 = [
    "> Compiling pain...  <span class='green'>Complete</span>",
    "> Processing guilt...  <span class='green'>Complete</span>",
    "> Detecting honesty...  <span class='green'>Complete</span>",
    "!! <span class='red'>WARNING</span>: Emotional stability compromised...",
    "> Manifesting audio signal..."
  ];

  function typeLines(target, lines, delay = 100, callback) {
    let lineIndex = 0;
    let charIndex = 0;
    target.innerHTML = "";

    function type() {
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        const visible = currentLine.slice(0, charIndex);
        const hidden = currentLine.slice(charIndex);
        target.innerHTML = lines.slice(0, lineIndex).join("<br>") + "<br>" + visible + `<span class="blink">${hidden.charAt(0) || " "}</span>`;
        charIndex++;
        if (charIndex <= currentLine.length) {
          setTimeout(type, delay);
        } else {
          charIndex = 0;
          lineIndex++;
          setTimeout(type, delay);
        }
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function loopAnimations() {
    typeLines(loading1, lines1, 60, () => {
      setTimeout(() => {
        typeLines(loading2, lines2, 60, () => {
          setTimeout(loopAnimations, 3000);
        });
      }, 1000);
    });
  }

  if (loading1 && loading2) loopAnimations();
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
