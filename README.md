# Farai Dylan Masanganise – Portfolio

Personal portfolio website – built as a dynamic, data-driven single-page application to showcase my projects, certifications, education, and technical skills as a Computer Science student.

**Live:** https://farai-masanganise.github.io

---

## Overview

This portfolio is designed to present my professional profile in a clean, accessible, and maintainable way. Instead of hardcoding content into the HTML, the site loads all dynamic data from external JSON files. This makes it easy to update projects, certifications, references, and contact details without touching the markup.

**Key features:**

- Dynamic content – projects, certificates, references, and contacts are loaded from JSON
- Lightbox image viewer – click on any project or certificate image to expand it
- Accessibility-first – semantic HTML, ARIA labels, skip-to-content link, and keyboard navigation
- Responsive layout – adapts seamlessly to desktop, tablet, and mobile viewports
- Graceful degradation – if a JSON file fails to load, the affected section shows a user-friendly error message instead of breaking silently
- Minimalist, modern UI – built with custom CSS and the Inter / JetBrains Mono typefaces
- Smooth scrolling – navigation links scroll to the corresponding section

---

## Tech Stack

| Layer        | Technology                                                              |
|--------------|-------------------------------------------------------------------------|
| Markup       | HTML5                                                                   |
| Styling      | Custom CSS (modular, component-based)                                   |
| Scripting    | Vanilla JavaScript (ES6+)                                               |
| Data         | JSON (stored in `/data/`)                                               |
| Icons        | Lucide – loaded via CDN                                                 |
| Fonts        | Inter + JetBrains Mono – via Google Fonts                               |
| Hosting      | GitHub Pages                                                            |

---

## Project Structure

```
/
├── index.html                     # Main landing page
├── projects/
│   └── projects.html              # Full projects listing
├── certificates/
│   └── certificates.html          # Full certifications listing
├── references/
│   └── references.html            # Full references listing
├── data/
│   ├── projects.json              # All project entries
│   ├── certificates.json          # All certification entries
│   ├── references.json            # All reference entries
│   └── contacts.json              # Contact information
├── css/
│   └── main.css                   # Global styles
├── landing/
│   └── landing.js                 # Main JavaScript (dynamic loading, lightbox, footer)
└── images/
    ├── profile.jpg                # About Me portrait
    └── ...                        # Project / certificate images
```

---

## How It Works

The site uses a progressive enhancement approach:

1. **Static shell** – the HTML provides the structure and semantic landmarks.
2. **Data fetching** – on page load, JavaScript fetches JSON files from `/data/`.
3. **Dynamic rendering** – content is injected into the appropriate containers using template literals.
4. **Image lightbox** – clicking on a `card-pic` expands it in a modal overlay.
5. **Footer behavior** – the footer fades in only when the user scrolls to the very bottom.

### Example: Loading Projects

```javascript
async function loadRecentProjects() {
  const response = await fetch('../data/projects.json');
  const projects = await response.json();
  // Sort by date, take the 2 most recent, render to DOM
}
```

Each section follows the same pattern, making the codebase consistent and easy to extend.

---

## Getting Started

### Prerequisites

- Any modern web browser
- A local development server (e.g., VS Code Live Server, Python `http.server`, or Node `serve`)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Serve the project locally**

   Using VS Code Live Server:
   - Right-click `index.html` → "Open with Live Server"

   Or using Python:
   ```bash
   python -m http.server 8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`

### Adding Content

- **Projects** – edit `data/projects.json` and add new objects following the existing schema.
- **Certificates** – edit `data/certificates.json`.
- **References** – edit `data/references.json`.
- **Contact details** – edit `data/contacts.json`.

Each JSON file has a clear structure – refer to the existing entries for guidance.

---

## Future Improvements

- Dark / light theme toggle
- Search / filter functionality for projects
- Blog or articles section
- Downloadable CV/resume in PDF format
- Animated page transitions
- Unit tests for the data-loading logic

---

## Contributing

This is a personal portfolio, but if you spot a bug or have a suggestion, feel free to open an issue or submit a pull request. All contributions are welcome.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

- **Email:** [FDylan.Dev@gmail.com](mailto:fdylandev@gmail.com)
- **GitHub:** [github.com/Farai-Masanganise](https://github.com/farai-masanganise)
- **LinkedIn:** [linkedin.com/in/developer-Masanganise](https://linkedin.com/in/developer-masanganisee)

---

Built by **Farai Dylan Masanganise** – Computer Science student, becoming a builder of real systems.