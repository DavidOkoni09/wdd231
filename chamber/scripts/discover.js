import { itemsOfInterest } from '../data/discover.mjs';

const grid = document.querySelector('#discover-grid');
const dialog = document.querySelector('#place-details');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDesc = document.querySelector('#dialog-description');
const closeBtn = document.querySelector('#close-dialog');

const visitorDisplay = document.querySelector(".visitor-message");
const msToDays = 86400000; 
const lastVisit = window.localStorage.getItem("lastVisit-ls");
const currentVisit = Date.now();

function setVisitorMessage() {
    if (!lastVisit) {
        visitorDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysPassed = Math.floor((currentVisit - lastVisit) / msToDays);

        if (daysPassed < 1) {
            visitorDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysPassed === 1 ? "day" : "days";
            visitorDisplay.textContent = `You last visited ${daysPassed} ${dayText} ago.`;
        }
    }
    window.localStorage.setItem("lastVisit-ls", currentVisit);
}

setVisitorMessage();

const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");

function displayCards(items) {
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <figure>
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <h2>${item.name}</h2>
            <address>${item.address}</address>
            <p class="description-preview">${item.description.substring(0, 50)}...</p>
            <button class="learn-more">Learn More</button>
        `;

        const btn = card.querySelector('.learn-more');
        btn.addEventListener('click', () => {
            dialogTitle.textContent = item.name;
            dialogDesc.textContent = item.description;
            dialog.showModal();
        });

        grid.appendChild(card);
    });
}

// Close events
closeBtn.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

displayCards(itemsOfInterest);

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("open");
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
