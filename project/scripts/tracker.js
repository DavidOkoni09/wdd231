// Import modules if you are using them, or keep it as a standalone script
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Footer Data
    const yearEl = document.getElementById("currentyear");
    const modEl = document.getElementById("lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

    // 2. Hamburger Menu Logic
    const hamburger = document.getElementById("hamburger");
    const navigation = document.getElementById("navigation");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamburger.classList.toggle("active");
        });
    }

    // 3. Load Tracker Data from LocalStorage
    displayTracker();

    // 4. Handle Manual Form Submission
    const addJobForm = document.getElementById("add-job-form");
    if (addJobForm) {
        addJobForm.addEventListener("submit", (e) => {
            // We let the form submit to thankyou.html (as required),
            // but we save the data to localStorage first.
            const newJob = {
                company: document.getElementById("company").value,
                role: document.getElementById("role").value,
                date: document.getElementById("date").value,
                status: document.getElementById("status").value,
                id: Date.now() // Unique ID for deletion
            };

            saveJobToLocalStorage(newJob);
        });
    }
});

function saveJobToLocalStorage(job) {
    let savedJobs = JSON.parse(localStorage.getItem('nfit-saved-jobs')) || [];
    savedJobs.push(job);
    localStorage.setItem('nfit-saved-jobs', JSON.stringify(savedJobs));
}

function displayTracker() {
    const trackerBody = document.getElementById("tracker-body");
    const totalCount = document.getElementById("total-count");
    const savedJobs = JSON.parse(localStorage.getItem('nfit-saved-jobs')) || [];

    if (!trackerBody) return;

    totalCount.textContent = savedJobs.length;
    trackerBody.innerHTML = "";

    if (savedJobs.length === 0) {
        trackerBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem;">Your tracker is empty. Save a job from the Home page or add one manually below!</td></tr>';
        return;
    }

    savedJobs.forEach((job, index) => {
        const row = document.createElement("tr");

        // Supporting both API keys (employer_name) and Manual keys (company)
        row.innerHTML = `
            <td>${job.employer_name || job.company}</td>
            <td>${job.job_title || job.role}</td>
            <td>${job.job_posted_at || job.date || 'N/A'}</td>
            <td><span class="status-badge ${job.status?.toLowerCase()}">${job.status || 'Saved'}</span></td>
            <td><button class="delete-btn" data-id="${job.id || index}">🗑️</button></td>
        `;

        trackerBody.appendChild(row);
    });

    // Add Delete Functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idToDelete = e.target.getAttribute('data-id');
            deleteJob(idToDelete);
        });
    });
}

function deleteJob(id) {
    let savedJobs = JSON.parse(localStorage.getItem('nfit-saved-jobs')) || [];
    // Filter out the job with the matching ID
    savedJobs = savedJobs.filter(job => (job.id || savedJobs.indexOf(job)).toString() !== id.toString());
    localStorage.setItem('nfit-saved-jobs', JSON.stringify(savedJobs));
    displayTracker();
}

document.addEventListener("DOMContentLoaded", () => {
    const openFormBtn = document.getElementById("open-form-btn");
    const formContainer = document.querySelector(".form-container");

    if (openFormBtn && formContainer) {
        openFormBtn.addEventListener("click", () => {
            // Toggle the 'show' class
            formContainer.classList.toggle("show");

            // Optional: Change button text based on state
            if (formContainer.classList.contains("show")) {
                openFormBtn.textContent = "× Close Form";
                openFormBtn.style.backgroundColor = "#ff4444"; // Visual cue to close

                // Accessibility: Scroll the form into view
                formContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                openFormBtn.textContent = "+ Add Manual Entry";
                openFormBtn.style.backgroundColor = ""; // Reset to CSS default
            }
        });
    }
});