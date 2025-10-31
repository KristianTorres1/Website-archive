const searchInput = document.getElementById('searchInput');
const websitesGrid = document.getElementById('websitesGrid');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const darkModeToggle = document.getElementById('darkModeToggle');

let filteredWebsites = [...websitesData];

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

function createWebsiteCard(website) {
    const card = document.createElement('div');
    card.className = 'website-card';
    card.onclick = () => {
        window.location.href = `detail.html?id=${website.id}`;
    };

    const tagsHTML = website.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
        <img src="${website.image}" alt="${website.name}" class="website-image" loading="lazy">
        <div class="website-content">
            <span class="website-category">${website.category}</span>
            <h3 class="website-name">${website.name}</h3>
            <p class="website-description">${website.description}</p>
            <div class="website-tags">
                ${tagsHTML}
            </div>
        </div>
    `;

    return card;
}

function renderWebsites(websites) {
    websitesGrid.innerHTML = '';
    
    if (websites.length === 0) {
        noResults.style.display = 'block';
        resultsCount.textContent = '';
        return;
    }

    noResults.style.display = 'none';
    resultsCount.textContent = `Showing ${websites.length} website${websites.length !== 1 ? 's' : ''}`;

    websites.forEach(website => {
        const card = createWebsiteCard(website);
        websitesGrid.appendChild(card);
    });
}

function filterWebsites(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        filteredWebsites = [...websitesData];
    } else {
        filteredWebsites = websitesData.filter(website => {
            return (
                website.name.toLowerCase().includes(term) ||
                website.category.toLowerCase().includes(term) ||
                website.description.toLowerCase().includes(term) ||
                website.tags.some(tag => tag.toLowerCase().includes(term))
            );
        });
    }
    
    renderWebsites(filteredWebsites);
}

searchInput.addEventListener('input', (e) => {
    filterWebsites(e.target.value);
});

initDarkMode();
renderWebsites(websitesData);
