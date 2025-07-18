const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);

// Generate random alphanumeric character
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Cycle characters in unsolved red boxes
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// Pulse one random box green every 1.5s
function startCycling() {
  intervalId = setInterval(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * boxes.length);
    } while (solved[nextIndex]);

    // Reset unsolved boxes to red
    boxes.forEach((box, i) => {
      if (!solved[i]) {
        box.classList.remove('green');
        box.style.backgroundColor = 'red';
        box.style.boxShadow = '0 0 8px #ff0000';
      }
    });

    // Highlight one box green with correct letter
    currentGreenIndex = nextIndex;
    const box = boxes[currentGreenIndex];
    box.classList.add('green');
    box.textContent = correctCode[currentGreenIndex];
    box.style.backgroundColor = '#00ff00';
    box.style.boxShadow = '0 0 8px #00ff00';
  }, 1500);
}

// Handle box click to solve correct box
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.textContent = correctCode[i];
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.classList.add('green');

      // Check if all are solved
      if (solved.every(Boolean)) {
        clearInterval(intervalId);
        setTimeout(showAccessGranted, 1000);
      }
    }
  });
});

// Reveal typewriter message + show run button
function showAccessGranted() {
  const accessMessage = document.getElementById('access-message');
  const runButton = document.getElementById('run-button');

  const line1 = 'ACCESS GRANTED. SYSTEM UNLOCKED.';
  const line2 = '>>> RUNNING THIS MAY CHANGE YOU.';

  let index = 0;

  accessMessage.classList.remove('hidden');
  accessMessage.textContent = '';
  accessMessage.classList.remove('glitch');

  // Type line 1
  const typeInterval = setInterval(() => {
    accessMessage.textContent += line1.charAt(index);
    index++;
    if (index === line1.length) {
      clearInterval(typeInterval);

      // Delay before glitch line drops
      setTimeout(() => {
        accessMessage.classList.add('glitch');
        accessMessage.textContent += '\n' + line2;
        setTimeout(() => {
          runButton.style.display = 'block';
          runButton.classList.add('pulse');
        }, 600);
      }, 1000); // pause before line 2
    }
  }, 50);
}

// RUN IT button action placeholder
document.getElementById('run-button').addEventListener('click', () => {
  console.log("RUN IT button clicked — trigger LP or next sequence here.");
  // Future integration point: trigger fade-out or LP reveal
});

// Init cycles
cycleCharacters();
startCycling();
