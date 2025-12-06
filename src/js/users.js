import { loadHeaderFooter } from "./utils.js";
loadHeaderFooter();

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
export async function loadFeaturedJobs() {
  try {
    const res = await fetch("/data/jobs.json");
    const jobs = await res.json();

    displayJobs(jobs);
  } catch (err) {
    console.error("Error loading jobs:", err);
  }

}
function displayJobs(jobs) {
  const container = document.getElementById("posted-jobs");
  if (!container) return;

  if (user.role !== "employer") {
    container.innerHTML = `<p class="text-muted">No posted jobs. Only employers can post jobs.</p>`;
    return;
  }

  container.innerHTML = jobs
    .map(job => `
      <div class="card">
        <h4>${job.title}</h4>
        <p>${job.company}</p>
        <p>${job.location}</p>
      </div>
    `)
    .join("");
}


// RANDOM USER API: users Container 
async function loadWorkerPreviews() {
  const previewContainer = document.getElementById("usersContainer");
  if (!previewContainer) return; // safety

  try {
    // Fetch 6 random users; results parameter allows multiple users. (See docs.) :contentReference[oaicite:0]{index=0}
    const response = await fetch("https://randomuser.me/api/?results=6");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    console.log(data)

    // Map into a simpler worker object
    const workers = data.results.map(user => ({
      fullName: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.medium || "", // fallback if missing
      skills: ["Plumbing", "Electrician", "Tailoring", "Carpentry", "Hair Styling"][Math.floor(Math.random() * 5)],
      email: user.email,
      location: `${user.location.city}, ${user.location.state || user.location.country}`,
    }));

    // Render worker cards
    previewContainer.innerHTML = workers
      .map(w => `
        <div class="user-card">
          <img src="${w.avatar}" alt="${w.fullName} photo">
          <h4>${w.fullName}</h4>
          <p><strong>Skill:</strong> ${w.skills}</p>
          <p><strong>Location:</strong> ${w.location}</p>
          <p><strong>Email:</strong> ${w.email}</p>
        </div>
      `)
      .join("");

  } catch (err) {
    console.error("Error loading users Container:", err);
    // Optional fallback message
    previewContainer.innerHTML = `<p class="text-muted">Unable to load users Container.</p>`;
  }
}

// Run it when the page loads
loadWorkerPreviews();
loadFeaturedJobs();

