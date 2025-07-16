
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const characters = '01GWO$';
  const charsArray = characters.split('');
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff3b3b';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charsArray[Math.floor(Math.random() * charsArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);

  function runTypedAnimation(containerId, lines, colorClass = '') {
    const container = document.querySelector(containerId);
    let lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          container.innerHTML = '';
          lineIndex = 0;
          typeNextLine();
        }, 2000);
        return;
      }

      const line = lines[lineIndex];
      const p = document.createElement('p');
      const span = document.createElement('span');
      if (colorClass) span.classList.add(colorClass);
      p.appendChild(span);
      container.appendChild(p);

      let charIndex = 0;

      function typeChar() {
        if (charIndex < line.length) {
          span.innerHTML = line.slice(0, charIndex + 1);
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          lineIndex++;
          setTimeout(typeNextLine, 500);
        }
      }

      typeChar();
    }

    container.innerHTML = '';
    typeNextLine();
  }

  runTypedAnimation('#loading-1', [
    '>>> Authenticating system integrity...',
    '>>> Initializing GWOS...',
    '>>> SYSTEM BREACH IMMINENT...'
  ]);

  runTypedAnimation('#loading-2', [
    '>>> Compiling pain... Complete',
    '>>> Parsing guilt... Complete',
    '>>> Injecting honesty... Complete',
    '>>> WARNING: Emotional stability compromised...',
    '>>> Manifesting audio signature...',
    '>>> SIGNAL DISTORTION DETECTED...',
    '>>> ...recalibrating...',
    '>>> AUTHORIZED OVERRIDE — PLAYBACK UNLOCKED',
    '>>> Deploying featured track: I See It All'
  ]);
});
