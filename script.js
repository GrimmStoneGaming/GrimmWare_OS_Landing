const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let solved = Array(boxes.length).fill(false);
let greenCycleInterval = null;
let redCycleInterval = null;

// === RANDOM CHAR ===
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// === RED BOXES CYCLE ===
function cycleCharacters() {
  redCycleInterval = setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// === GREEN BOX PULSE ===
function startCycling() {
  greenCycleInterval = setInterval(() => {
    let next;
    do {
      next = Math.floor(Math.random() * boxes.length);
    } while (solved[next]);

    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('green');
        box.style.backgroundColor = 'red';
        box.style.boxShadow = '0 0 8px #ff0000';
      }
    });

    currentGreenIndex = next;
    const box = boxes[currentGreenIndex];
    box.classList.add('green');
    box.textContent = correctCode[currentGreenIndex];
    box.style.backgroundColor = '#00ff00';
    box.style.boxShadow = '0 0 8px #00ff00';
  }, 1500);
}

// === BOX CLICK ===
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.textContent = correctCode[i];
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.classList.add('green');

      if (solved.every(Boolean)) {
        clearInterval(greenCycleInterval);
        clearInterval(redCycleInterval);
        setTimeout(showAccessGranted, 800);
      }
    }
  });
});

// === ACCESS GRANTED ===
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
      }, 800);
    }
  }, 40);

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
        }, 600);
      }
    }, 80);
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

// === RAIN TRIGGER ===
document.getElementById('run-button').addEventListener('click', () => {
  const overlay = document.getElementById('gateway-overlay');
  overlay.innerHTML = '';
  overlay.style.display = 'flex';

  for (let i = 0; i < 40; i++) {
    const strip = document.createElement('div');
    strip.classList.add('strip');
    overlay.appendChild(strip);

    setTimeout(() => {
      strip.classList.add('rain-away');
    }, i * 60);
  }

  document.querySelector('.decrypt-boxes').style.display = 'none';
  document.querySelector('.decrypt-instruction').style.display = 'none';
  document.getElementById('access-message').style.display = 'none';
  document.getElementById('run-button').style.display = 'none';

  setTimeout(() => {
    document.getElementById('gateway-screen').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
  }, 40 * 60 + 1400);
});

// === INIT ===
cycleCharacters();
startCycling();
