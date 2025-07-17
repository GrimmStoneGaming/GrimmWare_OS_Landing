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
    "&gt;&gt;&gt; Authenticating system integrity...",
    "&gt;&gt;&gt; Initializing GWOS...",
    "&gt;&gt;&gt; <span class='red'>System breach imminent...</span>"
  ];

  const lines2 = [
    "&gt;&gt;&gt; Compiling pain... <span class='green'>Complete</span>",
    "&gt;&gt;&gt; Parsing guilt... <span class='green'>Complete</span>",
    "&gt;&gt;&gt; Injecting honesty... <span class='green'>Complete</span>",
    "&gt;&gt;&gt; <span class='red'>WARNING: Emotional stability compromised...</span>",
    "&gt;&gt;&gt; <span class='pink'>Manifesting audio signature...</span>",
    "&gt;&gt;&gt; <span class='red'>SIGNAL DISTORTION DETECTED...</span>",
    "&gt;&gt;&gt; ...recalibrating...",
    "&gt;&gt;&gt; <span class='limegreen'>AUTHORIZED OVERRIDE — PLAYBACK UNLOCKED</span>",
    "&gt;&gt;&gt; Deploying featured track: <span class='blue'><i>I See It All</i></span>"
  ];

  function typeLines(target, lines, delay = 60, callback) {
    let lineIndex = 0;
    target.innerHTML = "";

    function typeLine() {
      if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
      }

      const line = lines[lineIndex];
      let charIndex = 0;
      let currentLine = "";

      function typeChar() {
        const char = line.charAt(charIndex);
        currentLine += char;
        target.innerHTML = lines.slice(0, lineIndex).join("<br>") + "<br>" + currentLine + `<span class="blink">|</span>`;

        charIndex++;
        if (charIndex < line.length) {
          setTimeout(typeChar, delay);
        } else {
          lineIndex++;
          setTimeout(typeLine, delay);
        }
      }

      typeChar();
    }

    typeLine();
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

  const letters = [
  ..."01GWOSISETALLGRMOSSYS",    // Core characters & acronyms
  ..."RUN IT.",                  // Tagline as fragments
  "I SEE IT ALL",               // Full phrase for rare full-string drops
  "GZ", "GMZ", "Z", "g",        // Gizmo tags
  "#", "@", ">", "~", "|",      // Terminal glyphs
  "▓", "░", "█",                // Blocky glitchy data feel
  ..."ABCDEF"                   // Hexy
];
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
