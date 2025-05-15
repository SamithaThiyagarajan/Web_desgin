// sale.js - Smart Adaptive Layout Engine

function applyHighContrast() {
  if (localStorage.getItem("contrast") === "high") {
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
    document
      .querySelectorAll(
        "input, label, .login-container, button, footer a, .planet-card"
      )
      .forEach((el) => {
        el.style.background = "#fff";
        el.style.color = "#000";
        el.style.border = "1px solid #000";
      });
  }
}
function addContrastToggle() {
  const toggle = document.createElement("div");
  toggle.title = "Toggle Contrast";
  toggle.style.position = "fixed";
  toggle.style.bottom = "20px";
  toggle.style.left = "20px";
  toggle.style.zIndex = "1000";
  toggle.style.width = "48px";
  toggle.style.height = "48px";
  toggle.style.cursor = "pointer";
  toggle.style.background = "#000"; // Always black background circle
  toggle.style.borderRadius = "50%";
  toggle.style.border = "2px solid #fff";
  toggle.style.display = "flex";
  toggle.style.alignItems = "center";
  toggle.style.justifyContent = "center";

  // Create image element for bulb icon
  const icon = document.createElement("img");
  icon.src = "light-bulb-svgrepo-com.svg"; // Make sure this is a dark/black SVG with transparent background
  icon.alt = "Toggle Contrast";
  icon.style.width = "24px";
  icon.style.height = "24px";
  icon.style.transition = "filter 0.3s ease";
  icon.style.filter = "invert(1) brightness(2)"; // Always white

  toggle.appendChild(icon);

  toggle.onclick = () => {
    const newMode =
      localStorage.getItem("contrast") === "high" ? "normal" : "high";
    localStorage.setItem("contrast", newMode);

    location.reload(); // Apply contrast changes globally
  };

  document.body.appendChild(toggle);
}

function applyResponsiveLayout(gridSelector = ".planet-grid") {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;
  const width = window.innerWidth;
  if (width < 600) {
    grid.style.gridTemplateColumns = "1fr";
  } else {
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
  }
}
function addScrollToTopButton() {
  const button = document.createElement("div");

  // SVG arrow icon (white stroke)
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  `;

  // Compact and centered styling
  button.style.position = "fixed";
  button.style.bottom = "80px";
  button.style.right = "20px";
  button.style.width = "40px";
  button.style.height = "40px";
  button.style.display = "none";
  button.style.cursor = "pointer";
  button.style.background = "#000";
  button.style.border = "2px solid #fff";
  button.style.borderRadius = "50%";
  button.style.padding = "8px";
  button.style.zIndex = "1000";
  button.title = "Back to Top";

  // Center SVG inside the circle
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  // Smooth scroll to top
  button.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show only after scrolling
  window.addEventListener("scroll", () => {
    button.style.display = window.scrollY > 200 ? "flex" : "none";
  });

  document.body.appendChild(button);
}

function initSALE() {
  applyHighContrast();
  addContrastToggle();
  applyResponsiveLayout();
  addScrollToTopButton(); // ✅ Added here
}

window.addEventListener("DOMContentLoaded", initSALE);
window.addEventListener("resize", () => applyResponsiveLayout());
