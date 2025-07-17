// === REVEAL ON SCROLL + FLOATING EGGS === 
document.addEventListener("DOMContentLoaded", () => {
  // 🌪 Randomize floating egg positions
  const floatingEggs = document.querySelectorAll(".drifting-egg");
  floatingEggs.forEach((egg) => {
    const top = Math.random() * 80 + 10;  // 10vh to 90vh
    const left = Math.random() * 80 + 10; // 10vw to 90vw
    egg.style.top = `${top}vh`;
    egg.style.left = `${left}vw`;
  });

  // 👻 Animate drifting
  floatingEggs.forEach((egg) => {
    egg.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(5px, -10px)' },
        { transform: 'translate(-5px, 5px)' },
        { transform: 'translate(0, 0)' }
      ],
      {
        duration: 15000 + Math.random() * 10000, // 15–25s
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    );
  });

  // 👁 Reveal on Scroll
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

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // === TYPING LOADER ANIMATION ===
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
        currentLine += line.charAt(charIndex);
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
    if (!loading1 || !loading2) return;

    typeLines(loading1, lines1, 60, () => {
      setTimeout(() => {
        typeLines(loading2, lines2, 60, () => {
          setTimeout(loopAnimations, 3000);
        });
      }, 1000);
    });
  }

  loopAnimations();
});

// === RED MATRIX EFFECT ===
const canvas = document.getElementById("matrix");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = [
    ..."01",                      // Binary
    ..."GWOS",                   // Core acronym
    ..."I SEE IT ALL",           // Theme phrase
    ..."RUN IT.",                // Tagline
    ..."GRMOSSYS",               // Acronyms
    ..."GIZGZMO",                // Gizmo tags
    ..."U R NT ALNE",            // New Phrase 1
    ..."EMO IS EXE",             // New Phrase 2
    "#", "@", ">", "~", "|",     // Glyphs
    "▓", "░", "█",               // Glitch blocks
    ..."ABCDEF"                  // Hex
  ];

  const glitchPhrases = [
    "I SEE IT ALL",
    "U R NT ALNE",
    "EMO IS EXE",
    "RUN IT",
    "GRIMMWARE_OS",
    "GIZ // SIGNAL FOUND"
  ];

  const activeGlitchLines = [];  // stores active phrases with position + lifespan

  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: columns }, () => 1);

  function draw() {
    // Slightly transparent background to create fading effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matrix vertical rain
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

    // 👇 Horizontal glitch phrases on top
    activeGlitchLines.forEach((line, index) => {
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = line.color;
      ctx.fillText(line.phrase, line.x, line.y);

      line.life--;
      if (line.life <= 0) {
        activeGlitchLines.splice(index, 1);
      }
    });
  }

  // 👇 Function to generate horizontal glitch text
  function drawHorizontalGlitch() {
    const phrase = glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
    const x = Math.floor(Math.random() * (canvas.width - 300));
    const y = Math.floor(Math.random() * canvas.height);

    const colors = ["#ff003c", "#00ffff", "#ff69b4", "#00ff66", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    activeGlitchLines.push({
      phrase,
      x,
      y,
      color,
      life: 90 // roughly 3 seconds
    });
  }

  // ✅ Start animation loops
  setInterval(draw, 33);
  setInterval(drawHorizontalGlitch, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
  // 🌪 Randomize floating egg positions
  const floatingEggs = document.querySelectorAll(".drifting-egg");
  floatingEggs.forEach((egg) => {
    const top = Math.random() * 80 + 10;  // 10vh to 90vh
    const left = Math.random() * 80 + 10; // 10vw to 90vw
    egg.style.top = `${top}vh`;
    egg.style.left = `${left}vw`;
  });

  // 👻 Animate wandering
  floatingEggs.forEach((egg) => {
    egg.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(5px, -10px)' },
        { transform: 'translate(-5px, 5px)' },
        { transform: 'translate(0, 0)' }
      ],
      {
        duration: 15000 + Math.random() * 10000, // 15-25s
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    );
  });

  // Reveal logic (if still needed)
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

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

