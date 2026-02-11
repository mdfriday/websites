// Dark mode toggle functionality
(function() {
    const toggle = document.getElementById('darkmode-toggle');
    if (!toggle) return;
    
    const html = document.documentElement;
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');
    
    function setTheme(theme) {
        html.dataset.theme = theme;
        html.setAttribute('saved-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcons(theme);
        
        // Dispatch custom event for theme change
        const event = new CustomEvent('themechange', { 
            detail: { theme } 
        });
        document.dispatchEvent(event);
    }
    
    function updateIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
    
    // Toggle on click
    toggle.addEventListener('click', () => {
        const current = html.dataset.theme || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
    });
    
    // Initialize icons based on current theme
    const currentTheme = html.dataset.theme || 'light';
    updateIcons(currentTheme);
    
    // Listen for system theme changes
    const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMedia.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
})();

