
document.addEventListener("DOMContentLoaded", () => {
  const sequences = {
    "loading-1": [
      ">>> Initializing GrimmWare OS...",
      ">>> Loading neural subroutines...",
      ">>> Injecting audio malware...",
      ">>> Establishing uplink with Gizmo...",
      ">>> Emotion = Executable"
    ],
    "loading-2": [
      ">>> Receiving encrypted payload...",
      ">>> Decrypting track metadata...",
      ">>> Parsing lyrical substructure...",
      ">>> Embedding sentiment protocol...",
      ">>> System ready. Engage transmission."
    ]
  };

  const typeLine = (element, line, delay = 50) => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        element.textContent += line.charAt(i);
        i++;
        if (i === line.length) {
          clearInterval(interval);
          element.textContent += "\n";
          resolve();
        }
      }, delay);
    });
  };

  const runTypingAnimation = async (containerId, lines) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let line of lines) {
      const lineElem = document.createElement("div");
      container.appendChild(lineElem);
      await typeLine(lineElem, line);
    }
  };

  runTypingAnimation("loading-1", sequences["loading-1"]);
  runTypingAnimation("loading-2", sequences["loading-2"]);
});
