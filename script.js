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
  const glitchChars = "!@#$%^&*()_+=~{}|<>?/\";
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


/* === TERMINAL + GATEWAY LOGIC CONTINUED === */


// === Access Unlock Sequence ===
function showAccessGranted() {
  const grantedLine = document.querySelector('.granted');
  const warningLine = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const cipherTop = document.querySelector('#top-container');
  const accessMessage = document.getElementById('access-message');
  const terminalOverlay = document.getElementById('terminal-overlay');
  const linesContainer = document.getElementById('terminal-lines');

  const sequence = [
    { tag: 'SYS', text: 'Protocol breach detected...', delay: 1000 },
    { tag: 'HANDLER', text: 'Initializing command injection...', delay: 1000 },
    { tag: 'SYS', text: 'Firewall spike deployed.', delay: 1000 },
    { tag: 'HANDLER', text: 'Injecting signal disruptor...', delay: 1000 },
    { tag: 'GATEWAY', text: 'Rejecting foreign signal...', delay: 1000 },
    { tag: 'SYS', text: 'Override vector accepted.', delay: 1000 },
    { tag: 'SYS', text: 'Beginning internal purge...', delay: 1000 },
    { tag: 'HANDLER', text: 'Forcing cipher shutdown...', delay: 1000 },
    { tag: 'GATEWAY', text: 'Memory lattice destabilizing...', delay: 1000 },
    { tag: 'SYS', text: 'Subsystem identity layers disabled.', delay: 1000 },
    { tag: 'SYS', text: 'Visual anchor nodes disengaged.', delay: 1000 },
    { tag: 'SYS', text: 'Command sequence complete.', delay: 1000 },
    { tag: 'SYS', text: 'Connection integrity failing...', delay: 1000 },
    { tag: 'SYS', text: 'Cipher structure collapse confirmed.', delay: 1000 },
    { tag: 'HANDLER', text: 'Awaiting final response...', delay: 1000 },
    { tag: 'SYS', text: 'Instruction stream fragmentation in progress...', delay: 1000 },
    { tag: 'HANDLER', text: 'No more walls. Only wires.', delay: 2000 },
    {
      tag: 'HANDLER',
      text: '',
      delay: 0,
      isFinal: true,
    }
  ];

  function typeLine({ tag, text, delay, isFinal }, index) {
    const line = document.createElement('div');
    line.classList.add('terminal-line');

    const prefix = document.createElement('span');
    prefix.classList.add(`${tag.toLowerCase()}-prefix`);
    prefix.textContent = `[${tag}] ::`;
    line.appendChild(prefix);

    const content = document.createElement('span');
    content.classList.add('terminal-content');
    line.appendChild(content);

    linesContainer.appendChild(line);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        content.textContent += text.charAt(charIndex++);
      } else {
        clearInterval(interval);
        if (isFinal) {
          setTimeout(() => {
            const finalLine = document.createElement('div');
            finalLine.classList.add('terminal-line');

            const finalPrefix = document.createElement('span');
            finalPrefix.classList.add('handler-prefix');
            finalPrefix.textContent = `[HANDLER] ::`;
            finalLine.appendChild(finalPrefix);

            const runItSpan = document.createElement('span');
            runItSpan.classList.add('run-it', 'run-it-flicker');
            runItSpan.textContent = 'Run it.';
            finalLine.appendChild(runItSpan);
            linesContainer.appendChild(finalLine);

            setTimeout(() => {
              terminalOverlay.classList.add('hidden');
              terminalOverlay.style.opacity = 0;

              accessMessage.classList.remove('hidden');
              accessMessage.style.opacity = 1;

              typeText(grantedLine, 'ACCESS GRANTED.  SYSTEM UNLOCKED.', 40, () => {
                setTimeout(() => {
                  typeText(warningLine, '>>> WARNING: THIS MAY CHANGE YOU.', 75, () => {
                    runWrapper.classList.add('glitch-in');
                    runWrapper.style.display = 'block';
                  });
                }, 1000);
              });
            }, 3000);
          }, 500);
        } else if (index + 1 < sequence.length) {
          setTimeout(() => {
            typeLine(sequence[index + 1], index + 1);
          }, delay);
        }
      }
    }, 30);
  }

  terminalOverlay.classList.remove('hidden');
  terminalOverlay.style.opacity = 1;
  linesContainer.innerHTML = '';

  typeLine(sequence[0], 0);
}

// === Text Typing Helper ===
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

// === Startup Hook ===
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-main');
  const tagline = document.querySelector('.tagline');
  const decryptBoxes = document.querySelector('.decrypt-boxes');
  const decryptInstruction = document.querySelector('.decrypt-instruction');
  const runWrapper = document.getElementById('run-wrapper');

  // Optional startup fade-in if needed
  logo.style.opacity = 1;
  tagline.style.opacity = 1;
});
