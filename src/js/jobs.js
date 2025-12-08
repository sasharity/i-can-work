// IMPORT HEADER + FOOTER
import { loadHeaderFooter } from "./utils.js";
import { launchConfetti } from "./main.js";

loadHeaderFooter();
// launchConfetti();



// GLOBAL ARRAY THAT HOLDS ALL JOBS
let allJobs = [];
// How many jobs per page
let jobsPerPage = 10; 
// The current page of jobs being displayed
let currentPage = 1;


// DOM ELEMENTS
let jobListings;
let skeletons;
let loadMoreBtn;

document.addEventListener("DOMContentLoaded", async () => {
    // DOM elements now exist
    jobListings = document.getElementById("job-listings");
    skeletons = document.getElementById("job-skeletons");
    loadMoreBtn = document.getElementById("loadMoreBtn");

    await loadJobsFromJSON();
    loadPostedJobs();
    renderJobs(allJobs);

if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            currentPage++;          // go to the next set of jobs
            renderJobs(allJobs);    // re-render with more jobs
        });
    }
});

// LOAD STATIC JOBS FROM jobs.json
async function loadJobsFromJSON() {
    try {
        const response = await fetch("/public/data/jobs.json");
        const jsonJobs = await response.json();
        allJobs = [...allJobs, ...jsonJobs];
    } catch (error) {
        console.error("Error loading jobs.json", error);
    }
}

// LOAD USER-POSTED JOBS FROM LOCAL STORAGE
function loadPostedJobs() {
    const savedJobs = JSON.parse(localStorage.getItem("postedJobs")) || [];
    allJobs = [...allJobs, ...savedJobs];
}



// RENDER JOB CARDS
function renderJobs(jobsArray) {
    jobListings.innerHTML = "";
    
        const start = 0;
        const end = currentPage * jobsPerPage;
        const jobsToShow = jobsArray.slice(start, end);

        jobsToShow.forEach(job => { 
            const card = document.createElement("div");
            card.classList.add("card", "fade-in");
            card.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company} — ${job.location}</p>
                <p><strong>${job.salary}</strong></p>
                <button class="apply-btn" data-title="${job.title}">Apply Now</button>

                <button class="save-btn"
                data-title="${job.title}"
                data-company="${job.company}"
                data-location="${job.location}"
                data-salary="${job.salary}">
                Save Job
                </button>
</div>
            `;
            jobListings.appendChild(card);
         });

    skeletons.style.display = "none";

    // Incase there are no more jobs to show, this will hide the view more button for the user
    if (jobsArray.length <= currentPage * jobsPerPage) {
        // this will ensure no job loads
        loadMoreBtn.style.display = "none"; 
    }
    else {
        // this will show the view more button
        loadMoreBtn.style.display = "block";
    }
}


// Save job to local storage and avoid duplicates
function saveJob(job) {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    // simple duplicate check (by title+company+location)
    const exists = savedJobs.some(s => s.title === job.title && s.company === job.company && s.location === job.location);
    if (!exists) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        // Optionally notify user
        alert("Job saved!");
    } else {
        alert("This job is already saved.");
    }
}

// SEARCH FILTER
window.filterJobs = function () {
    const query = document.getElementById("jobSearch").value.toLowerCase();

    const filtered = allJobs.filter(job =>
        job.title.toLowerCase().includes(query)
    );

    currentPage = 1;   //this will reset to first page
    renderJobs(filtered);
};

// EVENT DELEGATION FOR APPLY BUTTONS
document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;

    // Save job button
    if (target.classList.contains("save-btn")) {
        const job = {
            title: target.dataset.title || "",
            company: target.dataset.company || "",
            location: target.dataset.location || "",
            salary: target.dataset.salary || ""
        };
        saveJob(job);
        return;
    }

    // Apply button
    if (target.classList.contains("apply-btn")) {
        const title = target.dataset.title || "this job";
        // trigger confetti (if available) and show alert
        try { launchConfetti(50); } catch (err) { }
        alert(`You applied for: ${title}`);
        return;
    }

});



