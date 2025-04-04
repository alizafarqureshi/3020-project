document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById("projects-container");

    // List of project images
    let projects = [];
    for (let i = 8; i >= 1; i--) { // 9 projects, latest at the top
        projects.push(`./src/img/w${i}.png`);
    }

    async function fetchProjects() {
        try {
            const response = await fetch("http://localhost:3000/projects");
            const projects = await response.json();

            renderProjects(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    function renderProjects() {
        projectsContainer.innerHTML = "";
        console.log("Projects Loaded:", projects);
        projects.forEach((imgPath, index) => {
            let cardHTML = `
            <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
                <div class="project-card" style="background-image: url('${imgPath}');">
                    <div class="overlay"></div>
                    <div class="content">
                        <h5>Project ${projects.length - index}</h5>
                        <button class="btn btn-custom">See More</button>
                    </div>
                </div>
            </div>
        `;
            projectsContainer.innerHTML += cardHTML;
        });
    }

    // Function to add a new project dynamically
    function addNewProject(newProjectImg) {
        projects.unshift(newProjectImg); // Add new project to the top
        renderProjects(); // Re-render projects
    }

    renderProjects(); // Initial load
});