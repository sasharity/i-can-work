import { loadHeaderFooter } from "./utils.js";
loadHeaderFooter();

const postJobForm = document.getElementById("postJobForm");
const successMessage = document.getElementById("successMessage")

postJobForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // To gather form data
    const newJob = {
        title: postJobForm.title.value,
        company: postJobForm.company.value,
        location: postJobForm.location.value,
        salary: postJobForm.salary.value || "Not specified",
        description: postJobForm.description.value
    };

    // Saving to localStorage and pushing to API
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // To show success message
    successMessage.textContent = "Job posted successfully"
    successMessage.style.color = "red";

    // To reset Form
    postJobForm.reset();

});
