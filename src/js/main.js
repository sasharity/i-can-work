import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();


// DOMContentLoaded ensures DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;


    // INDEX.HTML: Featured Jobs

    if (path.endsWith("index.html") || path === "/") {
        loadFeaturedJobs();
    }


    // USERS-DIRECTORY.HTML: Workers & Employers
    if (path.endsWith("users-directory.html")) {
        loadUsersDirectory();
        setupTabs();
    }
});

// FUNCTION: Load Featured Jobs (index.html)
async function loadFeaturedJobs() {
    const featuredContainer = document.getElementById("featured-jobs");
    const skeletons = document.getElementById("featured-skeletons");

    if (!featuredContainer || !skeletons) return;

    skeletons.style.display = "grid";

    try {
        const response = await fetch("https://api.example.com/jobs"); // Replace with your API
        const jobs = await response.json();

        featuredContainer.innerHTML = jobs
            .map(
                job => `
      <div class="card">
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary || "Not specified"}</p>
      </div>
      `
            )
            .join("");
    } catch (err) {
        console.error("Error loading jobs:", err);
        featuredContainer.innerHTML = "<p>Unable to load jobs at this time.</p>";
    } finally {
        skeletons.style.display = "none";
    }
}

// FUNCTION: Load Users Directory
async function loadUsersDirectory() {
    const workersContainer = document.getElementById("workers-list");
    const employersContainer = document.getElementById("employers-list");
    const workersSkeleton = document.getElementById("workers-skeleton");
    const employersSkeleton = document.getElementById("employers-skeleton");

    if (!workersContainer || !employersContainer) return;

    // Show skeletons
    workersSkeleton.style.display = "grid";
    employersSkeleton.style.display = "grid";

    // --- Static Employers ---
    const employers = [
        { company: "Bright Future Ltd", industry: "Construction", location: "Lagos" },
        { company: "Mama's Kitchen", industry: "Food & Catering", location: "Port Harcourt" },
        { company: "TechNova Solutions", industry: "IT Services", location: "Abuja" },
    ];

    employersContainer.innerHTML = employers
        .map(emp => `
      <div class="user-card">
        <h3>${emp.company}</h3>
        <p><strong>Industry:</strong> ${emp.industry}</p>
        <p><strong>Location:</strong> ${emp.location}</p>
      </div>
    `)
        .join("");

    // Hide employers skeleton
    employersSkeleton.style.display = "none";

    // --- Dynamic Workers from Random User API ---
    try {
        const response = await fetch("https://randomuser.me/api/?results=8&nat=ng");
        const data = await response.json();
        const users = data.results;

        const workers = users.map(user => ({
            fullName: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.medium,
            role: "Worker",
            skills: ["Plumbing", "Electrician", "Tailoring", "Carpentry"][Math.floor(Math.random() * 4)],
            email: user.email,
            location: `${user.location.city}, ${user.location.state}`,
        }));

        workersContainer.innerHTML = workers
            .map(
                worker => `
        <div class="user-card">
          <img src="${worker.avatar}" alt="${worker.fullName} photo" />
          <h3>${worker.fullName}</h3>
          <p><strong>Role:</strong> ${worker.role}</p>
          <p><strong>Skill:</strong> ${worker.skills}</p>
          <p><strong>Location:</strong> ${worker.location}</p>
          <p><strong>Email:</strong> ${worker.email}</p>
        </div>
      `
            )
            .join("");
    } catch (err) {
        console.error("Error loading workers:", err);
        workersContainer.innerHTML = "<p>Unable to load workers at this time.</p>";
    } finally {
        workersSkeleton.style.display = "none";
    }
}

// FUNCTION: Setup Tabs for Users Directory
function setupTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });
}