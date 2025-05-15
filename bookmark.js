// Load saved bookmarks from localStorage
function loadBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks") || "[]");
}

// Save bookmarks to localStorage
function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Create a visual list of bookmarks
function renderBookmarks() {
  const container = document.getElementById("bookmark-list");
  container.innerHTML = ""; // Clear previous

  const bookmarks = loadBookmarks();
  if (bookmarks.length === 0) {
    container.innerHTML = "<p style='color:white'>No bookmarks yet.</p>";
    return;
  }

  bookmarks.forEach((bm, index) => {
    const item = document.createElement("div");
    item.className = "bookmark-item";
    item.textContent = bm.label || `Bookmark ${index + 1}`;
    item.onclick = () => {
      window.location.href = `${bm.page}#bm_${bm.id}`;
    };
    container.appendChild(item);
  });
}

// Create a visible marker in DOM for scrolling
function createBookmarkAnchor(id) {
  const anchor = document.createElement("div");
  anchor.id = `bm_${id}`;
  anchor.style.position = "absolute";
  anchor.style.top = `${window.scrollY}px`;
  anchor.style.height = "1px";
  document.body.appendChild(anchor);
}

// Right-click to add bookmark
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const label = prompt("Enter a name for this bookmark:");
  if (!label) return;

  const bookmarks = loadBookmarks();
  const id = Date.now();
  const page = location.pathname.split("/").pop() || "index.html";

  bookmarks.push({ id, page, scrollY: window.scrollY, label });
  saveBookmarks(bookmarks);

  createBookmarkAnchor(id);
  renderBookmarks();
});

// UI for bookmark box and toggle button
function createBookmarkUI() {
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
    #bookmark-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      background: black;
      color: white;
      border: 2px solid white;
      font-family: 'Orbitron', sans-serif;
      padding: 10px 16px;
      cursor: pointer;
      z-index: 9999;
      border-radius: 8px;
      transition: background 0.3s;
    }
    #bookmark-toggle:hover {
      background: #333;
    }
    #bookmark-panel {
      position: fixed;
      top: 70px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid white;
      padding: 16px;
      max-height: 300px;
      overflow-y: auto;
      font-family: 'Orbitron', sans-serif;
      color: white;
      border-radius: 10px;
      z-index: 9998;
      display: none;
      transition: opacity 0.4s ease;
    }
    .bookmark-item {
      padding: 8px;
      margin-bottom: 6px;
      cursor: pointer;
      background: #111;
      border: 1px solid #555;
      border-radius: 6px;
    }
    .bookmark-item:hover {
      background: #333;
    }
  `;
  document.head.appendChild(style);

  const toggleBtn = document.createElement("div");
  toggleBtn.id = "bookmark-toggle";
  toggleBtn.textContent = "My Bookmarks";

  const panel = document.createElement("div");
  panel.id = "bookmark-panel";
  panel.innerHTML = `<div id="bookmark-list"></div>`;

  toggleBtn.onclick = () => {
    panel.style.display =
      panel.style.display === "none" || panel.style.display === ""
        ? "block"
        : "none";
  };

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);
  renderBookmarks();
}

// Scroll to bookmarked position if URL hash is present
function scrollToBookmarkIfPresent() {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#bm_")) {
    const el = document.querySelector(hash);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  }
}

// Initialize everything on load
window.addEventListener("DOMContentLoaded", () => {
  createBookmarkUI();
  scrollToBookmarkIfPresent();
});
