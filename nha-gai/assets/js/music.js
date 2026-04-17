const musicList = ["../musics/bai50.mp3"];

      let index = 0;
      let audio = new Audio(musicList[index]);
      audio.loop = false;

      let musicStarted = false;
      let isPlaying = false;

      const toggleBtn = document.getElementById("music-toggle");
      const iconOn = document.getElementById("icon-on");
      const iconOff = document.getElementById("icon-off");

      function updateIcon() {
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
        return audio
          .play()
          .then(() => {
            musicStarted = true;
            isPlaying = true;
            updateIcon();
          })
          .catch((err) => {
            console.debug("Audio play blocked or failed:", err);
            throw err;
          });
      }

      function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateIcon();
      }

      audio.addEventListener("ended", function () {
        index = (index + 1) % musicList.length;
        audio.src = musicList[index];
        audio
          .play()
          .then(() => {
            isPlaying = true;
            updateIcon();
          })
          .catch(() => {
            isPlaying = false;
            updateIcon();
          });
      });

      // -------------------
      // Start music on first gesture (iOS + Desktop)
      // -------------------
      function startMusicOnFirstGesture() {
        if (musicStarted) return;
        safePlay().catch(() => {});
      }

      // iOS
      document.addEventListener("touchstart", startMusicOnFirstGesture, {
        once: true,
        passive: true,
      });
      // Desktop
      document.addEventListener("mousedown", startMusicOnFirstGesture, {
        once: true,
      });
      document.addEventListener("wheel", startMusicOnFirstGesture, {
        once: true,
      });

      // -------------------
      // Toggle button
      // -------------------
      toggleBtn.addEventListener("click", function (ev) {
        ev.preventDefault();

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
      });

      isPlaying = false;
      updateIcon();

      toggleBtn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleBtn.click();
        }
      });
