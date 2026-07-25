// Image popup
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("card-pic")) return;

  lightbox.classList.add("active");
  lightboxImg.src = e.target.src;
  lightboxImg.alt = e.target.alt || "";
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}
lightbox.addEventListener("click", () => {
  closeLightbox();
});
lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// Shared helper: renders a simple error state inside a container
// so a bad/missing JSON file degrades gracefully instead of leaving
// the section silently blank with an uncaught rejection in the console.
function renderLoadError(container, label) {
  if (!container) return;
  container.innerHTML = `<p class="muted-note">Unable to load ${label} right now. Please try again later.</p>`;
}

// Dynamically Load Projects
async function loadRecentProjects() {
  const container = document.querySelector('#recent-projects');

  try {
    const response = await fetch('../data/projects.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const projects = await response.json();

    projects.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentProjects = projects.slice(0, 2);

    container.innerHTML = recentProjects.map(project => `
        <div class="container-card">
            <h2>${project.title}</h2>

            <p>${project.description}</p>

            <p>
                <strong>Tech:</strong> ${project.tech}
            </p>

            <img
                src="${project.image}"
                alt="${project.title}"
                class="card-pic"
                loading="lazy"
            >

            <a href="../projects/projects.html#${project.id}">
                View Project Details
            </a>

            ${project.live
            ?`<a href="${project.live}" target="_blank" rel="noopener">
                View live Site
            </a>`: ``}
        </div>
    `).join('');
  } catch (err) {
    console.error('loadRecentProjects failed:', err);
    renderLoadError(container, 'recent projects');
  }
}

loadRecentProjects();

// Load Recent Certificates
async function loadRecentCertificates() {
  const container = document.getElementById('recent-certificates');

  try {
    const response = await fetch('../data/certificates.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const certificates = await response.json();

    certificates.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const recentCertificates = certificates.slice(0, 3);

    container.innerHTML = recentCertificates.map(cert => `
        <div class="container-card">
            <h2>${cert.title}</h2>

            <div class="card-row">
                <p>Issuer: ${cert.issuer}</p>
                <p>Issued: ${cert.issued}</p>
            </div>

            <img
                src="${cert.image}"
                alt="${cert.title}"
                class="card-pic"
                loading="lazy"
            >

            <a
                href="${cert.certificateUrl}"
                target="_blank"
                rel="noopener"
            >
                View Certificate
            </a>
        </div>
    `).join('');
  } catch (err) {
    console.error('loadRecentCertificates failed:', err);
    renderLoadError(container, 'certifications');
  }
}

loadRecentCertificates();

// Load Recent References
async function loadRecentReferences() {
  const container = document.getElementById('recent-references');

  try {
    const response = await fetch('../data/references.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const references = await response.json();

    const recentReferences = references.slice(0, 3);

    container.innerHTML = recentReferences.map(ref => `
        <div class="container-card">
            <h2>${ref.name}</h2>

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
    console.error('loadRecentReferences failed:', err);
    renderLoadError(container, 'references');
  }
}

loadRecentReferences();

// Load Contact Info
// (Rebuilt to match the template-literal pattern used above — the
// previous version built DOM nodes by hand with appendChild, which
// worked but was a different, harder-to-maintain style from the other
// three loaders and had no error handling if the fetch failed.)
async function loadContacts() {
  const container = document.getElementById("contact-list");

  try {
    const response = await fetch('../data/contacts.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const contacts = await response.json();

    container.innerHTML = contacts.map(item => {
      const isExternal = item.href
        && !item.href.startsWith("tel:")
        && !item.href.startsWith("mailto:");

      const detailMarkup = item.href
        ? `<a href="${item.href}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${item.value}</a>`
        : item.value;

      return `
        <div class="container-card">
            <span class="contact-type">
                <i data-lucide="${item.icon}"></i> ${item.type}:
            </span>
            <span class="contact-detail">${detailMarkup}</span>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    console.error('loadContacts failed:', err);
    renderLoadError(container, 'contact details');
  }
}

loadContacts();

// Footer year — kept current automatically instead of a hardcoded year
// that goes stale every January.
const footerCopy = document.getElementById('footer-copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Farai Dylan Masanganise`;
}

// Footer hiding
const footer = document.getElementById('footer');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 50) {
    footer.style.opacity = '1';
    footer.style.pointerEvents = 'auto';
  } else {
    footer.style.opacity = '0';
    footer.style.pointerEvents = 'none';
  }
});