// === GRIMMWare OS Gateway Script ===

const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;

// === SOUND EFFECTS ===
const sfx = {
  intro: document.getElementById('glitchIntro'),
  loop: document.getElementById('glitchThrob'),
  success: document.getElementById('cipherSuccess'),
  fail: document.getElementById('cipherFail'),
  hack: document.getElementById('hackNoise'),
  terminal: document.getElementById('terminalTheme'),
  click: document.getElementById('runItClick'),
};

// === TIMING CONSTANTS ===
const typingSpeed = 35;
const baseDelay = 100;

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
  }, 1000);
}

boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.classList.add('green');
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.textContent = correctCode[i];
      sfx.success?.play();
      currentGreenIndex = null;

      if (solved.every(Boolean)) {
        clearInterval(intervalId);
        setTimeout(triggerFullscreenGlitch, 800);
      }
    } else {
      sfx.fail?.play();
    }
  });
});

function triggerFullscreenGlitch() {
  const glitchDiv = document.createElement('div');
  glitchDiv.classList.add('fullscreen-glitch');
  document.body.appendChild(glitchDiv);
  sfx.hack?.play();
  setTimeout(() => {
    glitchDiv.remove();
    startTerminalSequence();
  }, 2400);
}

function zapElement(selector, delay = 0) {
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
      const access = document.getElementById('access-container');
      if (access) access.classList.add('shift-up');
    }, 600);
  }
}

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

function startTerminalSequence() {
  const overlay = document.getElementById('terminal-overlay');
  const lines = document.getElementById('terminal-lines');
  overlay.classList.add('show');
  overlay.classList.remove('hidden');
  lines.innerHTML = '';
  sfx.terminal?.play();

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
    { tag: '', text: '', delay: 300, action: () => zapElement('.logo-container') },
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
    lines.appendChild(line);
    overlay.scrollTop = overlay.scrollHeight;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        content.textContent += text.charAt(charIndex++);
        overlay.scrollTop = overlay.scrollHeight;
      } else {
        clearInterval(interval);

        if (index === 6) zapElement('.decrypt-instruction');
        if (index === 7) {
          const green = document.querySelectorAll('.green');
          [...green].sort(() => Math.random() - 0.5).forEach((el, i) => {
            setTimeout(() => zapElement(`#${el.id}`), i * 75);
          });
        }
        if (index === 8) {
          const remain = document.querySelectorAll('.box:not(.green)');
          [...remain].sort(() => Math.random() - 0.5).forEach((el, i) => {
            setTimeout(() => zapElement(`#${el.id}`), i * 75);
          });
        }
        if (index === 9) zapElement('.decrypt-wrapper');
        if (index === 10) zapElement('.tagline');
        if (action) action();

        if (isFinal) {
          setTimeout(() => {
            injectFinalRunItLine();
            purgeTopContainer();
            setTimeout(() => {
              overlay.classList.add('hidden');
              revealAccessGranted();
            }, 3000);
          }, 500);
        } else if (index + 1 < sequence.length) {
          setTimeout(() => typeLine(sequence[index + 1], index + 1), delay);
        }
      }
    }, typingSpeed);
  }

  typeLine(sequence[0], 0);
}

function injectFinalRunItLine() {
  const container = document.getElementById('terminal-lines');
  const finalLine = document.createElement('div');
  finalLine.classList.add('terminal-line');
  finalLine.innerHTML = `<span class="handler-prefix">[HANDLER] ::</span><span class="run-it">Run it.</span>`;
  container.appendChild(finalLine);
  requestAnimationFrame(() => {
    const runItSpan = finalLine.querySelector('.run-it');
    runItSpan.classList.add('run-it-flicker', 'shock-pulse');
  });
  container.scrollTop = container.scrollHeight;
  container.classList.add('terminal-pulse');
  setTimeout(() => container.classList.remove('terminal-pulse'), 1000);
}

function revealAccessGranted() {
  const granted = document.querySelector('.granted');
  const warning = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const message = document.getElementById('access-message');
  message.classList.remove('hidden');
  message.style.opacity = 1;

  typeText(granted, 'ACCESS GRANTED.  SYSTEM UNLOCKED.', 40, () => {
    setTimeout(() => {
      typeText(warning, '>>> WARNING: THIS MAY CHANGE YOU.', 75, () => {
        warning.classList.add('glitch');
        const rawText = warning.textContent;
        const glitchChars = '!@#$%?~*';
        setInterval(() => {
          warning.textContent = rawText.split('').map(c =>
            Math.random() < 0.07 && c !== ' ' ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
          ).join('');
        }, 200);
        runWrapper.classList.remove('hidden');
        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
      });
    }, 1000);
  });
}

document.getElementById('run-button').addEventListener('click', () => {
  if (transitionInProgress) return;
  transitionInProgress = true;

  const overlay = document.getElementById('gateway-overlay');
  const landing = document.getElementById('landing-page');
  const runWrapper = document.getElementById('run-wrapper');
  const message = document.getElementById('access-message');

  const strips = 60, inDur = 500, outDur = 600, delayReveal = 1500;
  runWrapper.style.display = 'none';
  message.style.display = 'none';
  landing.style.display = 'flex';
  landing.style.opacity = 0;
  overlay.innerHTML = '';
  overlay.style.display = 'flex';
  overlay.style.background = 'transparent';

  for (let i = 0; i < strips; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip', 'cover');
    strip.style.left = `${(100 / strips) * i}%`;
    strip.style.width = `${100 / strips}%`;
    strip.style.animation = `fallCover ${inDur}ms forwards`;
    overlay.appendChild(strip);
  }

  setTimeout(() => {
    landing.style.opacity = 1;
    const parts = Array.from(overlay.querySelectorAll('.strip'));
    parts.sort(() => Math.random() - 0.5).forEach((strip, i) => {
      setTimeout(() => {
        strip.classList.remove('cover');
        strip.classList.add('reveal');
        strip.style.animation = `fallReveal ${outDur}ms forwards`;
      }, i * 30);
    });

    setTimeout(() => {
      overlay.style.display = 'none';
      const terminal = document.getElementById('terminal-overlay');
      if (terminal) terminal.classList.add('hidden');
    }, parts.length * 30 + outDur + 500);
  }, inDur + delayReveal);
});

window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-main');
  const tagline = document.querySelector('.tagline');
  const cipher = document.querySelector('.decrypt-wrapper');
  const instruction = document.querySelector('.decrypt-instruction');

  sfx.intro?.play();
  sfx.loop?.play();

  setTimeout(() => logo.style.animation = 'fadeIn 1.2s forwards', 0);
  setTimeout(() => tagline.style.animation = 'fadeIn 1.2s forwards', 800);
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
      instruction.textContent = raw.split('').map(c =>
        Math.random() < 0.07 && c !== ' '
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : c
      ).join('');
    }, 200);
  }, 1800);

  cycleCharacters();
  startCycling();
});
