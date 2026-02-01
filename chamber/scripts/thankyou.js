document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("open");
});

const urlParams = new URLSearchParams(window.location.search);
const resultsContainer = document.querySelector('#results');

function displayResults() {
    const fields = [
        { label: 'First Name', key: 'fname' },
        { label: 'Last Name', key: 'lname' },
        { label: 'Email Address', key: 'email' },
        { label: 'Mobile Number', key: 'phone' },
        { label: 'Business Name', key: 'organization' },
        { label: 'Submission Date', key: 'timestamp' }
    ];

    let resultsHTML = '';

    fields.forEach(field => {
        const value = urlParams.get(field.key);
        if (value) {
            resultsHTML += `
                <div class="result-item">
                    <strong>${field.label}:</strong> <span>${decodeURIComponent(value).replace(/\+/g, ' ')}</span>
                </div>
            `;
        }
    });

    resultsContainer.innerHTML = resultsHTML || '<p>No data submitted.</p>';
}

displayResults();