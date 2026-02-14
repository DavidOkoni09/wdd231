const yearEl = document.getElementById("currentyear");
const modEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");

if (hamburger && navigation) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navigation.classList.toggle("open");
    });
}