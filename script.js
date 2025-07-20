OG JS


// === GRIMMWare OS Gateway Script ===

const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
const terminalOverlay = document.getElementById('terminal-overlay');
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

// === Terminal Overlay Activation ===
function launchTerminalOverlay(callback) {
  const terminal = document.getElementById('terminal-overlay');
  const linesContainer = terminal.querySelector('.terminal-inner');
  terminal.classList.remove('hidden');
  terminal.classList.add('show');
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
    '[HANDLER] ::'
  ];

  const runItText = 'Run it.';
  const runItTypingSpeed = 225;
  let totalDelay = 0;

  lines.forEach((line, index) => {
    const div = document.createElement('div');
    div.classList.add('terminal-line');

    const prefix = document.createElement('span');
    prefix.classList.add('handler-prefix');
    const split = line.split('::');
    prefix.textContent = split[0] + '::';

    const body = document.createElement('span');
    body.classList.add('line-body');
    body.textContent = '';

    div.appendChild(prefix);
    div.appendChild(body);
    linesContainer.appendChild(div);

    const delay = totalDelay;
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < split[1]?.length) {
          body.textContent += split[1][i++];
        } else {
          clearInterval(typeInterval);

          if (index === lines.length - 1) {
            setTimeout(() => {
              const flicker = document.createElement('div');
              flicker.classList.add('terminal-line');
              flicker.innerHTML = `
                <span class="handler-prefix">[HANDLER] ::</span>
                <span class="run-it run-it-flicker"></span>`;
              linesContainer.appendChild(flicker);

              const runItTarget = flicker.querySelector('.run-it-flicker');
              let charIndex = 0;
              const runItInterval = setInterval(() => {
                if (charIndex < runItText.length) {
                  runItTarget.textContent += runItText[charIndex++];
                } else {
                  clearInterval(runItInterval);
                  setTimeout(() => {
                    if (typeof callback === 'function') callback();
                  }, 3000);
                }
              }, runItTypingSpeed);
            }, 600);
          }
        }
      }, 50);
    }, delay);

    totalDelay += (split[1]?.length || 0) * 50 + 350;
  });
}

// === Access Unlock Sequence ===
function showAccessGranted() {
  const grantedLine = document.querySelector('.granted');
  const warningLine = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const cipherTop = document.querySelector('#top-container');
  const accessMessage = document.getElementById('access-message');

  grantedLine.textContent = '';
  warningLine.textContent = '';

  if (accessMessage) {
    accessMessage.classList.remove('hidden');
    accessMessage.style.opacity = 1;
  }

  const grantedText = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const warningText = '>>> WARNING: THIS MAY CHANGE YOU.';

  typeText(grantedLine, grantedText, 40, () => {
    launchTerminalOverlay(() => {
      cipherTop.classList.add('purged');
      runWrapper.classList.add('glitch-in');
      runWrapper.style.display = 'block';

      setTimeout(() => {
        terminalOverlay.classList.add('hidden');
        terminalOverlay.style.opacity = 0;

        setTimeout(() => {
          typeText(warningLine, warningText, 75);
        }, 3000);
      }, 1000);
    });
  });
}

// === Startup ===
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
    const glitchChars = '!@#$%^&*';

    setInterval(() => {
      const corrupted = raw.split('').map(char =>
        Math.random() < 0.07 && char !== ' '
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char).join('');
      instruction.textContent = corrupted;
    }, 200);
  }, 1800);

  cycleCharacters();
  startCycling();
});
