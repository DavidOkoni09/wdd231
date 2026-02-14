// thankyou.js (Link this to thankyou.html)
const resultsContainer = document.querySelector('#form-results');
const urlParams = new URLSearchParams(window.location.search);

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

if (urlParams.has('company')) {
    resultsContainer.innerHTML = `
        <p><strong>Company:</strong> ${urlParams.get('company')}</p>
        <p><strong>Role:</strong> ${urlParams.get('role')}</p>
        <p><strong>Date:</strong> ${urlParams.get('date')}</p>
        <p><strong>Status:</strong> ${urlParams.get('status')}</p>
    `;
}