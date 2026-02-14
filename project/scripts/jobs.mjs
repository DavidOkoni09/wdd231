// --- Data Fetching ---
export async function getTechJobs() {
    // Optimized for Nigeria and Frontend roles
    const url = 'https://jsearch.p.rapidapi.com/search?query=frontend%20developer%20internship%20in%20nigeria&page=1&num_pages=3&country=ng&date_posted=all';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '104f174575msh927c0d14843fb64p17a1f1jsn079a0e3c3779',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();
        return responseData.data; // JSearch nests results in 'data'
    } catch (error) {
        console.error('JSearch Fetch Error:', error);
        throw error;
    }
}

// Display Cards 
export function displayJobs(jobs) {
    const container = document.querySelector('#job-cards');
    container.innerHTML = "";

    // Requirement: Display at least 15 items (JSearch usually returns 10 per page, 
    // you might need to increase num_pages to 2 in the URL for exactly 15+)
    jobs.forEach(job => {
        const card = document.createElement('section');
        card.className = 'job-card';

        const logo = job.employer_logo ? job.employer_logo : 'images/logo-placeholder.webp';

        card.innerHTML = `
            <img src="${logo}" alt="${job.employer_name} logo" class="job-logo" loading="lazy">
            <div class="job-info">
                <h3>${job.job_title}</h3>
                <p class="company-name">${job.employer_name}</p>
                <div class="job-meta">
                    <span>📍 ${job.job_city || 'Remote'}, ${job.job_state || 'Nigeria'}</span>
                </div>
                <div class="card-btns">
                    <button class="details-btn">Details</button>
                </div>
            </div>
        `;

        // Event Listener for Saving
        card.querySelector('.details-btn').addEventListener('click', () => {
            showJobModal(job);
        });

        container.appendChild(card);
    });
}

// Modal Logic
function showJobModal(job) {
    const dialog = document.querySelector('#place-details');
    const title = document.querySelector('#dialog-title');
    const desc = document.querySelector('#dialog-description');

    if (!dialog) return;

    // JSearch uses job_title
    title.textContent = job.job_title;

    // JSearch uses job_description
    const jobDesc = job.job_description
        ? job.job_description.replace(/\n/g, '<br>')
        : "No description provided.";

    desc.innerHTML = `
        <div class="modal-header">
            <p><strong>Company:</strong> ${job.employer_name}</p>
            <p><strong>Type:</strong> ${job.job_employment_type || 'N/A'}</p>
            <p><strong>Location:</strong> ${job.job_city ? job.job_city + ', ' + job.job_country : 'Remote'}</p>
        </div>
        <hr>
        <div class="job-description-content" style="max-height: 300px; overflow-y: auto; margin: 1rem 0;">
            ${jobDesc}
        </div>
        <div class="modal-actions">
            <a href="${job.job_apply_link}" target="_blank" class="apply-btn">Apply Now</a>
            <button id="save-to-tracker" class="save-btn">Save to Tracker</button>
        </div>
    `;

    dialog.showModal();

    const saveBtn = document.querySelector('#save-to-tracker');
    saveBtn.onclick = () => {
        saveToTracker(job);
        // Optional: Close modal after saving
        // dialog.close(); 
    };
}

function saveToTracker(job) {
    let savedJobs = JSON.parse(localStorage.getItem('nfit-saved-jobs')) || [];

    // Check for duplicates using JSearch's unique job_id
    const isAlreadySaved = savedJobs.some(item => (item.id === job.job_id));

    if (!isAlreadySaved) {
        // We create a standard object that matches your tracker.html table
        const standardizedJob = {
            id: job.job_id,
            company: job.employer_name,
            role: job.job_title,
            // Format the date nicely
            date: job.job_posted_at_datetime_utc
                ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
                : "Recent",
            status: "Saved",
            link: job.job_apply_link
        };

        savedJobs.push(standardizedJob);
        localStorage.setItem('nfit-saved-jobs', JSON.stringify(savedJobs));
        alert(`${standardizedJob.role} has been saved!`);
    } else {
        alert("This job is already in your tracker.");
    }
}


