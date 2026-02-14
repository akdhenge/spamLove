/* ===== CONFIGURATION ===== */
const CONFIG = {
  husbandName: "Akshay",
  wifeName: "Antika",
  petNames: ["Pillow", "Cutie", "Supercutie", "Princess"],
  loveLetter: `Dear Pillow,

If you've made it past the world's most important security checkpoint, congratulations \u2014 you are officially certified as my Supercutie.

I know I don't say it enough, so let me be clear today: I love you — not despite your need to control everything, your stubbornness, your talent for conflict, and your legendary allergy to apologies... but somehow, *along with* all of it.

You are the person without whom I am genuinely incomplete. That's not poetry — that's just the terrifying truth.

And yes, I have a wishlist of changes for you. But whether you ever open that memo or not, I would choose you before anyone else on this planet — and that includes Ana de Armas, Amanda Cerny, Kriti Sanon, and the entire andu-pandu celebrity universe.

I will always be a sapiosexual. You are my one beautiful, maddening exception.

❤️Happy Valentine's Day, my love.❤️ Here's to a lifetime of more fights (that I'll let you win) 
with all my love (and all my complaints),
`,
};

/* ===== GRID IMAGES CONFIG ===== */
// Swap `src` to real photo paths when ready. isCorrect = husband photos.
const GRID_IMAGES = [
  { src: "images/grid/hair.jpg", isCorrect: true,  label: "Husband\n(obvious)",  color: "#4caf50", type: "husband" },
  { src: "images/grid/cow.webp", isCorrect: false, label: "Landscape\n(mountain)",  color: "#90a4ae", type: "cutie" },
  { src: "images/grid/maggi.jpg", isCorrect: false, label: "Maggi\nPacket",   color: "#ff9800", type: "maggi" },
  { src: "images/grid/gangs.jpeg", isCorrect: true,  label: "Husband\n(selfie)",   color: "#66bb6a", type: "husband" },
  { src: "images/grid/dog_flower.jpeg", isCorrect: false, label: "Random\nDog",     color: "#8d6e63", type: "dogy" },
  { src: "images/grid/bod.jpg", isCorrect: true,  label: "Husband\n(tiny bg)",  color: "#43a047", type: "husband" },
  { src: "images/grid/fake_child.jpeg", isCorrect: false, label: "Celebrity\nLook-alike", color: "#ab47bc", type: "lookalike" },
  { src: "images/grid/cat.jpg", isCorrect: false, label: "Sunset\nBeach",   color: "#ff7043", type: "decoy" },
  { src: "images/grid/real_child.jpeg", isCorrect: true,  label: "Husband\n(baby pic)", color: "#2e7d32", type: "husband" },
  { src: "images/grid/girl.jpg", isCorrect: false, label: "Coffee\nCup",     color: "#795548", type: "cutie" },
  { src: "images/grid/funny-wet-cat.webp", isCorrect: false, label: "Cat\nPhoto",      color: "#78909c", type: "decoy" },
  { src: "images/grid/super.jpg", isCorrect: true,  label: "Husband\n(close-up)", color: "#388e3c", type: "husband" },
  { src: "images/grid/snake.jpg", isCorrect: false, label: "Street\nFood",    color: "#ff8a65", type: "cutie" },
  { src: "images/grid/shakti.jpeg", isCorrect: true,  label: "Husband\n(disguise)", color: "#1b5e20", type: "husband" },
  { src: "images/grid/nun.jpeg", isCorrect: false, label: "Horror\nMovie",   color: "#37474f", type: "decoy" },
  { src: "images/grid/pass.jpg", isCorrect: true,  label: "Husband\n(camouflaged)", color: "#4a7c4f", type: "husband" },
];

/* ===== FAILURE MESSAGES ===== */
const FAILURE_MESSAGES = [
  "Verification failed. Your husband is very sad, he will need months of playing dota2 to get over this.",
  "Incorrect. A notification has been sent to your husband. He is now sad, maybe consider looking for that curved screen.",
  "FAILED. Husband Recognition Score: 2/10. This is concerning, shemde.",
  "Wrong answer. Maybe spend less time on insta and more time looking at your husband?",
  "CAPTCHA failed. Forwarding your results to marriage counselor...",
  "Access denied. Fun fact: Your husband spent hours setting this up. The least you could do is find him, gandu.",
  "ERROR: Love.exe has stopped working. Please try again, Supercutie.",
  "Incorrect. Your husband's attractiveness is clearly too powerful to identify.",
];

const SPECIAL_FAILURES = {
  lookalike: "ALERT: Dude!! that kids is someone else's husband now. Suspicious activity logged. Should we be worried?",
  maggi: "That's maggi, not your husband, you bukkad. We know you love both, but focus please.",
  cutie: "I asked you to select my photos, not your own.",
  dogy: "Wow!! calling me dog wasnt enough, now i look like a dog to you. I am out of here!",
};

const LOADING_TEXTS = [
  "Decrypting love message...",
  "Loading romance module...",
  "Boiling maggi for celebration...",
  "Deploying feelings...",
  "Calibrating heart rate...",
];

const STAR_MESSAGES = {
  1: "One star?! Really? Shona Gooocha!!",
  2: "Two stars? That's lower than horror movies you make me watch.",
  3: "Three stars is for Uber drivers, not husbands. Try again, Princess.",
  4: "So close! What more do you want for that last star? giving away all my peace was not enough?",
  5: "CORRECT ANSWER! See, you CAN be right sometimes!",
};

/* ===== STATE ===== */
let state = {
  phase: "robot-check", // robot-check | captcha | transition | valentine
  attempts: 5,
  totalFailures: 0,
  selectedCells: new Set(),
  unsubClickCount: 0,
};

/* ===== HELPERS ===== */

function generatePlaceholderSVG(item, index) {
  const lines = item.label.split("\n");
  const textElements = lines.map((line, i) => {
    const y = lines.length === 1 ? 55 : 45 + i * 22;
    return `<text x="50" y="${y}" text-anchor="middle" fill="white" font-size="11" font-family="Arial, sans-serif" font-weight="bold">${escapeXml(line)}</text>`;
  }).join("");

  const border = item.isCorrect ? "#2e7d32" : "#616161";

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${item.color}"/>
      <rect x="1" y="1" width="98" height="98" fill="none" stroke="${border}" stroke-width="2" stroke-dasharray="${item.isCorrect ? '4' : '0'}"/>
      ${textElements}
      <text x="50" y="92" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Arial">#${index + 1}</text>
    </svg>`
  )}`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===== INIT ===== */
let shuffledImages = [];

document.addEventListener("DOMContentLoaded", () => {
  shuffledImages = shuffleArray(GRID_IMAGES.map((img, i) => ({ ...img, origIndex: i })));
  initRobotCheck();
});

/* ===== PHASE 1: ROBOT CHECK ===== */
function initRobotCheck() {
  const robotCheck = document.getElementById("robot-check");
  robotCheck.addEventListener("click", handleRobotClick);
}

function handleRobotClick() {
  const robotCheck = document.getElementById("robot-check");
  const spinner = document.getElementById("checkbox-spinner");
  const checkboxInner = document.getElementById("checkbox-inner");

  robotCheck.removeEventListener("click", handleRobotClick);
  robotCheck.classList.add("checked");

  // Show spinner
  spinner.classList.add("active");

  setTimeout(() => {
    spinner.classList.remove("active");
    checkboxInner.classList.add("show");

    // Transition to grid after a beat
    setTimeout(() => {
      showCaptchaGrid();
    }, 500);
  }, 1500);
}

/* ===== PHASE 1: CAPTCHA GRID ===== */
function showCaptchaGrid() {
  state.phase = "captcha";
  const gridSection = document.getElementById("captcha-grid-section");
  const grid = document.getElementById("captcha-grid");

  // Build grid cells
  shuffledImages.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.dataset.index = index;

    const imgSrc = item.src || generatePlaceholderSVG(item, item.origIndex);
    cell.innerHTML = `
      <img src="${imgSrc}" alt="Grid image ${index + 1}" draggable="false">
      <div class="cell-overlay">
        <div class="check-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `;

    cell.addEventListener("click", () => toggleCell(cell, index));
    grid.appendChild(cell);
  });

  gridSection.classList.remove("hidden");
  document.getElementById("verify-btn").addEventListener("click", handleVerify);
  updateProgressBar();
}

function toggleCell(cell, index) {
  if (state.phase !== "captcha") return;

  cell.classList.toggle("selected");
  if (state.selectedCells.has(index)) {
    state.selectedCells.delete(index);
  } else {
    state.selectedCells.add(index);
  }
  updateProgressBar();
}

function updateProgressBar() {
  const correctIndices = shuffledImages
    .map((img, i) => img.isCorrect ? i : -1)
    .filter(i => i !== -1);

  const correctSelected = correctIndices.filter(i => state.selectedCells.has(i)).length;
  const progress = (correctSelected / correctIndices.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function handleVerify() {
  if (state.phase !== "captcha") return;

  const correctIndices = new Set(
    shuffledImages.map((img, i) => img.isCorrect ? i : -1).filter(i => i !== -1)
  );

  // Check if selection is exactly correct
  const selectedArr = [...state.selectedCells];
  const allCorrectSelected = [...correctIndices].every(i => state.selectedCells.has(i));
  const noWrongSelected = selectedArr.every(i => correctIndices.has(i));

  if (allCorrectSelected && noWrongSelected) {
    handleSuccess();
    return;
  }

  // Check for special failures
  let specialMsg = null;
  for (const idx of selectedArr) {
    const item = shuffledImages[idx];
    if (!item.isCorrect && SPECIAL_FAILURES[item.type]) {
      specialMsg = SPECIAL_FAILURES[item.type];
      break;
    }
  }

  state.attempts--;
  state.totalFailures++;

  const failureDiv = document.getElementById("failure-message");
  failureDiv.textContent = specialMsg || randomFrom(FAILURE_MESSAGES);
  failureDiv.classList.remove("hidden");
  // Re-trigger animation
  failureDiv.style.animation = "none";
  failureDiv.offsetHeight; // reflow
  failureDiv.style.animation = "";

  const attemptsSpan = document.getElementById("attempts-count");

  if (state.attempts <= 0) {
    failureDiv.textContent = "SYSTEM ERROR: Cannot lock you out. Love override activated. Counter reset.";
    state.attempts = 5;
  }

  attemptsSpan.textContent = state.attempts;

  // Show hints after 2 total failures
  if (state.totalFailures >= 2) {
    showHints();
  }

  // Clear selections
  state.selectedCells.clear();
  document.querySelectorAll(".grid-cell.selected").forEach(c => c.classList.remove("selected"));
  updateProgressBar();

  // Auto-hide failure message
  setTimeout(() => {
    failureDiv.classList.add("hidden");
  }, 4000);
}

function showHints() {
  shuffledImages.forEach((item, index) => {
    if (item.isCorrect && item.type === "husband") {
      // Only hint on tricky ones (not the obvious ones)
      const label = item.label.toLowerCase();
      if (label.includes("tiny") || label.includes("baby") || label.includes("close") || label.includes("disguise") || label.includes("camouflage")) {
        const cell = document.querySelectorAll(".grid-cell")[index];
        if (cell && !cell.classList.contains("hint-pulse")) {
          cell.classList.add("hint-pulse");
        }
      }
    }
  });
}

/* ===== SUCCESS TRANSITION ===== */
function handleSuccess() {
  state.phase = "transition";

  // Hide grid and failure
  document.getElementById("captcha-grid-section").classList.add("hidden");
  document.getElementById("failure-message").classList.add("hidden");
  document.getElementById("robot-check").classList.add("hidden");

  // Show success state
  const successState = document.getElementById("success-state");
  successState.classList.remove("hidden");

  // Animate loading bar with cycling text
  const loadingBar = document.getElementById("loading-bar");
  const loadingText = document.getElementById("loading-text");
  let textIndex = 0;
  let progress = 0;

  const textInterval = setInterval(() => {
    textIndex = (textIndex + 1) % LOADING_TEXTS.length;
    loadingText.style.opacity = 0;
    setTimeout(() => {
      loadingText.textContent = LOADING_TEXTS[textIndex];
      loadingText.style.opacity = 1;
    }, 200);
  }, 800);

  const progressInterval = setInterval(() => {
    progress += 2;
    loadingBar.style.width = Math.min(progress, 100) + "%";
    if (progress >= 100) {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      setTimeout(transitionToValentine, 500);
    }
  }, 80);
}

function transitionToValentine() {
  // Fire confetti
  fireHeartConfetti();

  // Fade out captcha
  const captchaSection = document.getElementById("captcha-section");
  captchaSection.classList.add("fade-out");

  setTimeout(() => {
    captchaSection.classList.add("hidden");

    // Show valentine
    const valentineSection = document.getElementById("valentine-section");
    valentineSection.classList.remove("hidden");
    state.phase = "valentine";

    // Start animations
    createFloatingHearts();
    startTypewriter();

    // Show cookie popup after delay
    setTimeout(showCookiePopup, 3000);

    // Another confetti burst
    setTimeout(fireHeartConfetti, 500);
  }, 800);
}

/* ===== CONFETTI ===== */
function fireHeartConfetti() {
  if (typeof confetti === "undefined") return;

  // Heart-shaped confetti
  const heart = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    shapes: [heart, "circle"],
    colors: ["#ff4b6e", "#ff8fa3", "#c94b7c", "#e8a0b4", "#fff", "#fbbc04"],
    scalar: 1.2,
  });
}

/* ===== FLOATING HEARTS ===== */
function createFloatingHearts() {
  const container = document.getElementById("floating-hearts");
//  const hearts = ["\u2764\ufe0f", "\ud83d\udc95", "\ud83d\udc96", "\ud83d\udc97", "\ud83d\udc93", "\u2665\ufe0f"];
const hearts = [
  "\u2764\ufe0f", // ❤️
  "\ud83d\udc95", // 💕
  "\ud83d\udc96", // 💖
  "\ud83d\udc97", // 💗
  "\ud83d\udc93", // 💓
  "\u2665\ufe0f", // ♥️

  "\ud83e\udd8d", // 🦍 Gorilla
  "\ud83e\udda7", // 🦧 Orangutan
  "\ud83e\udd9b", // 🦛 Hippo
  "\ud83d\udc04", // 🐄 Cow
  "\ud83d\udc03"  // 🐃 Water Buffalo
];

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = randomFrom(hearts);
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (40 + Math.random() * 18) + "px";
    heart.style.animationDuration = (6 + Math.random() * 8) + "s";
    heart.style.animationDelay = (Math.random() * 10) + "s";
    container.appendChild(heart);
  }
}

/* ===== TYPEWRITER ===== */
function startTypewriter() {
  const letterEl = document.getElementById("love-letter");
  const text = CONFIG.loveLetter;
  let index = 0;

  letterEl.innerHTML = '<span class="cursor"></span>';

  function type() {
    if (index < text.length) {
      const char = text[index];
      const cursor = letterEl.querySelector(".cursor");

      if (char === "\n") {
        cursor.insertAdjacentHTML("beforebegin", "<br>");
      } else {
        cursor.insertAdjacentText("beforebegin", char);
      }

      index++;
      const delay = char === "." || char === "," || char === "\n" ? 60 : 25;
      setTimeout(type, delay);
    } else {
      // Remove cursor after done
      setTimeout(() => {
        const cursor = letterEl.querySelector(".cursor");
        if (cursor) cursor.remove();
      }, 2000);
    }
  }

  // Small delay before starting
  setTimeout(type, 800);
}

/* ===== INTERACTIVE 1: LOVE METER ===== */
(function initLoveMeter() {
  const slider = document.getElementById("love-slider");
  const valueDisplay = document.getElementById("slider-value");
  const message = document.getElementById("slider-message");
  let snapTimeout = null;

  slider.addEventListener("input", () => {
    const val = parseInt(slider.value);
    valueDisplay.textContent = val + "%";

    if (val < 50) {
      message.textContent = "Nice try, Princess. The minimum love level is 100%. This is not negotiable.";
    } else if (val < 100) {
      message.textContent = "Getting warmer... but there's only one correct answer.";
    } else {
      message.textContent = "";
    }

    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
      slider.value = 100;
      valueDisplay.textContent = "100%";
      slider.classList.add("snap-back");
      message.textContent = val < 100 ? "Nice try! Auto-corrected to the truth." : "";
      setTimeout(() => slider.classList.remove("snap-back"), 500);
    }, 1500);
  });
})();

/* ===== INTERACTIVE 2: STAR RATING ===== */
(function initStarRating() {
  const container = document.getElementById("stars-container");
  const stars = container.querySelectorAll(".star");
  const message = document.getElementById("rating-message");
  let autoCorrectTimeout = null;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating);
      setStars(rating);
      message.textContent = STAR_MESSAGES[rating];

      if (rating === 5) {
        stars.forEach(s => {
          s.classList.add("pop");
          setTimeout(() => s.classList.remove("pop"), 300);
        });
        fireHeartConfetti();
      } else {
        // Auto-correct to 5 stars after 2 seconds
        clearTimeout(autoCorrectTimeout);
        autoCorrectTimeout = setTimeout(() => {
          setStars(5);
          message.textContent = "Auto-corrected to 5 stars. The system knows best.";
          fireHeartConfetti();
        }, 2000);
      }
    });

    // Hover effect for mobile tap
    star.addEventListener("mouseenter", () => {
      const rating = parseInt(star.dataset.rating);
      stars.forEach(s => {
        s.classList.toggle("hovered", parseInt(s.dataset.rating) <= rating);
      });
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach(s => s.classList.remove("hovered"));
    });
  });

  function setStars(rating) {
    stars.forEach(s => {
      s.classList.toggle("active", parseInt(s.dataset.rating) <= rating);
    });
  }
})();

/* ===== INTERACTIVE 3: UNSUBSCRIBE ===== */
(function initUnsubscribe() {
  const link = document.getElementById("unsubscribe-link");
  const modal = document.getElementById("unsubscribe-modal");
  const yesBtn = document.getElementById("unsub-yes");
  const noBtn = document.getElementById("unsub-no");
  const result = document.getElementById("unsub-result");

  link.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    result.classList.add("hidden");
    // Reset button sizes
    yesBtn.style.fontSize = "14px";
    yesBtn.style.padding = "10px 20px";
    noBtn.style.fontSize = "14px";
    noBtn.style.padding = "10px 20px";
    state.unsubClickCount = 0;
    yesBtn.textContent = "Yes, unsubscribe";
    yesBtn.disabled = false;
  });

  yesBtn.addEventListener("click", () => {
    state.unsubClickCount++;

    if (state.unsubClickCount >= 3) {
      result.classList.remove("hidden");
      result.textContent = 'ERROR 409: Cannot unsubscribe. Husband is permanently bundled with your life plan. Also, who will keep up with your nakhras?';
      yesBtn.disabled = true;
      yesBtn.style.opacity = "0.4";
      return;
    }

    // Shrink yes, grow no
    const yesFontSize = Math.max(14 - state.unsubClickCount * 3, 8);
    const yesPadding = Math.max(10 - state.unsubClickCount * 2, 4);
    const noFontSize = 14 + state.unsubClickCount * 4;
    const noPadding = 10 + state.unsubClickCount * 4;

    yesBtn.style.fontSize = yesFontSize + "px";
    yesBtn.style.padding = yesPadding + "px " + (yesPadding * 2) + "px";
    noBtn.style.fontSize = noFontSize + "px";
    noBtn.style.padding = noPadding + "px " + (noPadding * 2) + "px";

    result.classList.remove("hidden");
    result.textContent = "Processing... Are you really sure?";
  });

  noBtn.addEventListener("click", () => {
    result.classList.remove("hidden");
    result.textContent = "Smart choice, Pillow. Subscription renewed for another 50 years.";
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 2500);
  });

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
})();

/* ===== INTERACTIVE 4: TERMS & CONDITIONS ===== */
(function initTerms() {
  const link = document.getElementById("terms-link");
  const modal = document.getElementById("terms-modal");
  const acceptBtn = document.getElementById("terms-accept");

  link.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
  });

  acceptBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
})();

/* ===== INTERACTIVE 5: COOKIE POPUP ===== */
function showCookiePopup() {
  const popup = document.getElementById("cookie-popup");
  popup.classList.remove("hidden");
}

(function initCookiePopup() {
  const popup = document.getElementById("cookie-popup");
  const acceptBtn = document.getElementById("cookie-accept");
  const manageBtn = document.getElementById("cookie-manage");
  const result = document.getElementById("cookie-result");

  acceptBtn.addEventListener("click", () => {
    // Maggi + heart rain
    createMaggiRain();
    fireHeartConfetti();

    popup.classList.add("slide-out");
    setTimeout(() => popup.classList.add("hidden"), 500);
  });

  manageBtn.addEventListener("click", () => {
    result.classList.remove("hidden");
    result.textContent = 'All toggles locked to ON. Required for relationship functionality.';
    manageBtn.disabled = true;
    manageBtn.style.opacity = "0.5";
  });
})();

/* ===== MAGGI RAIN ===== */
function createMaggiRain() {
  const container = document.createElement("div");
  container.className = "maggi-rain";
  document.body.appendChild(container);

  const items = ["\ud83c\udf5c", "\u2764\ufe0f", "\ud83c\udf5c", "\ud83d\udc96", "\ud83c\udf5c", "\ud83c\udf1f"];

  for (let i = 0; i < 30; i++) {
    const item = document.createElement("div");
    item.className = "maggi-item";
    item.textContent = randomFrom(items);
    item.style.left = Math.random() * 100 + "%";
    item.style.animationDuration = (2 + Math.random() * 3) + "s";
    item.style.animationDelay = (Math.random() * 1.5) + "s";
    item.style.fontSize = (20 + Math.random() * 20) + "px";
    container.appendChild(item);
  }

  setTimeout(() => container.remove(), 6000);
}

/* ===== SCROLL FADE-IN OBSERVER ===== */
(function initScrollFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in-card").forEach((card) => {
    observer.observe(card);
  });
})();
