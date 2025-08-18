**script.js**
```javascript
// ===== TEMA (DARK/LIGHT) =====
const toggleThemeBtn = document.getElementById("toggleTheme");
const rootElement = document.documentElement;
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");

// Cek tema tersimpan di localStorage
if (localStorage.getItem("theme")) {
  rootElement.setAttribute("data-theme", localStorage.getItem("theme"));
  updateIcons(localStorage.getItem("theme"));
}

// Tombol toggle tema
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    let currentTheme = rootElement.getAttribute("data-theme");
    let newTheme = currentTheme === "dark" ? "light" : "dark";
    rootElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcons(newTheme);
  });
}

function updateIcons(theme) {
  if (theme === "dark") {
    iconSun.style.display = "none";
    iconMoon.style.display = "block";
  } else {
    iconSun.style.display = "block";
    iconMoon.style.display = "none";
  }
}

// ===== SEARCH ARTIKEL =====
const searchInput = document.getElementById("search");
const articles = document.querySelectorAll(".card");

if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value.toLowerCase();
    articles.forEach((article) => {
      let title = article.querySelector("h3").textContent.toLowerCase();
      article.style.display = title.includes(value) ? "block" : "none";
    });
  });
}

// ===== ANIMASI SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  let windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    let elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== FORMULIR TULIS ARTIKEL =====
const form = document.getElementById("formArtikel");
const previewContainer = document.getElementById("preview");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const judul = form.querySelector("#judul").value;
    const isi = form.querySelector("#isi").value;

    if (judul && isi) {
      let card = document.createElement("div");
      card.classList.add("card", "reveal");
      card.innerHTML = `<h3>${judul}</h3><p>${isi}</p>`;
      previewContainer.prepend(card);
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
sparkleContainer.style.zIndex = "0";
document.body.appendChild(sparkleContainer);

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.position = "absolute";
  sparkle.style.width = "3px";
  sparkle.style.height = "3px";
  sparkle.style.borderRadius = "50%";
  sparkle.style.background = "rgba(255,255,255,0.8)";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.opacity = 0;
  sparkle.style.boxShadow = "0 0 6px rgba(255,255,255,0.8)";
  sparkleContainer.appendChild(sparkle);

  // animasi fade in/out
  let duration = 2000 + Math.random() * 2000;
  sparkle.animate(
    [
      { opacity: 0, transform: "scale(0.5)" },
      { opacity: 1, transform: "scale(1.2)" },
      { opacity: 0, transform: "scale(0.5)" }
    ],
    {
      duration: duration,
      easing: "ease-in-out"
    }
  ).onfinish = () => sparkle.remove();
}

setInterval(createSparkle, 500);
```
