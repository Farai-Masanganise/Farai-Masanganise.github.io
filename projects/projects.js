// Image popup (shared pattern with landing.js)
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
lightbox.addEventListener("click", () => closeLightbox());
lightboxImg.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
});

function renderLoadError(container, label) {
  if (!container) return;
  container.innerHTML = `<p class="muted-note">Unable to load ${label} right now. Please try again later.</p>`;
}

// Expects each entry in projects.json to have a "category" field
// with one of: "fullstack", "systems", "mobile", "tools"
// (matches the data-filter values on the buttons in projects.html)
let allProjects = [];
let activeFilter = "all";

function renderProjects() {
  const container = document.getElementById("projects-grid");
  const filtered = activeFilter === "all"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="muted-note">No projects in this category yet.</p>`;
    return;
  }

  container.innerHTML = filtered
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(project => `
        <div class="container-card" data-category="${project.category}">
            <h5>${project.title}</h5>

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

            ${project.repoUrl
              ? `<a href="${project.repoUrl}" target="_blank" rel="noopener">
                View Repository
            </a>`
              : `<p class="muted-note">Private repository — code not publicly available.</p>`
            }

            ${project.live
            ?`<a href="${project.live}" target="_blank" rel="noopener">
                Go To live Site
            </a>`: ``}
        </div>
    `).join('');
}

async function loadAllProjects() {
  const container = document.getElementById("projects-grid");

  try {
    const response = await fetch('../data/projects.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    allProjects = await response.json();
    renderProjects();
  } catch (err) {
    console.error('loadAllProjects failed:', err);
    renderLoadError(container, 'projects');
  }
}

// Filter bar wiring
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    activeFilter = btn.dataset.filter;
    renderProjects();
  });
});

loadAllProjects();

// Footer year
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