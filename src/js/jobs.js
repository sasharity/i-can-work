import { loadHeaderFooter } from "./utils.js";
loadHeaderFooter();

// Sample static jobs data
const jobs = [
    { title: "Plumber", company: "PipeWorks Ltd.", location: "Lagos", salary: "₦40,000 - ₦60,000" },
    { title: "Electrician", company: "Bright Sparks", location: "Abuja", salary: "₦50,000 - ₦70,000" },
    { title: "Tailor", company: "Fashion House", location: "Port Harcourt", salary: "₦30,000 - ₦50,000" },
    { title: "Web Developer", company: "TechSolutions", location: "Lagos", salary: "₦80,000 - ₦120,000" }
];

// DOM elements
const jobListings = document.getElementById("job-listings");
const skeletons = document.getElementById("job-skeletons");

// Render jobs function
function renderJobs(jobsArray) {
    jobListings.innerHTML = "";
    jobsArray.forEach(job => {
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
    skeletons.style.display = "none"; // hide skeletons
}

// Search filter function
window.filterJobs = function () {
    const query = document.getElementById("jobSearch").value.toLowerCase();
    const filtered = jobs.filter(job => job.title.toLowerCase().includes(query));
    renderJobs(filtered);
};

// Placeholder apply function
window.applyJob = function (title) {
    alert(`You applied for: ${title}`);
};

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderJobs(jobs);
});

// To render a single job card template
function createJobCard(job) {
    return `
    <div class="card job-card">
    `
}
