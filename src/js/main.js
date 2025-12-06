import { loadHeaderFooter } from "./utils.js";


loadHeaderFooter();


// DOMContentLoaded ensures DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;


    // INDEX.HTML: Featured Jobs

    if (path.endsWith("index.html") || path === "/") {
        loadFeaturedJobs();
        loadFeaturedWorkers();
    }


    // USERS-DIRECTORY.HTML: Workers & Employers
    if (path.endsWith("users_directory.html")) {
        loadUsersDirectory();
        setupTabs();
    }
});


// // Render a single job card template
// function createJobCard(job) {
//     return `
//     <div class="card job-card">
//       <h3>${job.title}</h3>
//       <p><strong>Company:</strong> ${job.company}</p>
//       <p><strong>Location:</strong> ${job.location}</p>
//       <p><strong>Salary:</strong> ${job.salary || 'Not specified'}</p>
//       <button class="btn save-job-btn" data-job-id="${job.id}">Save Job</button>
//     </div>
//   `;
// }
// ;

// --- Featured Jobs ---
async function loadFeaturedJobs() {
    const container = document.getElementById("featured-jobs");
    const skeletons = document.getElementById("featured-skeletons");
    if (!container || !skeletons) return;

    skeletons.style.display = "grid";

    try {
        
        const jobs = [
            {
                title: "Front-End Developer",
                company: "NovaTech Digital",
                location: "Lagos",
                salary: "₦900,000"
            },
            {
                title: "Registered Nurse",
                company: "St. Catherine Medical Center",
                location: "Abuja",
                salary: "₦650,000"
            },
            {
                title: "Project Manager",
                company: "BlueStone Consulting",
                location: "Port Harcourt",
                salary: "₦1,500,000"
            },
            {
                title: "Data Analyst",
                company: "Insight Analytics Ltd",
                location: "Lagos",
                salary: "₦700,000"
            },
            {
                title: "Backend Developer",
                company: "CloudHub Technologies",
                location: "Abuja",
                salary: "₦1,200,000"
            }
        ];


        container.innerHTML = jobs
            .map(job => `
            <div class="card job-card">
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            </div>
        `).join("");
    } catch (err) {
        console.error("Error loading jobs:", err);
        container.innerHTML = "<p>Unable to load jobs at this time.</p>";
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

// --- Featured Workers ---
async function loadFeaturedWorkers() {
    const container = document.getElementById("featured-workers");
    const skeletons = document.getElementById("workers-skeleton");
    if (!container || !skeletons) return;

    skeletons.style.display = "grid";

    try {
        const response = await fetch("https://randomuser.me/api/?results=6&nat=ng");
        const data = await response.json();
        const workers = data.results.map(user => ({
            fullName: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.medium,
            role: "Worker",
            skills: ["Plumbing", "Electrician", "Tailoring", "Carpentry"][Math.floor(Math.random() * 4)],
            location: `${user.location.city}, ${user.location.state}`,
        }));

        container.innerHTML = workers.map(worker => `
            <div class="user-card">
                <img src="${worker.avatar}" alt="${worker.fullName} photo">
                <h3>${worker.fullName}</h3>
                <p><strong>Role:</strong> ${worker.role}</p>
                <p><strong>Skill:</strong> ${worker.skills}</p>
                <p><strong>Location:</strong> ${worker.location}</p>
            </div>
        `).join("");
    } catch (err) {
        console.error("Error loading workers:", err);
        container.innerHTML = "<p>Unable to load workers at this time.</p>";
    } finally {
        skeletons.style.display = "none";
    }
}

// // Render a single job card template
// function createJobCard(job) {
//     return `
//     <div class="card job-card">
//       <h3>${job.title}</h3>
//       <p><strong>Company:</strong> ${job.company}</p>
//       <p><strong>Location:</strong> ${job.location}</p>
//       <p><strong>Salary:</strong> ${job.salary || 'Not specified'}</p>
//       <button class="btn save-job-btn" data-job-id="${job.id}">Save Job</button>
//     </div>
//   `;
// }

async function loadCities() {
    try {
        const response = await fetch(
            "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&offset=0",
            {
                headers: {
                    "X-RapidAPI-Key": "c7a338044dmsh69ffbce3033c61bp1bf90fjsn827485efc90a",
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                }
            }
        );

        const data = await response.json();
        console.log("Cities:", data.data);
    } catch (err) {
        console.error("Error fetching cities:", err);
    }
}

loadCities();



// Function to launch confetti
export function launchConfetti(count = 30) {
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random horizontal start position
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`; // Optional: colorful confetti

        // Random animation duration & delay
        confetti.style.animationDuration = `${0.8 + Math.random() * 0.8}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        container.appendChild(confetti);

        // Remove confetti after animation
        confetti.addEventListener('animationend', () => {
            confetti.remove();

        
        });
    }
}

