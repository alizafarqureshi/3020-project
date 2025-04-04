async function fetchServices() {
    try {
        const response = await fetch("http://localhost:3000/services");
        const services = await response.json();

        const container = document.getElementById("service_boxes");

        let currentRow = null;

        services.forEach((service, index) => {
            // Create a new row every 3 items
            if (index % 3 === 0) {
                currentRow = document.createElement("div");
                currentRow.className = "row g-4";
                container.appendChild(currentRow);
            }

            const col = document.createElement("div");
            col.className = "col-md-4";

            const card = document.createElement("div");
            card.className = "custom-card";

            const title = document.createElement("h5");
            title.textContent = service.title;

            const desc = document.createElement("p");
            desc.textContent = service.description;

            card.appendChild(title);
            card.appendChild(desc);
            col.appendChild(card);
            currentRow.appendChild(col);
        });
    } catch (error) {
        console.error("Error fetching services:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchServices);