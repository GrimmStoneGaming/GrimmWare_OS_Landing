// ========== REVEAL ON SCROLL ==========
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < window.innerHeight) {
      el.classList.add("reveal-active");
    }
  });
}

// ========== MATRIX EFFECT ==========
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const characters = "01GWO$";
  const charsArray = characters.split("");
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff3b3b";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = charsArray[Math.floor(Math.random() * charsArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);

  // ========== TYPING TERMINAL ANIMATION ==========
  function runTypedAnimation(containerId, lines, colorClass = '') {
    const container = document.querySelector(containerId);
    let lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          container.innerHTML = '';
          lineIndex = 0;
          typeNextLine();
        }, 2000);
        return;
      }

      const line = lines[lineIndex];
      const p = document.createElement("p");
      const span = document.createElement("span");
      if (colorClass) span.classList.add(colorClass);
      span.innerHTML = line;
      p.appendChild(span);
      container.appendChild(p);

      lineIndex++;
      setTimeout(typeNextLine, 500);
    }

    container.innerHTML = '';
    typeNextLine();
  }

  // ========== INIT ==========  
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  runTypedAnimation('#loading-1', [
    '>>> Authenticating system integrity...',
    '>>> Initializing GWOS...',
    '>>> SYSTEM BREACH IMMINENT...'
  ]);

  runTypedAnimation('#loading-2', [
    '>>> Compiling pain... <span class="green">Complete</span>',
    '>>> Parsing guilt... <span class="green">Complete</span>',
    '>>> Injecting honesty... <span class="green">Complete</span>',
    '<span class="red bold">>>> WARNING: Emotional stability compromised...</span>',
    '<span class="pink">>>> Manifesting audio signature...</span>',
    '<span class="red bold">>>> SIGNAL DISTORTION DETECTED...</span>',
    '>>> ...recalibrating...',
    '<span class="green bold">>>> AUTHORIZED OVERRIDE — PLAYBACK UNLOCKED</span>',
    '<span class="green">>>> Deploying featured track: <em class="cyan">I See It All</em></span>'
  ]);
});
