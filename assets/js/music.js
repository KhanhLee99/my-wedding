const MUSIC_FILE = "bai27.mp3";
const musicList = [
  new URL(`musics/${MUSIC_FILE}`, window.location.href).href,
];

let index = 0;
let audio = new Audio(musicList[index]);
audio.loop = false;
audio.preload = "auto";

let musicStarted = false;
let isPlaying = false;

function getToggleElements() {
  return {
    toggleBtn: document.getElementById("music-toggle"),
    iconOn: document.getElementById("icon-on"),
    iconOff: document.getElementById("icon-off"),
  };
}

function updateIcon() {
  const { toggleBtn, iconOn, iconOff } = getToggleElements();
  if (!toggleBtn || !iconOn || !iconOff) return;

  if (isPlaying) {
    iconOn.style.display = "block";
    iconOff.style.display = "none";
    toggleBtn.classList.add("playing");
    toggleBtn.setAttribute("aria-pressed", "true");
    toggleBtn.setAttribute("title", "Tắt nhạc");
  } else {
    iconOn.style.display = "none";
    iconOff.style.display = "block";
    toggleBtn.classList.remove("playing");
    toggleBtn.setAttribute("aria-pressed", "false");
    toggleBtn.setAttribute("title", "Bật nhạc");
  }
}

function safePlay() {
  return audio.play().then(() => {
    musicStarted = true;
    isPlaying = true;
    updateIcon();
  }).catch((err) => {
    console.debug("Audio play blocked or failed:", err);
    throw err;
  });
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  updateIcon();
}

function toggleMusic() {
  if (!musicStarted) {
    safePlay().catch(() => {
      isPlaying = false;
      updateIcon();
    });
    return;
  }

  if (isPlaying) {
    pauseMusic();
  } else {
    safePlay().catch(() => {
      isPlaying = false;
      updateIcon();
    });
  }
}

audio.addEventListener("ended", function () {
  index = (index + 1) % musicList.length;
  audio.src = musicList[index];
  audio.play().then(() => {
    isPlaying = true;
    updateIcon();
  }).catch(() => {
    isPlaying = false;
    updateIcon();
  });
});

function startMusicOnFirstGesture() {
  if (musicStarted) return;
  safePlay().catch(() => {});
}

function initMusicToggle() {
  const { toggleBtn } = getToggleElements();
  if (!toggleBtn) {
    console.warn("music-toggle not found");
    return;
  }

  isPlaying = false;
  updateIcon();

  toggleBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    toggleMusic();
  });

  toggleBtn.addEventListener(
    "pointerdown",
    function (ev) {
      ev.stopPropagation();
    },
    { passive: true }
  );

  toggleBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMusic();
    }
  });
}

document.addEventListener("touchstart", startMusicOnFirstGesture, {
  once: true,
  passive: true,
});
document.addEventListener("mousedown", startMusicOnFirstGesture, { once: true });
document.addEventListener("wheel", startMusicOnFirstGesture, { once: true });

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMusicToggle);
} else {
  initMusicToggle();
}
