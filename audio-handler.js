// === EASTER EGG AUDIO LOGIC FOR GRIMMWare OS (Scoped) === //

(() => {
  const gwosEasterTrack = new Audio("sounds/Dyfyushun.mp3");
  gwosEasterTrack.loop = true;
  gwosEasterTrack.volume = 0;

  let gwosTrackPaused = false;
  let gwosResumeTimer = null;

  // === FADE IN FUNCTION ===
  function gwosFadeInAudio(audio, duration = 1000) {
    audio.volume = 0;
    let vol = 0;
    const step = 50;
    const increment = 1 / (duration / step);
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += increment;
        audio.volume = Math.min(vol, 1);
      } else {
        clearInterval(fade);
      }
    }, step);
  }

  // === FADE OUT FUNCTION ===
  function gwosFadeOutAudio(audio, duration = 500) {
    let vol = audio.volume;
    const step = 25;
    const decrement = vol / (duration / step);
    const fade = setInterval(() => {
      if (vol > 0) {
        vol -= decrement;
        audio.volume = Math.max(vol, 0);
      } else {
        clearInterval(fade);
        audio.pause();
      }
    }, step);
  }

  // === HANDOFF TRIGGER FUNCTION (Call manually) ===
  function startHandoffTrack() {
    setTimeout(() => {
      gwosEasterTrack.play().then(() => {
        gwosFadeInAudio(gwosEasterTrack, 1000);
      }).catch(e => console.error("Audio play failed:", e));
    }, 2000);
  }

  // === YOUTUBE API HOOK ===
  let ytPlayer;

  function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player("yt-embed", {
      events: {
        'onStateChange': onYTPlayerStateChange
      }
    });
  }

  function onYTPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      if (!gwosTrackPaused) {
        gwosFadeOutAudio(gwosEasterTrack, 500);
        gwosTrackPaused = true;
      }
      if (gwosResumeTimer) {
        clearTimeout(gwosResumeTimer);
        gwosResumeTimer = null;
      }
    }

    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
      gwosResumeTimer = setTimeout(() => {
        if (gwosTrackPaused) {
          gwosEasterTrack.play().then(() => {
            gwosFadeInAudio(gwosEasterTrack, 500);
            gwosTrackPaused = false;
          });
        }
      }, 2000);
    }
  }

  // === AUTOTRIGGER (failsafe for button clicks) ===
  document.getElementById("run-button")?.addEventListener("click", () => {
    startHandoffTrack();
  });

  // === YT API LOAD ===
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
})();
