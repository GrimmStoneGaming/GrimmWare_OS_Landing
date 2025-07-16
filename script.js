// ⚙️ Gizmo's gwos-notepad red binary matrix effect 🚀
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = "01GWOSGIZMO"; // binary + "GWOS" + "GIZMO" nods
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);

      drops[i] = y > canvas.height && Math.random() > 0.975 ? 0 : drops[i] + 1;
    }
  }
  setInterval(drawMatrix, 33);

  // ✅ Fixed black bars with typing animations:
  function typeWriter(id, text, delay = 50) {
    const el = document.getElementById(id);
    let i = 0;
    el.innerHTML = '';
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i++);
        setTimeout(type, delay);
      }
    }
    type();
  }
  typeWriter('loading-1', '>>> Authenticating system integrity...');
  setTimeout(() => {
    typeWriter('loading-2', '>>> GWOS kernel online. Gizmo standing by...');
  }, 3000);

  // ✨ Reveal-on-scroll
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('reveal-active');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
