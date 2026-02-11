// --- Data Fetching ---
export async function getActiveInternships(apiKey) {
    const url = 'https://internships-api.p.rapidapi.com/active-jb-7d?location_filter=Nigeria';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'internships-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();

        // This API typically returns the array directly.
        // We'll log it to be sure, then return it.
        console.log("Internships-API Raw Data:", responseData);
        return responseData;
    } catch (error) {
        console.error('Error fetching internships:', error);
        throw error;
    }
}

// --- Display Cards ---
export function displayJobs(jobsArray) {
    const container = document.querySelector('#job-cards');
    if (!container) return;

    container.innerHTML = "";
    const displayList = jobsArray.slice(0, 15);

    displayList.forEach(job => {
        const card = document.createElement('section');
        card.className = 'job-card';

        // NEW KEYS: organization_logo, title, organization, locations_derived
        const logoUrl = job.organization_logo ? job.organization_logo : 'images/logo-placeholder.webp';

        // Handling location (API returns an array of objects)
        const location = job.locations_derived && job.locations_derived.length > 0
            ? `${job.locations_derived[0]}`
            : 'Remote / Nigeria';

        card.innerHTML = `
            <img src="${logoUrl}" alt="${job.organization} logo" class="job-logo" loading="lazy">
            <div class="job-info">
                <h3>${job.title}</h3> <p class="company-name">${job.organization}</p> <div class="job-meta">
                    <span>📍 ${location}</span> <span>⏳ ${new Date(job.date_posted).toLocaleDateString()}</span> </div>
                <button class="details-btn">View Details</button>
            </div>
        `;

        card.querySelector('.details-btn').addEventListener('click', () => showJobModal(job));
        container.appendChild(card);
    });
}

// --- Modal Logic ---
function showJobModal(job) {
    const dialog = document.querySelector('#place-details');
    const title = document.querySelector('#dialog-title');
    const desc = document.querySelector('#dialog-description');

    if (!dialog) return;

    title.textContent = job.title;

    // Formatting descriptions (this API uses description_text)
    const jobDesc = job.linkedin_org_description ? job.linkedin_org_description.replace(/\n/g, '<br>') : "No description provided.";

    desc.innerHTML = `
        <div class="modal-header">
            <p><strong>Company:</strong> ${job.organization}</p>
            <p><strong>Type:</strong> ${job.employment_type ? job.employment_type.join(", ") : 'Internship'}</p>
        </div>
        <hr>
        <div class="job-description-content">
            ${jobDesc}
        </div>
        <div class="modal-actions">
            <a href="${job.url}" target="_blank" class="apply-btn">Apply Now</a>
            <button id="save-to-tracker" class="save-btn">Save to Tracker</button>
        </div>
    `;

    dialog.showModal();
    document.querySelector('#save-to-tracker').addEventListener('click', () => saveJob(job));
}

// --- Local Storage Logic (Uses 'id' or 'url' as unique key) ---
function saveJob(job) {
    let savedJobs = JSON.parse(localStorage.getItem('nfit-saved-jobs')) || [];
    const isAlreadySaved = savedJobs.some(item => item.id === job.id);

    if (!isAlreadySaved) {
        savedJobs.push(job);
        localStorage.setItem('nfit-saved-jobs', JSON.stringify(savedJobs));
        alert(`${job.title} saved to tracker!`);
    } else {
        alert("Already saved.");
    }
}




