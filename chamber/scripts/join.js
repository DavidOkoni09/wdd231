document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Select all "Learn More" buttons
    const openButtons = document.querySelectorAll(".open-modal");

    // 2. Loop through buttons to add click listeners
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the ID of the dialog from the data-target attribute
            const modalId = button.getAttribute("data-target");
            const modal = document.querySelector(modalId);

            if (modal) {
                modal.showModal();
            }
        });
    });

    // 3. Select all "Close" buttons inside dialogs
    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Find the parent dialog and close it
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Bonus: Close modal when clicking outside of it (on the backdrop)
    const allModals = document.querySelectorAll("dialog");
    allModals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        // Formats date as: YYYY-MM-DD HH:MM:SS
        const now = new Date();
        timestampField.value = now.toISOString().slice(0, 19).replace('T', ' ');
    }
});