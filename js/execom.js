// 1. Disable browser's automatic scroll restoration on reload/navigation
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  // 2. Handle scroll position on arrival/reload
  if (window.location.hash && window.location.hash !== "#home") {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  } else {
    // If returning to Home or no hash present, ensure we start at the very top
    window.scrollTo(0, 0);
  }

  initExecomDropdown();
  initNavigation();
  attachBackButton();
});

// Handles switching between Execom years
function initExecomDropdown() {
  const dropdown = document.getElementById("execomDropdown");
  if (!dropdown) return;

  dropdown.addEventListener("change", (e) => {
    const selectedYearId = e.target.value;
    const yearBlocks = document.querySelectorAll(".execom-year-block");

    yearBlocks.forEach((block) => {
      if (block.id === selectedYearId) {
        block.style.display = "block";
      } else {
        block.style.display = "none";
      }
    });

    // Force Slick Carousel to recalculate dimensions for visible slides
    if (window.jQuery && jQuery.fn.slick) {
      jQuery(".slider-container:visible").slick("setPosition");
    }
    window.dispatchEvent(new Event("resize"));
  });
}

// Navigation & Single Page Loading handlers
function initNavigation() {
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loadPage("execom.html");
    });
  }

  document.querySelectorAll(".nav-link, .navbar-brand").forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      if (target && target.startsWith("#")) {
        e.preventDefault();
        const isHomePage = document.getElementById("home") !== null;
        const section = document.querySelector(target);

        if (isHomePage && section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          // Off homepage (in Execom view):
          // Pin scroll to 0 BEFORE reload so the browser doesn't cache the bottom position
          window.scrollTo(0, 0);
          window.location.href = "index.html" + (target === "#home" ? "" : target);
          window.location.reload();
        }
      }
    });
  });
}

// Dynamically loads pages into #content container
function loadPage(page) {
  const content = document.getElementById("content");
  if (!content) return;

  // Immediately force scroll to top before fetching
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  content.style.transition = "opacity 0.2s ease";
  content.style.opacity = 0;

  fetch(page)
    .then((res) => res.text())
    .then((html) => {
      setTimeout(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newMain = doc.querySelector("main") || doc.body;

        content.innerHTML = newMain ? newMain.innerHTML : html;
        content.style.opacity = 1;

        // Force scroll to top again after DOM render
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        attachBackButton();
        initExecomDropdown();

        if (window.jQuery && jQuery.fn.slick) {
          jQuery(".slider-container:visible").slick("setPosition");
        }
        window.dispatchEvent(new Event("resize"));
      }, 200);
    })
    .catch((err) => console.error("Error loading page:", err));
}

// Back to Home button handler
function attachBackButton() {
  const backButtons = document.querySelectorAll("#backToHome, .goback-btn");
  backButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
      window.location.href = "index.html";
      window.location.reload();
    });
  });
}