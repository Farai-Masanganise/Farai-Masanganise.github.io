async function loadReferences() {
    const container = document.getElementById('all-references');

    if (!container) return;

    const response = await fetch('./references.json');
    const references = await response.json();

    container.innerHTML = references.map(ref => `
        <div class="container-card">
            <h5>${ref.name}</h5>

            <p>${ref.position} – ${ref.organization}</p>

            <p>Address: ${ref.address}</p>

            <p>Tel: ${ref.phone}</p>

            <p>
                Email:
                <a href="mailto:${ref.email}">
                    ${ref.email}
                </a>
            </p>
        </div>
    `).join('');
}

loadReferences();