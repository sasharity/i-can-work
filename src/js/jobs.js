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
const jobListings = document.getElementById("job-listings");
const skeletons = document.getElementById("job-skeletons");
const loadMoreBtn = document.getElementById("loadMoreBtn");


// WAIT FOR PAGE LOAD
document.addEventListener("DOMContentLoaded", async () => {
    await loadJobsFromJSON();
    loadPostedJobs();
    renderJobs(allJobs);
});

// LOAD STATIC JOBS FROM jobs.json
async function loadJobsFromJSON() {
    try {
        const response = await fetch("/data/jobs.json");
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
                <button class="btn" onclick="applyJob('${job.title}')">Apply Now</button>
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

// The load-more handler
loadMoreBtn.addEventListener("click", () => {
    currentPage++;          // go to the next set of jobs
    renderJobs(allJobs);    // re-render with more jobs
});


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
jobListings.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn")) {
        const jobTitle = e.target.dataset.title;
        launchConfetti(100); // Confetti animation
    }
    window.applyJob = function (title) {
        alert(`You applied for: ${title}`);
    };

});






