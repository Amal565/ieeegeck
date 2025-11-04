document.addEventListener("DOMContentLoaded", () => {
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loadPage("execom.html");
    });
  }

  // Smooth scrolling for navbar links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

// Function to dynamically load a page into #content
function loadPage(page) {
  const content = document.getElementById("content");

  content.style.transition = "opacity 0.3s ease";
  content.style.opacity = 0;

  fetch(page)
    .then(res => res.text())
    .then(data => {
      setTimeout(() => {
        content.innerHTML = data;
        content.style.opacity = 1;
        attachBackButton();
        window.scrollTo(0, 0);
      }, 300);
    })
    .catch(err => console.error("Error loading page:", err));
}

// Back to home button handler
function attachBackButton() {
  const backBtn = document.getElementById("backToHome");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload(); // clean way to go back to index main
    });
  }
}
