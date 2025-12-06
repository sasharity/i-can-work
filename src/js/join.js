import { loadHeaderFooter } from "./utils.js";
import { launchConfetti } from "./main.js";

loadHeaderFooter(); // Load site header/footer
launchConfetti(); //To lauch confetti after user applies for job

const form = document.getElementById("joinForm");
const feedback = document.getElementById("formFeedback");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "";
    feedback.style.color = "red";

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value.trim();
    const role = form.role.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^0\d{9,10}$/;

    if (!fullName || !email || !phone || !password || !role) {
        feedback.textContent = "Please fill out all required fields.";
        return;
    }

    if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email address.";
        return;
    }

    if (!phonePattern.test(phone)) {
        feedback.textContent = "Please enter a valid Nigerian phone number (e.g., 08012345678).";
        return;
    }

    if (password.length < 6) {
        feedback.textContent = "Password must be at least 6 characters long.";
        return;
    }

    feedback.style.color = "green";
    feedback.textContent = "Form submitted successfully!";

    
});
