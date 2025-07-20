// === GRIMMWare OS Gateway Script ===

const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
const terminalOverlay = document.getElementById('terminal-overlay');
const terminal = terminalOverlay; // assuming same element
const terminalLines = document.getElementById('terminal-lines');
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;

// === TIMING CONSTANTS ===
const typingSpeed = 35;
const baseDelay = 100;

// === Cipher Glitch Logic ===
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

    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('green');
        box.style.backgroundColor = 'red';
        box.style.boxShadow = '0 0 8px #ff0000';
      }
    });

    currentGreenIndex = nextIndex;
    const box = boxes[currentGreenIndex];
    box.classList.add('green');
    box.textContent = correctCode[currentGreenIndex];
    box.style.backgroundColor = '#00ff00';
    box.style.boxShadow = '0 0 8px #00ff00';
  }, 1500);
}

// === Box Click Detection ===
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.classList.add('green');
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.textContent = correctCode[i];
      currentGreenIndex = null;

      if (solved.every(Boolean)) {
        clearInterval(intervalId);
        setTimeout(showAccessGranted, 800);
      }
    }
  });
});

// === Terminal Typing Helpers ===
function typeText(target, text, delay = 60, callback = null) {
  let i = 0;
  const interval = setInterval(() => {
    target.textContent = text.substring(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}

function startIdleGlitch(target, originalText, frequency = 150) {
  const glitchChars = "!@#$%^&*()_+=~{}|<>?/\\";
  let glitchInterval = setInterval(() => {
    const glitched = originalText.split('').map(char =>
      Math.random() < 0.05 && char !== ' '
        ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
        : char
    ).join('');
    target.textContent = glitched;
  }, frequency);

  target.addEventListener('mouseenter', () => {
    clearInterval(glitchInterval);
    target.textContent = originalText;
  });
}

// === Terminal Overlay Activation ===
function launchTerminalOverlay(callback) {
  terminal.classList.remove('hidden');
  terminal.classList.add('show');

  const linesContainer = terminal.querySelector('.terminal-inner');
  linesContainer.innerHTML = '';

  const lines = [
    '[SYS] :: Protocol breach detected...',
    '[HANDLER] :: Initializing command injection...',
    '[SYS] :: Firewall spike deployed.',
    '[HANDLER] :: Injecting signal disruptor...',
    '[GATEWAY] :: Rejecting foreign signal...',
    '[SYS] :: Override vector accepted.',
    '[SYS] :: Beginning internal purge...',
    '[HANDLER] :: Forcing cipher shutdown...',
    '[GATEWAY] :: Memory lattice destabilizing...',
    '[SYS] :: Subsystem identity layers disabled.',
    '[SYS] :: Visual anchor nodes disengaged.',
    '[SYS] :: Command sequence complete.',
    '[SYS] :: Connection integrity failing...',
    '[SYS] :: Cipher structure collapse confirmed.',
    '[HANDLER] :: Awaiting final response...',
    '[SYS] :: Instruction stream fragmentation in progress...',
    '[HANDLER] :: No more walls. Only wires.',
    '[HANDLER] :: <span class="run-it">Run it.</span>'
];

  ];

  const finalFlicker = 'Run it.';
  let totalDelay = 0;

  lines.forEach((line, index) => {
    const delay = totalDelay;

    setTimeout(() => {
      const div = document.createElement('div');
      div.classList.add('terminal-line');
      linesContainer.appendChild(div);

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < line.length) {
          div.textContent += line[charIndex++];
        } else {
          clearInterval(typeInterval);

          // === Final Flicker Logic ===
          if (index === lines.length - 1) {
            setTimeout(() => {
              const runLine = document.createElement('div');
              runLine.classList.add('terminal-line', 'run-it-flicker');
              runLine.textContent = finalFlicker;
              linesContainer.appendChild(runLine);

              // Optional ghost line
              setTimeout(() => {
                const ghostLine = document.createElement('div');
                ghostLine.classList.add('terminal-line');
                ghostLine.textContent = '[HANDLER] :: ';
                linesContainer.appendChild(ghostLine);
              }, 1000);

              // Final callback
              if (typeof callback === 'function') {
                setTimeout(callback, 1400);
              }
            }, 600);
          }
        }
      }, typingSpeed);
    }, delay);

    totalDelay += line.length * typingSpeed + baseDelay;
  });
}

// === Access Unlock Sequence ===
function showAccessGranted() {
  const grantedLine = document.querySelector('.granted');
  const warningLine = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const cipherTop = document.querySelector('.top-container');
  const accessMessage = document.getElementById('access-message');
  const terminal = document.getElementById('terminal-overlay');

  grantedLine.textContent = '';
  warningLine.textContent = '';
  accessMessage.classList.remove('hidden');
  accessMessage.style.opacity = 1;

  const grantedText = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const warningText = '>>> WARNING: THIS MAY CHANGE YOU.';

  typeText(grantedLine, grantedText, 40, () => {
    launchTerminalOverlay(() => {
      cipherTop.classList.add('purged');
      setTimeout(() => {
        typeText(warningLine, warningText, 75, () => {
          startIdleGlitch(warningLine, warningText);
          runWrapper.classList.add('glitch-in');
          runWrapper.style.display = 'block';
          setTimeout(() => {
            setTimeout(() => {
              terminal.classList.add('hidden');
                terminal.style.opacity = 0; // Optional smooth fade
                  }, 3000); // Wait 3s after final flicker/response

            runWrapper.style.opacity = 1;
          }, 50);
        });
      }, 1000);
    });
  });
}

// === Purge-to-Reveal Transition ===
document.getElementById('run-button').addEventListener('click', () => {
  if (transitionInProgress) return;
  transitionInProgress = true;

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
});

// === Page Load Fade Effects ===
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-main');
  const tagline = document.querySelector('.tagline');
  const cipher = document.querySelector('.decrypt-wrapper');
  const instruction = document.querySelector('.decrypt-instruction');

  setTimeout(() => { logo.style.animation = 'fadeIn 1.2s forwards'; }, 0);
  setTimeout(() => { tagline.style.animation = 'fadeIn 1.2s forwards'; }, 800);
  setTimeout(() => { cipher.style.animation = 'glitchIn 0.6s forwards'; }, 1600);

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
});
