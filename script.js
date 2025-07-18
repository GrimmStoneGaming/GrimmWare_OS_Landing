const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);

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

function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const runButton = document.getElementById('run-button');
  const line1 = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  let index = 0;

  accessMessage.classList.remove('hidden');
  accessMessage.textContent = '';

  const typeInterval = setInterval(() => {
    accessMessage.textContent += line1.charAt(index);
    index++;
    if (index === line1.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        runButton.style.display = 'block';
        runButton.classList.add('pulse');
      }, 800);
    }
  }, 50);
}

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

  document.querySelector('.decrypt-boxes').style.display = 'none';
  document.querySelector('.decrypt-instruction').style.display = 'none';
  document.getElementById('access-message').style.display = 'none';
  document.getElementById('run-button').style.display = 'none';

  overlay.style.display = 'flex';

  setTimeout(() => {
    document.getElementById('landing-page').style.display = 'flex';
  }, numStrips * 80 + 1200);
});

// Start
cycleCharacters();
startCycling();
