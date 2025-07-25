// === GRIMMWare OS Gateway Script ===

const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
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
        setTimeout(triggerFullscreenGlitch, 800);
      }
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
      el.classList.add('zap-glitch');
      setTimeout(() => {
        el.remove();
      }, 600);
    }
  }, delay);
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

// === Terminal Sequence Logic ===
function startTerminalSequence() {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const linesContainer = document.getElementById('terminal-lines');
  terminalOverlay.classList.add('show');
  terminalOverlay.classList.remove('hidden');
  linesContainer.innerHTML = '';

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
    { tag: '', text: '', delay: 0, isFinal: true }
  ];

  function typeLine({ tag, text, delay, isFinal }, index) {
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
      } else {
        clearInterval(interval);

        switch (index) {
          case 6: zapElement('.decrypt-instruction'); break;
          case 7: zapElement('.green'); break;
          case 8: zapElement('.box'); break;
          case 9: zapElement('.decrypt-wrapper'); break;
          case 10: zapElement('.tagline'); break;
          case 15: zapElement('.logo-main', 1500); break;
        }

        if (isFinal) {
          setTimeout(() => {
            injectFinalRunItLine();
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

  // Force reflow before animation trigger
  void runItSpan.offsetWidth;

  // Remove any inline animation property to ensure CSS animation applies
  runItSpan.style.removeProperty('animation');

  requestAnimationFrame(() => {
    runItSpan.classList.remove('run-it');
    runItSpan.classList.add('run-it-flicker', 'shock-pulse');
  });

  linesContainer.scrollTop = linesContainer.scrollHeight;
  linesContainer.classList.add('terminal-pulse');
  setTimeout(() => linesContainer.classList.remove('terminal-pulse'), 1000);
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
        runWrapper.classList.remove('hidden');
        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
      });
    }, 1000);
  });
}

// === RUN BUTTON / TRANSITION ===
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

// === ON LOAD SETUP ===
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-main');
  const tagline = document.querySelector('.tagline');
  const cipher = document.querySelector('.decrypt-wrapper');
  const instruction = document.querySelector('.decrypt-instruction');

  setTimeout(() => { logo.style.animation = 'fadeIn 1.2s forwards'; }, 0);
  setTimeout(() => { tagline.style.animation = 'fadeIn 1.2s forwards'; }, 800);
  setTimeout(() => {
    cipher.classList.remove('hidden');
    cipher.style.animation = 'glitchIn 0.6s forwards';
  }, 1600);

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
