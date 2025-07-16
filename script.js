window.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  const loading1 = document.getElementById("loading-1");
  const loading2 = document.getElementById("loading-2");

  function typeToElement(el, lines, delay = 60, loopDelay = 3000) {
    let i = 0, line = 0;
    el.innerHTML = "";

    function type() {
      if (line < lines.length) {
        if (i < lines[line].text.length) {
          const span = el.lastElementChild || document.createElement("span");
          if (!el.lastElementChild) {
            span.className = lines[line].class;
            el.appendChild(span);
          }
          span.innerHTML += lines[line].text.charAt(i);
          i++;
          setTimeout(type, delay);
        } else {
          el.innerHTML += "<br/>";
          i = 0;
          line++;
          setTimeout(type, delay);
        }
      } else {
        setTimeout(() => {
          el.innerHTML = "";
          i = 0;
          line = 0;
          type();
        }, loopDelay);
      }
    }

    type();
  }

  if (loading1 && loading2) {
    typeToElement(loading1, [
      { text: ">>> Initializing GWOS...", class: "cyan" },
      { text: ">>> System breach imminent...", class: "red" }
    ]);

    setTimeout(() => {
      typeToElement(loading2, [
        { text: ">>> Compiling pain...  Complete", class: "green" },
        { text: ">>> Parsing guilt...  Complete", class: "green" },
        { text: ">>> Injecting honesty...  Complete", class: "green" },
        { text: ">>> WARNING: Emotional stability compromised...", class: "red" },
        { text: ">>> Manifesting audio signature...", class: "pink" },
        { text: ">>> SIGNAL DISTORTION DETECTED...", class: "red" },
        { text: ">>> ...recalibrating...", class: "gray" },
        { text: ">>> AUTHORIZED OVERRIDE — PLAYBACK UNLOCKED", class: "lime" },
        { text: ">>> Deploying featured track: I See It All", class: "cyan" }
      ]);
    }, 2500);
  }
});
