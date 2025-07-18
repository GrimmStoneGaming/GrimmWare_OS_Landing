const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);

// Random char generator
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Cycle characters in red unsolved boxes
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// Pulse one green box with correct char
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

// Box click check
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
        setTimeout(showAccessGranted, 1000);
      }
    }
  });
});

// Typewriter + glitch message
function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const runButton = document.getElementById('run-button');

  const line1 = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const line2 = '>>> RUNNING THIS MAY CHANGE YOU.';

  let index = 0;
  accessMessage.classList.remove('hidden', 'glitch', 'blink');
  accessMessage.textContent = '';

  const typeInterval = setInterval(() => {
    accessMessage.textContent += line1.charAt(index);
    index++;
    if (index === line1.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        typeLine2();
      }, 1000);
    }
  }, 50);

  function typeLine2() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('line-two');
    accessMessage.appendChild(wrapper);

    let i = 0;
    const interval = setInterval(() => {
      if (i < line2.length) {
        const charSpan = document.createElement('span');
        charSpan.textContent = line2.charAt(i);
        charSpan.classList.add('line2-char');
        wrapper.appendChild(charSpan);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          glitchRandomChars();
          runButton.style.display = 'block';
          runButton.classList.add('glitch');
        }, 800);
      }
    }, 100);
  }

  function glitchRandomChars() {
    const chars = document.querySelectorAll('.line2-char');
    const totalGlitches = 8;
    for (let i = 0; i < totalGlitches; i++) {
      const rand = Math.floor(Math.random() * chars.length);
      chars[rand].classList.add('glitch-char');
    }
  }
}

// Run button action: trigger rain-away
document.getElementById('run-button').addEventListener('click', () => {
  createRainOverlay();
  triggerRainAway();
});

// === RAIN AWAY EFFECT ===
function createRainOverlay() {
  const overlay = document.getElementById('gateway-overlay');
  overlay.innerHTML = '';

  const numStrips = 40;
  for (let i = 0; i < numStrips; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip');
    overlay.appendChild(strip);
  }
}

function triggerRainAway() {
  const strips = document.querySelectorAll('.strip');
  strips.forEach((strip, index) => {
    setTimeout(() => {
      strip.classList.add('rain-away');
    }, index * 50);
  });

  setTimeout(() => {
    document.getElementById('gateway-screen').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
  }, strips.length * 50 + 1500);
}

// Start cycling on load
cycleCharacters();
startCycling();
