**script.js**
```javascript
// ========== UTILITAS ==========
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

// ========== SKRIP UTAMA ==========
ready(() => {
  // ===== TEMA (DARK/LIGHT) =====
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const rootElement = document.documentElement;
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  function updateIcons(theme) {
    if (!iconSun || !iconMoon) return;
    if (theme === "dark") {
      iconSun.style.display = "none";
      iconMoon.style.display = "block";
    } else {
      iconSun.style.display = "block";
      iconMoon.style.display = "none";
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    rootElement.setAttribute("data-theme", savedTheme);
    updateIcons(savedTheme);
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      let currentTheme = rootElement.getAttribute("data-theme") || "light";
      let newTheme = currentTheme === "dark" ? "light" : "dark";
      rootElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcons(newTheme);
    });
  }

  // ===== SEARCH ARTIKEL =====
  const searchInput = document.getElementById("search");
  const articles = document.querySelectorAll(".card");

  function filterArticles(value) {
    articles.forEach((article) => {
      let titleEl = article.querySelector(".title-card, h2, h3");
      let title = titleEl ? titleEl.textContent.toLowerCase() : "";
      let tags = article.dataset.tags ? article.dataset.tags.toLowerCase() : "";
      let match = title.includes(value) || tags.includes(value);
      article.style.display = match ? "block" : "none";
    });
  }

  if (searchInput) {
    let timeout;
    searchInput.addEventListener("keyup", (e) => {
      clearTimeout(timeout);
      let value = e.target.value.toLowerCase();
      timeout = setTimeout(() => filterArticles(value), 200);
    });
  }

  // ===== ANIMASI SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
          else entry.target.classList.remove("visible");
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    function revealOnScroll() {
      let windowHeight = window.innerHeight;
      revealElements.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) el.classList.add("visible");
        else el.classList.remove("visible");
      });
    }
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);
  }

  // ===== FORMULIR TULIS ARTIKEL =====
  const form = document.getElementById("formArtikel") || document.getElementById("postForm");
  const previewContainer = document.getElementById("preview");

  if (form && previewContainer) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const judul = form.querySelector("#judul")?.value || form.querySelector("#title")?.value;
      const isi = form.querySelector("#isi")?.value || form.querySelector("#content")?.value;

      if (judul && isi) {
        let card = document.createElement("div");
        card.classList.add("card", "reveal");
        card.innerHTML = `<h3>${escapeHTML(judul)}</h3><p>${escapeHTML(isi)}</p>`;
        previewContainer.prepend(card);
        card.classList.add("visible");
        form.reset();
      }
    });
  }

  // ===== SPARKLE VINTAGE BACKGROUND =====
  const sparkleContainer = document.createElement("div");
  sparkleContainer.style.position = "fixed";
  sparkleContainer.style.top = 0;
  sparkleContainer.style.left = 0;
  sparkleContainer.style.width = "100%";
  sparkleContainer.style.height = "100%";
  sparkleContainer.style.pointerEvents = "none";
  sparkleContainer.style.overflow = "hidden";
  sparkleContainer.style.zIndex = "9999";
  sparkleContainer.style.mixBlendMode = "screen";
  document.body.appendChild(sparkleContainer);

  let sparkleInterval;
  let activeSparkles = 0;
  const maxSparkles = 60;

  function createSparkle() {
    if (activeSparkles >= maxSparkles) return;
    const sparkle = document.createElement("div");
    sparkle.style.position = "absolute";
    sparkle.style.width = "3px";
    sparkle.style.height = "3px";
    sparkle.style.borderRadius = "50%";
    sparkle.style.background = "rgba(255,215,0,0.8)"; // gold vintage
    sparkle.style.top = Math.random() * window.innerHeight + "px";
    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.opacity = 0;
    sparkle.style.boxShadow = "0 0 8px rgba(255,215,0,0.9)";
    sparkleContainer.appendChild(sparkle);
    activeSparkles++;

    let duration = 2000 + Math.random() * 2000;
    sparkle.animate(
      [
        { opacity: 0, transform: "scale(0.5)" },
        { opacity: 1, transform: "scale(1.3)" },
        { opacity: 0, transform: "scale(0.5)" }
      ],
      { duration: duration, easing: "ease-in-out" }
    ).onfinish = () => {
      sparkle.remove();
      activeSparkles--;
    };
  }

  function startSparkles() {
    if (!sparkleInterval) sparkleInterval = setInterval(createSparkle, 500);
  }

  function stopSparkles() {
    clearInterval(sparkleInterval);
    sparkleInterval = null;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSparkles();
    else startSparkles();
  });

  window.addEventListener("resize", () => {
    sparkleContainer.style.width = window.innerWidth + "px";
    sparkleContainer.style.height = window.innerHeight + "px";
  });

  startSparkles();
});
```
