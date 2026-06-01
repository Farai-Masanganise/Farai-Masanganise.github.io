//Image popup
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("card-pic")) return;

  lightbox.classList.add("active");
  lightboxImg.src = e.target.src;
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}
lightbox.addEventListener("click", () => {
	closeLightbox();
});
lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"&& lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

//Dynamically Load Projects
async function loadRecentProjects() {
    const response = await fetch('././data/projects.json');
    const projects = await response.json();

    projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    const recentProjects = projects.slice(0, 2);

    const container = document.querySelector('#recent-projects');

    container.innerHTML = recentProjects.map(project => `
        <div class="container-card">
            <h5>${project.title}</h5>

            <p>${project.description}</p>

            <p>
                Tech: ${project.tech.join(', ')}
            </p>

            <img
                src="${project.image}"
                alt="${project.title}"
                class="card-pic"
            >

            <a href="projects.html#${project.id}">
                View Project Details
            </a>
        </div>
    `).join('');
}

loadRecentProjects();

//Load Recent Certificates
async function loadRecentCertificates() {
    const response = await fetch('././data/certificates.json');
    const certificates = await response.json();

    certificates.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const recentCertificates = certificates.slice(0, 3);

    const container = document.getElementById('recent-certificates');

    container.innerHTML = recentCertificates.map(cert => `
        <div class="container-card">
            <h5>${cert.title}</h5>

            <div class="card-row">
                <p>Issuer: ${cert.issuer}</p>
                <p>Issued: ${cert.issued}</p>
            </div>

            <img
                src="${cert.image}"
                alt="${cert.title}"
                class="card-pic"
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
}

loadRecentCertificates();
//Load Recent References
async function loadRecentReferences() {
    const container = document.getElementById('recent-references');

    const response = await fetch('././data/references.json');
    const references = await response.json();

    const recentReferences = references.slice(0, 3);

    container.innerHTML = recentReferences.map(ref => `
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

loadRecentReferences();

//Contact Info
const container = document.getElementById("contact-list");

contacts.forEach(item => {
  const card = document.createElement("div");
  card.className = "container-card";

  const type = document.createElement("span");
  type.className = "contact-type";

  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", item.icon);

  type.appendChild(icon);
  type.append(` ${item.type}:`);

  const detail = document.createElement("span");
  detail.className = "contact-detail";

  if (item.href) {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.value;

    // external links only
    if (!item.href.startsWith("tel:") && !item.href.startsWith("mailto:")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    detail.appendChild(link);
  } else {
    detail.textContent = item.value;
  }

  card.appendChild(type);
  card.appendChild(detail);

  container.appendChild(card);
});

if (window.lucide) {
  lucide.createIcons();
}


//FooterHiding
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
})