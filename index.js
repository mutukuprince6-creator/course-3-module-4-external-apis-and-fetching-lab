// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fetch-alerts");
    button.addEventListener("click", () => {
        const input = document.getElementById("state-input");
        const display = document.getElementById("alerts-display");
        const errorDiv = document.getElementById("error-message");

        const state = input.value;
        fetch(`${weatherApi}${state}`)
            .then(response => response.json())
            .then(data => {
                display.innerHTML = "";

                //hide error message if there is one
                errorDiv.textContent = "";
                errorDiv.classList.add("hidden");
                //show count 
                const count = document.createElement("h2");
                count.textContent = `${data.title}: ${data.features.length}`;
                display.appendChild(count);

                data.features.forEach(alert => {
                    const div = document.createElement("div");
                    div.textContent = alert.properties.headline;
                    display.appendChild(div);
                });
                input.value = "";
            })
            .catch(error => {
                console.error("Error fetching weather alerts:", error);
                
                errorDiv.textContent = error.message;
                errorDiv.classList.add("error");
                errorDiv.classList.remove("hidden");

                input.value = "";
            });
        });
});