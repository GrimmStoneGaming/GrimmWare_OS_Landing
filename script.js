// === GATEWAY + LANDING JS FULLY MERGED ===

// GATEWAY SECTION STARTS HERE
/* === GRIMMWare OS Gateway Script === */

const boxes = document.querySelectorAll('.box');
const decryptWrapper = document.querySelector('.decrypt-wrapper');
const cipher = document.querySelector('.decrypt-wrapper');
let decryptInstructions = document.querySelector('.decrypt-instruction');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;
let cipherSolved = false; // ✅ Flag to track completion

const traceDevMode = false; // 🧪 Toggle this to true to override lockdown timer for testing

console.log("[INIT] Cipher Solved Flag:", cipherSolved);
console.log("[INIT] Decrypt Wrapper:", decryptWrapper);
console.log("[INIT] Decrypt Instructions:", decryptInstructions);

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
    }).catch(() => {
      // Silently ignore autoplay errors
    });
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

    // Special override: stop 'gatewayIntro' at 2300ms
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
  let step = audio.volume / (duration / 100);
  let fade = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - step);
    if (audio.volume <= 0.01) {
      clearInterval(fade);
      audio.pause();
      audio.volume = 1;
    }
  }, 100);
}

const typingSpeed = 35;
const baseDelay = 100;

function markCipherSolved() {
  cipherSolved = true;
  console.log("[MARK] Cipher marked as solved.");

  // Stop glitchThrob immediately
  fadeOutSound('glitchThrob', 200);
}

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
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

    let isInverted = cipher.classList.contains('inverted');

    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('green');

        const bgColor = isInverted ? '#00ff00' : 'red';
        const shadowColor = isInverted ? '#00ff00' : '#ff0000';

        box.style.backgroundColor = bgColor;
        box.style.boxShadow = `0 0 8px ${shadowColor}`;
      }
    });

    currentGreenIndex = nextIndex;
    const box = boxes[currentGreenIndex];
    box.classList.add('green');
    box.textContent = correctCode[currentGreenIndex];

    const correctBgColor = isInverted ? 'red' : '#00ff00';
    const correctShadowColor = isInverted ? '#ff0000' : '#00ff00';

    box.style.backgroundColor = correctBgColor;
    box.style.boxShadow = `0 0 8px ${correctShadowColor}`;
  }, 600);
}

// === Box Click Detection w/ Audio ===
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
          // Removed glitchThrob replay to avoid early kick-in
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
  if (!selector || typeof selector !== 'string' || selector === '#') return;

  setTimeout(() => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('purge-glitch');
      setTimeout(() => el.remove(), 600);
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

function revealAccessGranted() {
  const accessMsg = document.getElementById("access-message");
  const runWrapper = document.querySelector(".run-button-wrapper");

  if (!accessMsg || !runWrapper) {
    console.warn("[WARN] Missing elements for revealAccessGranted.");
    return;
  }

  // UNHIDE elements
  accessMsg.classList.remove("hidden");
  runWrapper.classList.remove("hidden");

  accessMsg.innerHTML = "";
  accessMsg.style.opacity = 1;

  const grantedLine = document.createElement("span");
  grantedLine.classList.add("granted");
  grantedLine.textContent = "ACCESS GRANTED";

  const warningLine = document.createElement("span");
  warningLine.classList.add("warning");
  warningLine.textContent = ">>> WARNING: THIS MAY CHANGE YOU";

  accessMsg.appendChild(grantedLine);

  setTimeout(() => {
    accessMsg.appendChild(warningLine);
  }, 1000);

  setTimeout(() => {
    runWrapper.classList.add("glitch-in");
  }, 1800);
}

// === Terminal Sequence Logic (w/ Audio) ===
function startTerminalSequence() {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const linesContainer = document.getElementById('terminal-lines');
  terminalOverlay.classList.add('show');
  terminalOverlay.classList.remove('hidden');
  linesContainer.innerHTML = '';

  playSound('terminalFight');

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
            document.querySelectorAll('.green').forEach((el, idx) => {
              setTimeout(() => zapElement(`#${el.id}`), idx * 75);
            });
            break;
          case 8:
            document.querySelectorAll('.box:not(.green)').forEach((el, idx) => {
              setTimeout(() => zapElement(`#${el.id}`), idx * 75);
            });
            break;
          case 9: zapElement('.decrypt-wrapper'); break;
          case 10: zapElement('.tagline'); break;
        }

        if (action) action();

        if (isFinal) {
          setTimeout(() => {
            injectFinalRunItLine();  // Typing animation for "Run it."
            purgeTopContainer();     // Clean the top

            // === Show Access Text & Button Properly ===
            revealAccessGranted();  // <-- Patched typing version here

            // Fade terminal overlay out
            terminalOverlay.classList.add('hidden');

            // Trigger optional music
            const preloadOverlay = document.getElementById('preload-overlay');
            if (preloadOverlay) {
              preloadOverlay.classList.add('fade-out');
              setTimeout(() => {
                preloadOverlay.classList.add('hidden');
                if (typeof startHandoffTrack === 'function') {
                  startHandoffTrack();
                }
              }, 1000);
            }
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

// === REVEAL ACCESS TEXT WITH TYPEWRITER EFFECT ===
function revealAccessGranted() {
  const accessMsg = document.getElementById("access-message");
  const runWrapper = document.querySelector(".run-button-wrapper");

  if (!accessMsg || !runWrapper) {
    console.warn("[WARN] Missing elements for revealAccessGranted.");
    return;
  }

  // Clear and show
  accessMsg.innerHTML = '';
  accessMsg.classList.remove('hidden');
  runWrapper.classList.remove('hidden');

  const grantedText = "ACCESS GRANTED. SYSTEM UNLOCKED.";
  const warningText = ">>> WARNING: THIS MAY CHANGE YOU";

  const grantedSpan = document.createElement("span");
  grantedSpan.classList.add("granted");
  accessMsg.appendChild(grantedSpan);

  const warningSpan = document.createElement("span");
  warningSpan.classList.add("warning");

  let idx = 0;

  function typeText(text, span, callback) {
    const interval = setInterval(() => {
      if (idx < text.length) {
        span.textContent += text.charAt(idx++);
        playSound('glitchTyping', 0, false);
      } else {
        clearInterval(interval);
        idx = 0;
        if (callback) callback();
      }
    }, 35);
  }

  typeText(grantedText, grantedSpan, () => {
    accessMsg.appendChild(document.createElement("br"));
    accessMsg.appendChild(warningSpan);
    typeText(warningText, warningSpan, () => {
      runWrapper.classList.add("glitch-in");
    });
  });
}

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
// LANDING PAGE SECTION STARTS HERE

// === LANDING PAGE TRACK PLAYER ===
function startHandoffTrack() {
  const easterEgg = document.getElementById('easterEggTrack');
  if (easterEgg) {
    easterEgg.play().catch(err => console.warn("Audio autoplay blocked: ", err));
  }
}

// === Additional LANDING PAGE Behaviors or Easter Eggs ===
function startLandingVisuals() {
  // Example animation or typing effect if needed
  const infoHeader = document.querySelector('.lp-info-title');
  const infoText = document.querySelector('.lp-info-text');

  if (infoHeader && infoText) {
    typeLandingText(infoHeader, "Why does it exist?", 40, () => {
      typeLandingText(infoText, "Because creativity isn’t defined by your tools—only by your truth.", 30);
    });
  }
}

function typeLandingText(element, text, speed = 50, callback = null) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}
});
