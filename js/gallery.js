document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initGalleryTabs();
});

// Scroll animation for sequential year blocks (used on gallery.html)
function initScrollAnimations() {
  const yearSections = document.querySelectorAll(".year-section");
  if (!yearSections.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // Animates once smoothly
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  yearSections.forEach((section) => observer.observe(section));
}

// Year tab switching fallback (if used on index.html)
function initGalleryTabs() {
  const tabs = document.querySelectorAll(".gallery-tab-btn");
  const sections = document.querySelectorAll(".gallery .year-section[id]");

  if (!tabs.length || !sections.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const year = tab.getAttribute("data-year");

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      sections.forEach((sec) => {
        if (sec.id === `gallery-${year}`) {
          sec.style.display = "block";
          sec.classList.add("visible");
        } else {
          sec.style.display = "none";
        }
      });
    });
  });
}