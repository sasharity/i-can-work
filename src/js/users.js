// Get stored user OR create a demo user if none exists yet
let user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest User",
    role: "worker", // or "employer"
    isLoggedIn: true
};

// Save demo user if not present
localStorage.setItem("user", JSON.stringify(user));

// Render user info
const userCard = document.getElementById("user-info");
userCard.innerHTML = `
  <div class="card">
    <h3>${user.username}</h3>
    <p><strong>Role:</strong> ${user.role}</p>
    <p><strong>Status:</strong> ${user.isLoggedIn ? "Logged In" : "Logged Out"}</p>
    <button id="logoutBtn" class="btn">Log Out</button>
  </div>
`;

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
    user.isLoggedIn = false;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
});

// Load saved jobs (for workers)
const savedJobsContainer = document.getElementById("saved-jobs");
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

if (savedJobs.length === 0) {
    savedJobsContainer.innerHTML = `<p class="text-muted">No saved jobs yet.</p>`;
} else {
    savedJobsContainer.innerHTML = savedJobs
        .map(job => `
      <div class="card">
        <h4>${job.title}</h4>
        <p>${job.company}</p>
        <p>${job.location}</p>
      </div>
    `)
        .join("");
}

// Load posted jobs (for employers)
const postedJobsContainer = document.getElementById("posted-jobs");
let postedJobs = JSON.parse(localStorage.getItem("jobs")) || [];

if (postedJobs.length === 0) {
    postedJobsContainer.innerHTML = `<p class="text-muted">No posted jobs yet.</p>`;
} else {
    postedJobsContainer.innerHTML = postedJobs
        .map(job => `
      <div class="card">
        <h4>${job.title}</h4>
        <p>${job.company}</p>
        <p>${job.location}</p>
        <p>${job.salary}</p>
      </div>
    `)
        .join("");
}
