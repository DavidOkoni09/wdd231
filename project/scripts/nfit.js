import { initCommonUI } from '../scripts/general.mjs';
import { getActiveInternships, displayJobs } from '../scripts/jobs.mjs';


//const API_KEY = 'bd500a1099mshbe315bea5b1fe3fp12b8c1jsn0702b8525bf0';

// Initialize UI (Hamburger, Year, etc)
initCommonUI();

// Initialize Modal Close Listeners
const modal = document.querySelector('#place-details');
const closeBtn = document.querySelector('#close-dialog');
if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
}

async function init() {
    try {
        const jobs = await getActiveInternships(API_KEY);
        // This API returns the array directly, so no need for jobs.data
        if (jobs && Array.isArray(jobs)) {
            displayJobs(jobs);
        } else {
            throw new Error("Invalid data format received.");
        }
    } catch (err) {
        console.error("Init Error:", err.message);
        const container = document.querySelector('#job-cards');
        if (container) {
            container.innerHTML = `<p class="error">Failed to load internships: ${err.message}</p>`;
        }
    }
}

init();

