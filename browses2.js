const darkModeToggle = document.getElementById('darkModeToggle');
const websiteDetail = document.getElementById('websiteDetail');

function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function getWebsiteIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function renderWebsiteDetail(website) {
    if (!website) {
        websiteDetail.innerHTML = `
            <div class="detail-content">
                <h2>Website not found</h2>
                <p>Sorry, we couldn't find the website you're looking for.</p>
                <a href="brows.html" class="visit-button">← Back to Browse</a>
            </div>
        `;
        return;
    }

    const tagsHTML = website.tags.map(tag => 
        `<span class="website-category">${tag}</span>`
    ).join('');

    const featuresHTML = website.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');

    const techHTML = website.technologies.map(tech => 
        `<li>${tech}</li>`
    ).join('');

    websiteDetail.innerHTML = `
        <img src="${website.image}" alt="${website.name}" class="detail-image">
        <div class="detail-content">
            <div class="detail-header">
                <h1 class="detail-title">${website.name}</h1>
                <div class="detail-meta">
                    ${tagsHTML}
                </div>
            </div>

            <p class="detail-description">${website.fullDescription}</p>

            <div class="detail-section">
                <h3 class="detail-section-title">Key Features</h3>
                <ul class="features-list">
                    ${featuresHTML}
                </ul>
            </div>

            <div class="detail-section">
                <h3 class="detail-section-title">Technologies Used</h3>
                <ul class="tech-list">
                    ${techHTML}
                </ul>
            </div>

            <a href="${website.urll}" target="_blank" rel="noopener noreferrer" class="visit-button">
                Visit Website →
            </a>
            
            <a href="${website.url}" target="_blank" rel="noopener noreferrer" class="download-button">
                Download here✓
            </a>
        </div>
    `;
}

initDarkMode();

const websiteId = getWebsiteIdFromURL();
const website = websitesData.find(w => w.id === websiteId);
renderWebsiteDetail(website);