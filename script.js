const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);

// === Random Char Generator ===
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

// === Cycle Random Characters ===
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// === Green Pulse Box Targeting ===
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

// === ACCESS GRANTED SEQUENCE ===
function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const grantedLine = accessMessage.querySelector('.granted');
  const warningLine = accessMessage.querySelector('.warning');
  const runWrapper = document.querySelector('.run-button-wrapper');

  grantedLine.textContent = '';
  warningLine.textContent = '';
  accessMessage.classList.remove('hidden');
  accessMessage.style.opacity = 1;

  const grantedText = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const warningText = '>>> WARNING: THIS MAY CHANGE YOU.';

  let index = 0;

  const typeInterval = setInterval(() => {
    grantedLine.textContent += grantedText.charAt(index);
    index++;
    if (index === grantedText.length) {
      clearInterval(typeInterval);

      setTimeout(() => {
        warningLine.textContent = warningText;
        runWrapper.style.display = 'block';
      }, 1000);
    }
  }, 50);
}

// === STRIP WIPE + LP REVEAL ===
document.getElementById('run-button').addEventListener('click', () => {
  const overlay = document.getElementById('gateway-overlay');
  overlay.innerHTML = '';

  const numStrips = 30;
  for (let i = 0; i < numStrips; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip');
    strip.style.animationDelay = `${i * 80}ms`;
    overlay.appendChild(strip);
  }

  document.querySelector('.decrypt-wrapper').style.display = 'none';
  document.querySelector('.decrypt-instruction').style.display = 'none';
  document.getElementById('access-message').style.display = 'none';
  document.querySelector('.run-button-wrapper').style.display = 'none';

  overlay.style.display = 'flex';

  setTimeout(() => {
    document.getElementById('landing-page').style.display = 'flex';
  }, numStrips * 80 + 1000);
});

// === INIT ===
cycleCharacters();
startCycling();
