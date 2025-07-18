const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false; // Anti-spam lock

// === Random Char Generator ===
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

// === Character Cycling ===
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// === Highlight One Green at a Time ===
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

// === Box Click Handler ===
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.textContent = correctCode[i];
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.classList.add('green');

      if (solved.every(Boolean)) {
        clearInterval(intervalId);
        setTimeout(showAccessGranted, 800);
      }
    }
  });
});

// === Glitch Typing Effect ===
function typeText(target, text, delay = 60, callback = null) {
  let i = 0;
  let interval = setInterval(() => {
    target.textContent = text.substring(0, i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}

function startIdleGlitch(target, originalText, frequency = 150) {
  const glitchChars = "!@#$%^&*()_+=~{}|<>?/\\";
  let glitchInterval = setInterval(() => {
    let glitchedText = originalText.split('').map((char) => {
      if (Math.random() < 0.05 && char !== ' ') {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        return char;
      }
    }).join('');
    target.textContent = glitchedText;
  }, frequency);

  target.addEventListener('mouseenter', () => {
    clearInterval(glitchInterval);
    target.textContent = originalText;
  });
}

// === ACCESS GRANTED + WARNING ===
function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const grantedLine = accessMessage.querySelector('.granted');
  const warningLine = accessMessage.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');

  grantedLine.textContent = '';
  warningLine.textContent = '';
  accessMessage.classList.remove('hidden');
  accessMessage.style.opacity = 1;

  const grantedText = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const warningText = '>>> WARNING: THIS MAY CHANGE YOU.';

  typeText(grantedLine, grantedText, 40, () => {
    typeText(warningLine, warningText, 75, () => {
      startIdleGlitch(warningLine, warningText);

      setTimeout(() => {
        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
      }, 600);
    });
  });
}

// === RUN BUTTON WIPES SCREEN ===
document.getElementById('run-button').addEventListener('click', () => {
  if (transitionInProgress) return;
  transitionInProgress = true;

  const overlay = document.getElementById('gateway-overlay');
  const gatewayUI = document.getElementById('gateway-ui');
  const landingPage = document.getElementById('landing-page');

  overlay.innerHTML = '';
  overlay.style.display = 'flex';

  const numStrips = 60;
  const delayBetween = 30;
  const fallDuration = 500;
  const holdBeforeReveal = 1200;
  const revealDuration = 500;

  // === PHASE 1: COVER ===
  let indexes = Array.from({ length: numStrips }, (_, i) => i);
  indexes.sort(() => Math.random() - 0.5); // shuffle order

  for (let i = 0; i < numStrips; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip', 'cover');
    strip.style.left = `${(100 / numStrips) * indexes[i]}%`;
    strip.style.width = `${100 / numStrips}%`;
    strip.style.animationDelay = `${i * delayBetween}ms`;
    overlay.appendChild(strip);
  }

  const totalCoverTime = (numStrips * delayBetween) + fallDuration;

// === PHASE 3 & 4: BLACKOUT COMPLETE → LANDING PAGE REVEAL & STRIPS FALL ===
setTimeout(() => {
  // Immediately hide gateway UI once fully blacked out
  gatewayUI.style.opacity = 0;
  gatewayUI.style.display = 'none';

  // Prep landing page under black cover
  landingPage.style.display = 'flex';
  landingPage.style.opacity = 0;
  landingPage.style.transition = 'opacity 1s ease';

  // Trigger fall animation
  const coverStrips = document.querySelectorAll('.strip.cover');
  coverStrips.forEach((strip, idx) => {
    strip.style.animation = 'fall 0.6s forwards';
    strip.style.animationDelay = `${idx * delayBetween}ms`;
  });

  // Delay LP fade just slightly to keep the illusion tight
  setTimeout(() => {
    landingPage.style.opacity = 1;
    overlay.style.display = 'none';
  }, 300 + numStrips * delayBetween); // strips falling + hold

}, totalCoverTime + 300); // SLIGHTLY earlier to cut out the flash
});

// === INIT ===
cycleCharacters();
startCycling();
