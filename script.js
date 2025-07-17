// === GRIMMWARE OS CORE JS ===

// INIT ON DOM READY
document.addEventListener("DOMContentLoaded", () => {

  // 🎯 FLOATING EGGS — Randomized position across full page height + drifting animation
const floatingEggs = document.querySelectorAll(".drifting-egg");

floatingEggs.forEach((egg) => {
  const pageHeight = document.body.scrollHeight;
  const pageWidth = document.body.scrollWidth;

  const top = Math.random() * (pageHeight - 100);  // adjust 100 based on egg size
  const left = Math.random() * (pageWidth - 100);

  egg.style.position = "absolute";
  egg.style.top = `${top}px`;
  egg.style.left = `${left}px`;
  egg.style.zIndex = "1000";

  egg.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(5px, -10px)' },
      { transform: 'translate(-5px, 5px)' },
      { transform: 'translate(0, 0)' }
    ],
    {
      duration: 15000 + Math.random() * 10000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    }
  );
});

  // 👁 REVEAL ON SCROLL
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll(".reveal");
    const winH = window.innerHeight;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < winH) {
        el.classList.add("reveal-active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 🧠 TYPING ANIMATION
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

  const typeLines = (target, lines, delay = 60, callback) => {
    let lineIndex = 0;
    target.innerHTML = "";

    const typeLine = () => {
      if (lineIndex >= lines.length) {
        callback?.();
        return;
      }

      const line = lines[lineIndex];
      let charIndex = 0;
      let currentLine = "";

      const typeChar = () => {
        currentLine += line.charAt(charIndex);
        target.innerHTML = lines.slice(0, lineIndex).join("<br>") + "<br>" + currentLine + `<span class="blink">|</span>`;
        charIndex++;

        if (charIndex < line.length) {
          setTimeout(typeChar, delay);
        } else {
          lineIndex++;
          setTimeout(typeLine, delay);
        }
      };

      typeChar();
    };

    typeLine();
  };

  const loopAnimations = () => {
    if (!loading1 || !loading2) return;

    typeLines(loading1, lines1, 60, () => {
      setTimeout(() => {
        typeLines(loading2, lines2, 60, () => {
          setTimeout(loopAnimations, 3000);
        });
      }, 1000);
    });
  };

  loopAnimations();
});

// === RED MATRIX RAIN CANVAS ===
const canvas = document.getElementById("matrix");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // 🔧 RGBA utility for fading glitch text
  function hexToRGBA(hex, alpha) {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand, (m, r, g, b) =>
      r + r + g + g + b + b
    );

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(255,255,255,${alpha})`;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const letters = [
    ..."01", ..."GWOS", ..."I SEE IT ALL", ..."RUN IT.", ..."GRMOSSYS", ..."GIZGZMO", ..."U R NT ALNE", ..."EMO IS EXE",
    "#", "@", ">", "~", "|", "▓", "░", "█", ..."ABCDEF"
  ];

  const glitchPhrases = [
    "I SEE IT ALL", "U R NT ALNE", "EMO IS EXE", "RUN IT", "GRIMMWARE_OS", "GIZ // SIGNAL FOUND"
  ];

  const activeGlitchLines = [];
  const fontSize = 16;
  const columns = (canvas.width / fontSize) * 2;  // double the streams
  const drops = Array.from({ length: columns }, () => 1);


 const draw = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; //Darker fade to clear old lines
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff0000";
  ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    });

    for (let i = activeGlitchLines.length - 1; i >= 0; i--) {
      const line = activeGlitchLines[i];
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = hexToRGBA(line.color, line.alpha);
      ctx.fillText(line.phrase, line.x, line.y);

      line.alpha -= line.fadeRate;
      if (line.alpha <= 0) {
        activeGlitchLines.splice(i, 1);
      }
    }
  };

  const drawHorizontalGlitch = () => {
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
      alpha: 1.0,
      fadeRate: Math.random() * 0.015 + 0.01 // randomize fade speed for extra effect
    });
  };

  setInterval(draw, 33);
  setInterval(drawHorizontalGlitch, 3000);
}

