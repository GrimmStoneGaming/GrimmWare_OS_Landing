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
    span.innerHTML = line;
    p.appendChild(span);
    container.appendChild(p);

    lineIndex++;
    setTimeout(typeNextLine, 500);
  }

  container.innerHTML = '';
  typeNextLine();
}

window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  runTypedAnimation('#loading-1', [
    '>>> Authenticating system integrity...',
    '>>> Initializing GWOS...',
    '>>> SYSTEM BREACH IMMINENT...'
  ]);

  runTypedAnimation('#loading-2', [
    '>>> Compiling pain... <span class="green">Complete</span>',
    '>>> Parsing guilt... <span class="green">Complete</span>',
    '>>> Injecting honesty... <span class="green">Complete</span>',
    '<span class="red bold">>>> WARNING: Emotional stability compromised...</span>',
    '<span class="pink">>>> Manifesting audio signature...</span>',
    '<span class="red bold">>>> SIGNAL DISTORTION DETECTED...</span>',
    '>>> ...recalibrating...',
    '<span class="green bold">>>> AUTHORIZED OVERRIDE — PLAYBACK UNLOCKED</span>',
    '<span class="green">>>> Deploying featured track: <em class="cyan">I See It All</em></span>'
  ]);
});
