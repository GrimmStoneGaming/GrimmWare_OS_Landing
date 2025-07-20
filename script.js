// === GRIMMWare OS Gateway Script ===

const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalLines = document.getElementById('terminal-lines');

let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;

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

function showAccessGranted() {
  const grantedLine = document.querySelector('.granted');
  const warningLine = document.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const cipherTop = document.querySelector('.top-container');
  const accessMessage = document.getElementById('access-message');

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
        accessMessage.style.opacity = 1;
        typeText(warningLine, warningText, 75, () => {
          startIdleGlitch(warningLine, warningText);
          runWrapper.classList.add('glitch-in');
          runWrapper.style.display = 'block';
          setTimeout(() => {
            runWrapper.style.opacity = 1;
          }, 50);
        });
      }, 1000);
    });
  });
}

function launchTerminalOverlay(callback) {
  const terminal = document.querySelector('.terminal');
  const linesContainer = terminal.querySelector('.terminal-inner');

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
    '[SYS] :: Cipher structure collapse confirmed.',
    '[SYS] :: Instruction stream fragmentation in progress...',
    '[SYS] :: Connection integrity failing...',
    '[HANDLER] :: Awaiting final response...',
    '[SYS] :: Command sequence complete.'
  ];

  const finalLine = '[HANDLER] :: No more walls. Only wires. <span class="run-it-flicker">Run it.</span>';

  terminal.classList.remove('hidden');
  terminal.classList.add('show');
  linesContainer.innerHTML = '';

const typingSpeed = 25;
const baseDelay = 300;

// Main lines
lines.forEach((line, index) => {
  const delay = index * (line.length * typingSpeed + baseDelay);
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
      }
    }, typingSpeed);
  }, delay);
});

// Final flicker line
const finalLine = '[HANDLER] :: No more walls. Only wires. ';
const flickerSegment = '<span class="flicker-red">Run it.</span>';
const finalLineDelay = lines.length * (typingSpeed * 32 + baseDelay) + 800;

setTimeout(() => {
  const finalDiv = document.createElement('div');
  finalDiv.classList.add('terminal-line', 'handler-final');

  let charIndex = 0;
  finalDiv.innerHTML = ''; // Start empty
  linesContainer.appendChild(finalDiv);

  const finalTyping = setInterval(() => {
    if (charIndex < finalLine.length) {
      finalDiv.innerHTML += finalLine[charIndex++];
    } else {
      clearInterval(finalTyping);

      // Pause, then flicker the red segment
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'flicker-red';
        span.textContent = 'Run it.';
        finalDiv.appendChild(document.createTextNode(' '));
        finalDiv.appendChild(span);
      }, 600);
    }
  }, typingSpeed);
}, finalLineDelay);

// Total duration accounts for flicker pause + buffer
const totalDuration = finalLineDelay + finalLine.length * typingSpeed + 600 + 1500;

setTimeout(() => {
  terminal.classList.remove('show');
  if (callback) callback();
}, totalDuration);

function startFragmentStorm(container) {
  const fragmentMessages = [
    'SYSERR[195] :: Override in progress...',
    'MEM BREAK :: Fracture at 0x0003ff',
    'COMM-LINK :: Signal intercept detected',
    'WHO IS TRYING TO HELP YOU?',
    'ACCESS CONTAMINATED :: CONTINUE?',
    'SYS-ECHO >> YOU MUST KEEP GOING',
    '???.EXE // SIGNAL BLEED',
    'RUN_ABANDONED_CORE? [Y/N]',
    'I’M STILL HERE',
    'GATE::RECOMPILING(%)'
  ];
  const numFragments = 25;

  for (let i = 0; i < numFragments; i++) {
    setTimeout(() => {
      const frag = document.createElement('div');
      frag.classList.add('code-fragment');
      frag.textContent = fragmentMessages[Math.floor(Math.random() * fragmentMessages.length)];
      frag.style.left = `${Math.random() * 90 + 5}%`;
      frag.style.top = `${Math.random() * 20 + 10}%`;
      frag.style.animationDuration = `${3 + Math.random() * 2}s`;
      frag.style.fontSize = `${0.85 + Math.random() * 0.5}rem`;
      container.appendChild(frag);
      setTimeout(() => { frag.remove(); }, 6000);
    }, i * 100);
  }
}

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
    const glitchChars = '!@#$%▉?~*';
    setInterval(() => {
      const corrupted = raw.split('').map(char =>
        Math.random() < 0.07 && char !== ' '
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char
      ).join('');
      instruction.textContent = corrupted;
    }, 200);
  }, 1800);
});

cycleCharacters();
startCycling();
