const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Subtle pointer parallax on the hero illustration, disabled for touch devices.
const heroArt = document.querySelector(".hero-art");
if (heroArt && window.matchMedia("(pointer:fine)").matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.setProperty("--pointer-x", `${x * 8}px`);
    heroArt.style.setProperty("--pointer-y", `${y * 8}px`);
    const avatar = heroArt.querySelector(".avatar");
    if (avatar) avatar.style.marginLeft = `${x * 10}px`;
  });
  heroArt.addEventListener("pointerleave", () => {
    const avatar = heroArt.querySelector(".avatar");
    if (avatar) avatar.style.marginLeft = "0";
  });
}
