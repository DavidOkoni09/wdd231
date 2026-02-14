import { initCommonUI } from '../scripts/general.mjs';
import { getTechJobs, displayJobs } from '../scripts/jobs.mjs';

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
    const container = document.querySelector('#job-cards');

    try {
        const jobs = await getTechJobs();
        displayJobs(jobs);
    } catch (err) {
        if (container) {
            container.innerHTML = `<p class="error">Unable to load jobs. Check your API key or connection.</p>`;
        }
    }
}

init();