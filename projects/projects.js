//Load ALL Projects
async function loadAllProjects() {
    const response = await fetch('./data/projects.json');
    const projects = await response.json();

    projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.querySelector('#all-projects');

    container.innerHTML = projects.map(project => `
        <div id="${project.id}" class="container-card">
            <h3>${project.title}</h3>

            <img
                src="${project.image}"
                alt="${project.title}"
                class="card-pic"
            >

            <p>${project.description}</p>

            <p>
                Tech: ${project.tech.join(', ')}
            </p>
        </div>
    `).join('');
}

loadAllProjects();