async function loadAllCertificates() {
    const container = document.getElementById('all-certificates');

    if (!container) return;

    const response = await fetch('./data/certificates.json');
    const certificates = await response.json();

    certificates.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

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

loadAllCertificates();