const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;

// === Safeguard: Prevent mismatch between box count and code ===
if (boxes.length !== correctCode.length) {
  console.error('Box count does not match code length.');
}

// === Random Char Generator ===
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

// === Randomize Box Letters (except green) ===
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// === Highlight Random Box Green ===
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

// === Box Click Logic ===
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

// === Typing Text Utility ===
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

// === Idle Glitch Loop ===
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

// === Grant Access & Show Warning ===
function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const grantedLine = accessMessage.querySelector('.granted');
  const warningLine = accessMessage.querySelector('.warning');
  const runWrapper = document.getElementById('run-wrapper');
  const cipherTop = document.querySelector('.top-container');

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
        cipherTop.style.transition = 'opacity 0.6s ease';
        cipherTop.style.opacity = 0;

        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
      }, 1500);
    });
  });
}

// === RUN IT Button: Screen Wipe and LP Reveal ===
document.getElementById('run-button').addEventListener('click', () => {
  if (transitionInProgress) return;
  transitionInProgress = true;

  const overlay = document.getElementById('gateway-overlay');
  const landingPage = document.getElementById('landing-page');
  const runWrapper = document.getElementById('run-wrapper');
  const accessMessage = document.getElementById('access-message');

  const numStrips = 60;           // ✅ Only declared once
  const delayBetween = 30;        // Time between bar drops (ms)
  const fallDuration = 600;       // Matches CSS fall animation duration

  // Instantly remove visible UI
  runWrapper.style.display = 'none';
  accessMessage.style.display = 'none';

  // Display and prep the landing page (but keep hidden)
  landingPage.style.display = 'flex';
  landingPage.style.opacity = 0;
  landingPage.style.transition = 'opacity 1s ease';

  // Double animation frame to ensure LP is visually rendered
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Prepare overlay
      overlay.innerHTML = '';
      overlay.style.display = 'flex';
      overlay.style.background = 'transparent';

      // Create and append strips
      for (let i = 0; i < numStrips; i++) {
        const strip = document.createElement('div');
        strip.classList.add('strip', 'cover');
        strip.style.position = 'absolute';
        strip.style.top = '0';
        strip.style.left = `${(100 / numStrips) * i}%`;
        strip.style.width = `${100 / numStrips}%`;
        strip.style.height = '100vh';
        strip.style.background = 'rgba(0, 255, 0, 0.15)'; // Subtle matrix green
        strip.style.animation = `fallReveal ${fallDuration}ms forwards`;
        strip.style.animationDelay = `${i * delayBetween}ms`;
        overlay.appendChild(strip);
      }

      // Start LP fade-in behind the falling bars
      setTimeout(() => {
        landingPage.style.opacity = 1;
      }, fallDuration + numStrips * delayBetween);

      // Clean up overlay after bars finish
      setTimeout(() => {
        overlay.style.display = 'none';
      }, fallDuration + numStrips * delayBetween + 500);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
  let currentGreenIndex = null;
  let intervalId = null;
  let solved = Array(boxes.length).fill(false);
  let transitionInProgress = false;

  // === Safeguard: Prevent mismatch between box count and code ===
  if (boxes.length !== correctCode.length) {
    console.error('Box count does not match code length.');
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

  cycleCharacters();
  startCycling();
});

