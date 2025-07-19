const boxes = document.querySelectorAll('.box');
const correctCode = ['G', 'W', 'O', 'S', 'E', 'X', 'E'];
let currentGreenIndex = null;
let intervalId = null;
let solved = Array(boxes.length).fill(false);
let transitionInProgress = false;

// Random Char Generator
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

// Cycle Box Characters (except green)
function cycleCharacters() {
  setInterval(() => {
    boxes.forEach((box, i) => {
      if (!solved[i] && i !== currentGreenIndex) {
        box.textContent = getRandomChar();
      }
    });
  }, 100);
}

// Highlight a new box green every 1.5s
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

// Box click logic
boxes.forEach((box, i) => {
  box.addEventListener('click', () => {
    if (i === currentGreenIndex && !solved[i]) {
      solved[i] = true;
      box.classList.add('green');
      box.style.backgroundColor = '#00ff00';
      box.style.boxShadow = '0 0 12px #00ff00';
      box.textContent = correctCode[i]; // <- forcefully assign correct char
      currentGreenIndex = null;

      if (solved.every(Boolean)) {
        clearInterval(intervalId);
        setTimeout(showAccessGranted, 800);
      }
    }
  });
});


// Typewriter utility
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

// Glitch idle loop
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

// Access Granted + Button Transition
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
    typeText(warningLine, warningText, 75, () => {
      startIdleGlitch(warningLine, warningText);

      setTimeout(() => {
        initiateCipherPurge();
        cipherTop.style.opacity = 0;
        cipherTop.style.pointerEvents = 'none';

        runWrapper.classList.add('glitch-in');
        runWrapper.style.display = 'block';
        setTimeout(() => {
          runWrapper.style.opacity = 1;
        }, 50);
      }, 1500);
    });
  });
}

// RUN IT Button Handler
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

  // STEP 1: Instant blackout
  runWrapper.style.display = 'none';
  accessMessage.style.display = 'none';

  // STEP 2: Prep landing page (stay invisible behind bars)
  landingPage.style.display = 'flex';
  landingPage.style.opacity = 0;

  // STEP 3: Generate and fall in 60 cover strips
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

  // STEP 4: Once bars are down, wait, then reveal LP
  setTimeout(() => {
    // Fully render LP now
    landingPage.style.opacity = 1;

    // STEP 5: Randomize order of strip fall-off
    const strips = Array.from(overlay.querySelectorAll('.strip'));
    const shuffled = strips.sort(() => Math.random() - 0.5);

    shuffled.forEach((strip, index) => {
      setTimeout(() => {
        strip.classList.remove('cover');
        strip.classList.add('reveal');
        strip.style.animation = `fallReveal ${fallOutDuration}ms forwards`;
      }, index * 30); // 30ms stagger per bar
    });

    // STEP 6: Clean up overlay after full sequence
    const totalDelay = shuffled.length * 30 + fallOutDuration;
    setTimeout(() => {
      overlay.style.display = 'none';
    }, totalDelay + 500);
  }, fallInDuration + delayBeforeReveal);
});

// Boot
cycleCharacters();
startCycling();


window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo-main');
  const tagline = document.querySelector('.tagline');
  const cipher = document.querySelector('.decrypt-wrapper');
  const instruction = document.querySelector('.decrypt-instruction');

  // Logo fade
  setTimeout(() => {
    logo.style.animation = 'fadeIn 1.2s forwards';
  }, 0);

  // Banner fade
  setTimeout(() => {
    tagline.style.animation = 'fadeIn 1.2s forwards';
  }, 800);

  // Cipher glitch
  setTimeout(() => {
    cipher.style.animation = 'glitchIn 0.6s forwards';
  }, 1600);

  // Glitched instruction injection
  setTimeout(() => {
    instruction.textContent = 'T4p _gr33n_ 2 d3crypt...';
    instruction.style.animation = 'corruptText 6s infinite';
    instruction.style.opacity = '1';

    const raw = 'T4p _gr33n_ 2 d3crypt...';
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
// === INITIATE PURGE SEQUENCE ===
function initiateCipherPurge() {
  const cipherTop = document.querySelector('.top-container');
  const overlay = document.getElementById('gateway-overlay');

  // 1. Trigger purge animation
  cipherTop.classList.add('purged');

  // 2. Start fragment storm
  startFragmentStorm(overlay);

  // 3. (Optional) Trigger sound, screen shake, or dark fade after fragments
  // setTimeout(() => {
  //   yourNextFunctionHere();
  // }, 2500);
}

// === CODE FRAGMENTS PAYLOAD ===
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
  'GATE::RECOMPILING(%)',
];

function startFragmentStorm(container) {
  const numFragments = 25;

  for (let i = 0; i < numFragments; i++) {
    setTimeout(() => {
      const frag = document.createElement('div');
      frag.classList.add('code-fragment');
      frag.textContent = fragmentMessages[Math.floor(Math.random() * fragmentMessages.length)];

      frag.style.left = `${Math.random() * 90 + 5}%`; // 5%–95% horizontal spread
      frag.style.top = `${Math.random() * 20 + 10}%`; // 10%–30% vertical start

      frag.style.animationDuration = `${3 + Math.random() * 2}s`; // 3–5s random drift
      frag.style.fontSize = `${0.85 + Math.random() * 0.5}rem`; // size variation

      container.appendChild(frag);

      // Auto cleanup after animation
      setTimeout(() => {
        frag.remove();
      }, 6000);
    }, i * 100); // Stagger fragment entry
  }
}

