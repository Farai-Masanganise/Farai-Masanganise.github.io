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

async function loadAllCertificates() {
  const container = document.getElementById('certificates-grid');

  try {
    const response = await fetch('../data/certificates.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const certificates = await response.json();

    certificates.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = certificates.map(cert => `
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
    console.error('loadAllCertificates failed:', err);
    renderLoadError(container, 'certifications');
  }
}

loadAllCertificates();

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