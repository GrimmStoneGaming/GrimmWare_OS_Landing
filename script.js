/* === GATEWAY SCRIPT START === */

/* === GRIMMWare OS Gateway Script (Cleaned + Patched) === */

// DOM Selectors
const boxes = document.querySelectorAll('.box');
const decryptWrapper = document.querySelector('.decrypt-wrapper');
const decryptInstructions = document.querySelector('.decrypt-instruction');

// Cipher Configuration
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let solved = Array(correctCode.length).fill(false);
let currentGreenIndex = null;
let intervalId = null;
let cipherSolved = false;

// Dev Mode Flag
const traceDevMode = false;
console.log("[INIT] Cipher Initialized", { cipherSolved, decryptWrapper, decryptInstructions });

// === AUDIO SETUP ===
const sounds = {
  gatewayIntro: new Audio('sounds/Gateway Intro.mp3'),
  glitchThrob: new Audio('sounds/Glitch Throb Heart.mp3?v=2'),
  preterminalGlitch: new Audio('sounds/preterminal glitch.mp3'),
  correctGlitch: new Audio('sounds/Correct Glitch.mp3'),
  incorrectGlitch: new Audio('sounds/Incorrect Glitch.mp3'),
  terminalFight: new Audio('sounds/Terminal Fight.mp3'),
  glitchTyping: new Audio('sounds/glitch typing.mp3'),
  runIt: new Audio('sounds/RUN IT BUTTON.mp3'),
  static: new Audio('sounds/Static.mp3'),
  runItPulse: new Audio('sounds/Run It Pulse.mp3')
};

function unlockAudio() {
  Object.values(sounds).forEach(audio => {
    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }).catch(() => { /* ignore autoplay fails */ });
  });
}

function playSound(key, delay = 0, reset = true) {
  if (!sounds[key]) return;
  if (reset) {
    sounds[key].pause();
    sounds[key].currentTime = 0;
  }
  setTimeout(() => {
    sounds[key].play();
    if (key === 'gatewayIntro') {
      setTimeout(() => {
        sounds.gatewayIntro.pause();
        sounds.gatewayIntro.currentTime = 0;
      }, 2300);
    }
  }, delay);
}

function fadeOutSound(key, duration = 1000) {
  if (!sounds[key]) return;
  const audio = sounds[key];
  const step = audio.volume / (duration / 100);
  const fade = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - step);
    if (audio.volume <= 0.01) {
      clearInterval(fade);
      audio.pause();
      audio.volume = 1;
    }
  }, 100);
}

// === CIPHER UTILITIES ===
const typingSpeed = 35;
const baseDelay = 100;

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

function markCipherSolved() {
  cipherSolved = true;
  console.log("[MARK] Cipher marked as solved.");
  fadeOutSound('glitchThrob', 200);
}

function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

function startCycling() {
  intervalId = setInterval(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * boxes.length);
    } while (solved[nextIndex]);

    const isInverted = document.body.classList.contains('inverted');

    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('green');
        box.style.backgroundColor = isInverted ? '#00ff00' : 'red';
        box.style.boxShadow = `0 0 8px ${isInverted ? '#00ff00' : '#ff0000'}`;
      }
    });

    currentGreenIndex = nextIndex;
    const box = boxes[currentGreenIndex];
    box.classList.add('green');
    box.textContent = correctCode[currentGreenIndex];
    box.style.backgroundColor = isInverted ? 'red' : '#00ff00';
    box.style.boxShadow = `0 0 8px ${isInverted ? '#ff0000' : '#00ff00'}`;
  }, 600);
}

// === BOX CLICK LOGIC ===
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    console.log(`[CLICK] Box ${i} clicked. Green index: ${currentGreenIndex}, Solved: ${solved[i]}`);

    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.classList.add('green');
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.textContent = correctCode[i];
      currentGreenIndex = null;

      playSound('correctGlitch');

      if (solved.every(Boolean)) {
        markCipherSolved();
        clearInterval(intervalId);
        setTimeout(() => {
          fadeOutSound('glitchThrob', 1000);
          playSound('preterminalGlitch');
          triggerFullscreenGlitch();
        }, 800);
      }
    } else {
      playSound('incorrectGlitch');
    }
  });
});

// === Fullscreen Glitch to Terminal Trigger ===
function triggerFullscreenGlitch() {
  const glitchDiv = document.createElement('div');
  glitchDiv.classList.add('fullscreen-glitch');
  document.body.appendChild(glitchDiv);

  setTimeout(() => {
    glitchDiv.remove();
    startTerminalSequence();
  }, 2400);
}

// === Glitch Destruction Logic ===
function zapElement(selector, delay = 0) {
  setTimeout(() => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('purge-glitch');
      setTimeout(() => {
        el.remove();
      }, 600);
    }
  }, delay);
}

function purgeTopContainer() {
  zapElement('.logo-main');
  zapElement('.tagline');
  zapElement('.logo-container');

  const topContainer = document.getElementById('top-container');
  if (topContainer) {
    topContainer.classList.add('purge-glitch');
    setTimeout(() => {
      topContainer.remove();
    }, 600);
  }
}

// === Type Text Logic ===
function typeText(target, text, speed, callback) {
  let i = 0;
  target.textContent = '';
  const interval = setInterval(() => {
    target.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

// === Terminal Sequence Logic (w/ Audio) ===
function startTerminalSequence() {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const linesContainer = document.getElementById('terminal-lines');
  terminalOverlay.classList.add('show');
  terminalOverlay.classList.remove('hidden');
  linesContainer.innerHTML = '';

  playSound('terminalFight');
  // Removed glitchThrob replay // time-aligned to throb after terminalFight starts

  const sequence = [
    { tag: 'SYS', text: 'Protocol breach detected...', delay: 1000 },
    { tag: 'HANDLER', text: 'Initializing command injection...', delay: 1000 },
    { tag: 'SYS', text: 'Firewall spike deployed.', delay: 1000 },
    { tag: 'HANDLER', text: 'Injecting signal disruptor...', delay: 1000 },
    { tag: 'GATEWAY', text: 'Rejecting foreign signal...', delay: 1000 },
    { tag: 'SYS', text: 'Override vector accepted.', delay: 1000 },
    { tag: 'SYS', text: 'Beginning internal sequence...', delay: 1000 },
    { tag: 'HANDLER', text: 'Forcing cipher lockout...', delay: 1000 },
    { tag: 'GATEWAY', text: 'Memory lattice destabilizing...', delay: 1000 },
    { tag: 'SYS', text: 'Subsystem identity layers disabled.', delay: 1000 },
    { tag: 'SYS', text: 'Visual anchor nodes disengaged.', delay: 1000 },
    { tag: 'SYS', text: 'Sequence continues...', delay: 1000 },
    { tag: 'SYS', text: 'Connection integrity failing...', delay: 1000 },
    { tag: 'SYS', text: 'Cipher structure collapse confirmed.', delay: 1000 },
    { tag: 'HANDLER', text: 'Awaiting final response...', delay: 1000 },
    { tag: 'SYS', text: 'Instruction stream fragmentation in progress...', delay: 1000 },
    { tag: 'HANDLER', text: 'No more walls. Only wires.', delay: 2000 },
    { tag: '', text: '', delay: 200, action: () => zapElement('.logo-container') },
    { tag: '', text: '', delay: 0, isFinal: true }
  ];

  function typeLine({ tag, text, delay, isFinal, action }, index) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');

    if (tag) {
      const prefix = document.createElement('span');
      prefix.classList.add(`${tag.toLowerCase()}-prefix`);
      prefix.textContent = `[${tag}] ::`;
      line.appendChild(prefix);
    }

    const content = document.createElement('span');
    content.classList.add('terminal-content');
    line.appendChild(content);
    linesContainer.appendChild(line);
    terminalOverlay.scrollTop = terminalOverlay.scrollHeight;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        content.textContent += text.charAt(charIndex++);
        terminalOverlay.scrollTop = terminalOverlay.scrollHeight;
        playSound('glitchTyping', 0, false);
      } else {
        clearInterval(interval);

        switch (index) {
          case 6: zapElement('.decrypt-instruction'); break;
          case 7:
            const green = document.querySelectorAll('.green');
            [...green].sort(() => Math.random() - 0.5).forEach((el, idx) => {
              setTimeout(() => zapElement(`#${el.id}`), idx * 75);
            });
            break;
          case 8:
            const boxes = document.querySelectorAll('.box:not(.green)');
            [...boxes].sort(() => Math.random() - 0.5).forEach((el, idx) => {
              setTimeout(() => zapElement(`#${el.id}`), idx * 75);
            });
            break;
          case 9: zapElement('.decrypt-wrapper'); break;
          case 10: zapElement('.tagline'); break;
        }

        if (action) action();

        if (isFinal) {
          setTimeout(() => {
            injectFinalRunItLine();
            purgeTopContainer();
            setTimeout(() => {
              terminalOverlay.classList.add('hidden');
              revealAccessGranted();
            }, 3000);
          }, 500);
        } else if (index + 1 < sequence.length) {
          setTimeout(() => {
            typeLine(sequence[index + 1], index + 1);
          }, delay);
        }
      }
    }, typingSpeed);
  }

  typeLine(sequence[0], 0);
}

// === FINAL FLICKERING LINE ===
function injectFinalRunItLine() {
  const linesContainer = document.getElementById('terminal-lines');

  const finalLine = document.createElement('div');
  finalLine.classList.add('terminal-line');
  Object.assign(finalLine.style, {
    opacity: '1',
    display: 'flex',
    visibility: 'visible',
    position: 'relative',
    flexWrap: 'nowrap',
    alignItems: 'center',
    zIndex: '1000'
  });

  const finalPrefix = document.createElement('span');
  finalPrefix.classList.add('handler-prefix');
  finalPrefix.textContent = '[HANDLER] ::';
  finalLine.appendChild(finalPrefix);

  const runItSpan = document.createElement('span');
  runItSpan.classList.add('run-it');
  runItSpan.textContent = 'Run it.';
  Object.assign(runItSpan.style, {
    color: 'red',
    display: 'inline',
    visibility: 'visible',
    opacity: '1',
    position: 'relative',
    zIndex: '1001',
    marginLeft: '5px',
    fontWeight: 'bold'
  });

  finalLine.appendChild(runItSpan);
  linesContainer.appendChild(finalLine);

  // Animation trigger
  void runItSpan.offsetWidth;
  runItSpan.style.removeProperty('animation');

  requestAnimationFrame(() => {
    runItSpan.classList.remove('run-it');
    runItSpan.classList.add('run-it-flicker', 'shock-pulse');
  });

  linesContainer.scrollTop = linesContainer.scrollHeight;
  linesContainer.classList.add('terminal-pulse');
  setTimeout(() => linesContainer.classList.remove('terminal-pulse'), 1000);

  // Audio
  playSound('runIt');
  setTimeout(() => { playSound('runItPulse'); }, 500);
}

// === ACCESS GRANTED SEQUENCE ===
function revealAccessGranted() {
  const grantedLine = document.querySelector('.granted');
  const warningLine = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const accessMessage = document.getElementById('access-message');

  accessMessage.classList.remove('hidden');
  accessMessage.style.opacity = 1;

  typeText(grantedLine, 'ACCESS GRANTED.  SYSTEM UNLOCKED.', 40, () => {
    setTimeout(() => {
      typeText(warningLine, '>>> WARNING: THIS MAY CHANGE YOU.', 75, () => {
        warningLine.classList.add('glitch');

        const rawText = warningLine.textContent;
        const glitchChars = '!@#$%?~*';

        setInterval(() => {
          const corrupted = rawText.split('').map(char =>
            Math.random() < 0.07 && char !== ' ' ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join('');
          warningLine.textContent = corrupted;
        }, 200);

        runWrapper.classList.remove('hidden');
        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
      });
    }, 1000);
  });
}

// === RUN BUTTON / TRANSITION (with Audio) ===
document.getElementById('run-button').addEventListener('click', () => {
 playSound('runIt');
  fadeOutSound('glitchThrob', 1500);
  sounds.runItPulse.pause();
  sounds.runItPulse.currentTime = 0;

  const footer = document.querySelector('.grimm-footer');
  if (footer) {
  
  footer.style.transition = 'opacity 0.8s ease';
  footer.style.opacity = '0';
}
  const terminal = document.getElementById('terminal');
  if (terminal) terminal.remove();
  if (transitionInProgress) return;
  transitionInProgress = true;

  const terminalOverlay = document.getElementById('terminal-overlay');
  if (terminalOverlay) terminalOverlay.remove();

  const smashOverlay = document.getElementById('smash-overlay');
  smashOverlay.classList.add('active');

  // Screen smash FX
  setTimeout(() => {
    smashOverlay.classList.remove('active');
  }, 1300);

  // Gateway strip transition
  setTimeout(() => {
    const overlay = document.getElementById('gateway-overlay');
    const landingPage = document.getElementById('landing-page');
    const runWrapper = document.getElementById('run-wrapper');
    const accessMessage = document.getElementById('access-message');

    const numStrips = 60;
    const fallInDuration = 500;
    const fallOutDuration = 600;
    const delayBeforeReveal = 1500;

    runWrapper.style.display = 'none';
    accessMessage.style.display = 'none';
    landingPage.style.display = 'flex';
    landingPage.style.opacity = 0;
    overlay.innerHTML = '';
    overlay.style.display = 'flex';
    overlay.style.background = 'transparent';

    for (let i = 0; i < numStrips; i++) {
      const strip = document.createElement('div');
      strip.classList.add('strip', 'cover');
      strip.style.left = `${(100 / numStrips) * i}%`;
      strip.style.width = `${100 / numStrips}%`;
      strip.style.animation = `fallCover ${fallInDuration}ms forwards`;
      overlay.appendChild(strip);
    }

    setTimeout(() => {
      landingPage.style.opacity = 1;

      const strips = Array.from(overlay.querySelectorAll('.strip'));
      const shuffled = strips.sort(() => Math.random() - 0.5);

      shuffled.forEach((strip, index) => {
        setTimeout(() => {
          strip.classList.remove('cover');
          strip.classList.add('reveal');
          strip.style.animation = `fallReveal ${fallOutDuration}ms forwards`;
        }, index * 30);
      });

      const totalDelay = shuffled.length * 30 + fallOutDuration;
      setTimeout(() => {
        overlay.style.display = 'none';
      }, totalDelay + 500);
    }, fallInDuration + delayBeforeReveal);
  }, 1000); // ⌛ Delay for final tension
});

// === INIT SCREEN TRIGGER ===
window.addEventListener('DOMContentLoaded', () => {
  const initScreen = document.getElementById('init-screen');
  const initButton = document.getElementById('init-button');
  const preloadOverlay = document.getElementById('preload-overlay');

  initButton.addEventListener('click', () => {
    unlockAudio();

    initScreen.style.display = 'none';
    preloadOverlay.style.display = 'block';
    preloadOverlay.style.opacity = '1';
    preloadOverlay.classList.remove('fade-out');

    playSound('gatewayIntro', 100);

    setTimeout(() => {
      preloadOverlay.classList.add('fade-out');
      setTimeout(() => preloadOverlay.remove(), 1000);

      const logo = document.querySelector('.logo-main');
      const tagline = document.querySelector('.tagline');
      const instruction = document.querySelector('.decrypt-instruction');

      setTimeout(() => { logo.style.animation = 'fadeIn 1.2s forwards'; }, 0);
      setTimeout(() => { tagline.style.animation = 'fadeIn 1.2s forwards'; }, 800);
      setTimeout(() => {
        cipher.classList.remove('hidden');
        cipher.style.animation = 'glitchIn 0.6s forwards';
        playSound('glitchThrob');
      }, 100);

      setTimeout(() => {
        instruction.textContent = 'T4p _gr33n_ 2 d3crypt...';
        instruction.style.animation = 'corruptText 6s infinite';
        instruction.style.opacity = '1';

        const raw = instruction.textContent;
        const glitchChars = '!@#$%?~*';
        setInterval(() => {
          const corrupted = raw.split('').map(char =>
            Math.random() < 0.07 && char !== ' '
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          ).join('');
          instruction.textContent = corrupted;
        }, 200);
      }, 1800);

      cycleCharacters();
      startCycling();
    }, 2300);
  });
});


/* === MUTE TOGGLE === */

// Mute Toggle Logic
let isMuted = true;
const audioElements = document.querySelectorAll('audio');

function toggleMute() {
  isMuted = !isMuted;
  audioElements.forEach(el => {
    el.muted = isMuted;
    if (!el.paused && !el.ended && el.readyState > 2) {
      if (!isMuted) el.play();
    }
  });
  console.log("Audio is now", isMuted ? "Muted" : "Unmuted");
}


/* === LANDING PAGE SCRIPT START === */
// === GRIMMWARE OS CORE JS ===

document.addEventListener("DOMContentLoaded", () => {
  // 🎯 FLOATING EGGS — Randomized position + animation
  const floatingEggs = document.querySelectorAll(".drifting-egg");
  floatingEggs.forEach((egg) => {
    const pageHeight = document.body.scrollHeight;
    const pageWidth = document.body.scrollWidth;
    const top = Math.random() * (pageHeight - 100);
    const left = Math.random() * (pageWidth - 100);

    egg.style.position = "absolute";
    egg.style.top = `${top}px`;
    egg.style.left = `${left}px`;
    egg.style.zIndex = "1000";

    egg.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: "translate(5px, -10px)" },
        { transform: "translate(-5px, 5px)" },
        { transform: "translate(0, 0)" },
      ],
      {
        duration: 15000 + Math.random() * 10000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
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
    "&gt;&gt;&gt; <span class='white'>Authenticating system integrity...</span>",
    "&gt;&gt;&gt; <span class='cyan'>Initializing GWOS...</span>",
    "&gt;&gt;&gt; <span class='red'>System breach imminent...</span>",
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
    "&gt;&gt;&gt; Deploying featured track: <span class='blue'><i>I See It All</i></span>",
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
        target.innerHTML =
          lines.slice(0, lineIndex).join("<br>") +
          "<br>" +
          currentLine +
          `<span class="blink">|</span>`;
        charIndex++;

        if (charIndex < line.length) {
          setTimeout(typeChar, delay);
        } else {
          lineIndex++;
          setTimeout(typeLine, 0);
        }
      };

      typeChar();
    };

    typeLine();
  };

  const loopLoading1 = () => {
    if (!loading1) return;
    typeLines(loading1, lines1, 60, () => {
      setTimeout(loopLoading1, 2000);
    });
  };

  const loopLoading2 = () => {
    if (!loading2) return;
    typeLines(loading2, lines2, 60, () => {
      setTimeout(loopLoading2, 2000);
    });
  };

  loopLoading1();
  loopLoading2();

  // === RED MATRIX RAIN CANVAS ===
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    function hexToRGBA(hex, alpha) {
      const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthand, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return `rgba(255,255,255,${alpha})`;
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const letters = [
      ..."01",
      ..."GWOS",
      ..."I SEE IT ALL",
      ..."RUN IT.",
      ..."GRMOSSYS",
      ..."GIZGZMO",
      ..."U R NT ALNE",
      ..."EMO IS EXE",
      "#",
      "@",
      ">",
      "~",
      "|",
      "▓",
      "░",
      "█",
      ..."ABCDEF",
    ];

    const glitchPhrases = [
      "I SEE IT ALL",
      "U R NT ALNE",
      "EMO IS EXE",
      "RUN IT",
      "GRIMMWARE_OS",
      "GIZ // SIGNAL FOUND",
    ];

    const activeGlitchLines = [];
    const fontSize = 14;
    const columnCount = 400;
    const spacing = canvas.width / columnCount;
    const drops = Array.from({ length: columnCount }, () => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff0000";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * spacing;
        ctx.fillText(text, x, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      // 👻 Glitch overlay
      for (let i = activeGlitchLines.length - 1; i >= 0; i--) {
        const line = activeGlitchLines[i];
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = hexToRGBA(line.color, line.alpha);
        ctx.fillText(line.phrase, line.x, line.y);
        line.alpha -= line.fadeRate;
        if (line.alpha <= 0) activeGlitchLines.splice(i, 1);
      }
    };

    const drawHorizontalGlitch = () => {
      const phrase =
        glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
      const x = Math.floor(Math.random() * (canvas.width - 300));
      const y = Math.floor(Math.random() * canvas.height);
      const colors = [
        "#ff003c",
        "#00ffff",
        "#ff69b4",
        "#00ff66",
        "#ffffff",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      activeGlitchLines.push({
        phrase,
        x,
        y,
        color,
        alpha: 1.0,
        fadeRate: Math.random() * 0.015 + 0.01,
      });
    };

    setInterval(draw, 33);
    setInterval(drawHorizontalGlitch, 3000);
  }

  // === 📟 EMOTIONAL TRIGGER ===
  const trigger = document.getElementById("message-trigger");
  const message = document.getElementById("hidden-message");

  if (trigger && message) {
    trigger.addEventListener("click", () => {
      if (message.classList.contains("visible")) {
        message.classList.remove("visible");
        message.classList.add("fade-out");

        setTimeout(() => {
          message.classList.remove("fade-out");
          message.style.display = "none";
        }, 600);
      } else {
        message.style.display = "block";
        message.classList.add("visible");
      }
    });
  }
});

