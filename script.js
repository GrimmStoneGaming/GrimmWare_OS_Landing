// === SETUP ===
const boxes = document.querySelectorAll('.cipher-box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let solved = Array(correctCode.length).fill(false);
let charCycleInterval, greenCycleInterval;

// === RANDOM CHAR ===
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// === RED BOX CHAR CYCLER ===
function cycleCharacters() {
  charCycleInterval = setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// === GREEN BOX CYCLER ===
function cycleGreenBox() {
  greenCycleInterval = setInterval(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * boxes.length);
    } while (solved[nextIndex]);

    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('correct');
      }
    });

    currentGreenIndex = nextIndex;
    boxes[currentGreenIndex].classList.add('correct');
    boxes[currentGreenIndex].textContent = correctCode[currentGreenIndex];
  }, 1500);
}

// === CLICK TO SOLVE ===
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.textContent = correctCode[i];
      box.classList.add('correct');

      if (solved.every(Boolean)) {
        clearInterval(charCycleInterval);
        clearInterval(greenCycleInterval);
        showAccessMessage();
      }
    }
  });
});

// === ACCESS MESSAGE + RUN BUTTON ===
function showAccessMessage() {
  const message = document.getElementById('access-granted-message');
  const runButton = document.getElementById('run-it');
  message.classList.remove('hidden');
  runButton.classList.remove('hidden');
}

// === RAIN EFFECT + PAGE TRANSITION ===
document.getElementById('run-it').addEventListener('click', () => {
  const stripsContainer = document.getElementById('strips');
  stripsContainer.innerHTML = '';

  for (let i = 0; i < 30; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip');
    strip.style.setProperty('--delay', `${i * 80}ms`);
    stripsContainer.appendChild(strip);
  }

  // Hide gateway UI
  document.getElementById('gateway').style.display = 'none';

  // Wait for rain to finish
  setTimeout(() => {
    document.getElementById('landing-page').classList.remove('hidden');
  }, 3000);
});

// === INIT ===
window.addEventListener('DOMContentLoaded', () => {
  cycleCharacters();
  cycleGreenBox();
});
