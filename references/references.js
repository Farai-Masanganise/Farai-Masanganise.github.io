function renderLoadError(container, label) {
  if (!container) return;
  container.innerHTML = `<p class="muted-note">Unable to load ${label} right now. Please try again later.</p>`;
}

async function loadAllReferences() {
  const container = document.getElementById('references-grid');

  try {
    const response = await fetch('../data/references.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
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
  } catch (err) {
    console.error('loadAllReferences failed:', err);
    renderLoadError(container, 'references');
  }
}

loadAllReferences();

// Footer year
const footerCopy = document.getElementById('footer-copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Farai Dylan Masanganise`;
}