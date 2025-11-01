document.addEventListener("DOMContentLoaded", () => {
  const tagList = document.querySelector(".tag-list");
  const items = Array.from(tagList.children);

  // Clone all items to create a seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", true);
    tagList.appendChild(clone);
  });

  // Add scrolling animation
  tagList.classList.add("scrolling");

  // Adjust animation speed based on total width
  const duration = tagList.scrollWidth / 200; // adjust 50 for speed
  tagList.style.setProperty("--duration", `${duration}s`);
});