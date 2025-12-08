import { loadHeaderFooter } from "./utils.js";
import { launchConfetti } from "./main.js";
loadHeaderFooter();


document.addEventListener("DOMContentLoaded", () => {
    const postJobForm = document.getElementById("postJobForm");
    const successMessage = document.getElementById("successMessage");
    const locationSelect = document.getElementById("locationSelect");


    // To integrate locations using API
    const RAPIDAPI_KEY = "c7a338044dmsh69ffbce3033c61bp1bf90fjsn827485efc90a";
    
    // Static fallback cities
    const fallbackCities = [
        "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan",
        "Benin City", "Kaduna", "Enugu", "Jos", "Abeokuta"
    ];


    async function loadCities() {
        try {
            const response = await fetch(
                "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=50&countryIds=NG&sort=-population",
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": RAPIDAPI_KEY,
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                    }
                }
            );

            const data = await response.json();
            const cities = data.data;

            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city.city;
                option.textContent = `${city.city}, ${city.region}`;
                locationSelect.appendChild(option);
            });

        } catch (err) {
            console.error("Error fetching cities:", err);
            // Populate fallback cities
            fallbackCities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                locationSelect.appendChild(option);
            });
        }
    }
    //Now the function is called
    loadCities();


    postJobForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // To gather form data
        const newJob = {
            title: postJobForm.title.value,
            company: postJobForm.company.value,
            location: locationSelect.value,
            salary: postJobForm.salary.value || "Not specified",
            description: postJobForm.description.value
        };

        // Saving to localStorage and pushing to API
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs.push(newJob);
        localStorage.setItem("jobs", JSON.stringify(jobs));

        // To show success message
        successMessage.textContent = "Job posted successfully"
        successMessage.style.color = "green";

        // To trigger the confetti
        launchConfetti(100);

        // To reset Form
        postJobForm.reset();

    });
    
});