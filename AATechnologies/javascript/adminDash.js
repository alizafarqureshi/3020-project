document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image");
    let image = "";

    if (!title || !category || (category === "service" && !description)) {
        alert("Please fill in all required fields.");
        return;
    }

    // Handle image upload
    if (category === "project" && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            image = reader.result;
            await submitData(category, title, description, image);
        };
    } else {
        await submitData(category, title, description, image);
    }
});

async function submitData(category, title, description, image) {
    const endpoint = category === "service" ? "/add-service" : "/add-project";
    const data = 
        category === "service"
            ? {title, description}
            :{title, image}
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`${category} added successfully!`);
            window.location.reload();
        } else {
            throw new Error("Failed to add item");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred!");
    }
}

function toggleFields() {
    
    let button = document.getElementById("button");
    let category = document.getElementById("category").value;
    let title = document.getElementById("titleField");
    let description = document.getElementById("descriptionField");
    let imageInput = document.getElementById("imageField");

    if (category === "service") {
        description.style.display = "block";
        imageInput.style.display = "none";
        title.style.display = "block";
        button.style.display = "block";
    } else if (category === "project") {
        description.style.display = "none";
        imageInput.style.display = "block";
        title.style.display = "block";
        button.style.display = "block";
    } else {
        description.style.display = "none";
        imageInput.style.display = "none";
        title.style.display = "none";
        button.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", toggleFields);