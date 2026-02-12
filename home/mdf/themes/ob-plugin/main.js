/**
 * Theme Toggle Functionality
 * Handles switching between dark and light themes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        return; // Exit if theme toggle button not found
    }

    /**
     * Get current theme from data-theme attribute or localStorage
     */
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 
               localStorage.getItem('theme') || 
               'dark'; // default to dark
    }

    /**
     * Set theme and save to localStorage
     */
    function setTheme(theme) {
        // Validate theme value
        if (theme !== 'dark' && theme !== 'light') {
            theme = 'dark'; // fallback to dark
        }
        
        // Update HTML data-theme attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button appearance
        updateThemeToggleButton(theme);
        
        console.log(`Theme switched to: ${theme}`);
    }

    /**
     * Update theme toggle button icons based on current theme
     */
    function updateThemeToggleButton(theme) {
        const darkIcon = themeToggle.querySelector('.theme-icon-dark');
        const lightIcon = themeToggle.querySelector('.theme-icon-light');
        
        if (!darkIcon || !lightIcon) {
            return;
        }

        if (theme === 'dark') {
            // In dark mode, show sun icon (to switch to light)
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        } else {
            // In light mode, show moon icon (to switch to dark)
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        }
    }

    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize theme toggle button appearance
    updateThemeToggleButton(getCurrentTheme());

    // Add click event listener to theme toggle button
    themeToggle.addEventListener('click', function(event) {
        event.preventDefault();
        toggleTheme();
    });

    // Add keyboard support (Enter and Space keys)
    themeToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTheme();
        }
    });

    // Listen for system theme changes (optional enhancement)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only apply system theme if no theme is saved in localStorage
        if (!localStorage.getItem('theme')) {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            setTheme(systemTheme);
        }
        
        // Listen for system theme changes
        mediaQuery.addEventListener('change', function(e) {
            // Only apply system theme if no theme is saved in localStorage
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'dark' : 'light';
                setTheme(systemTheme);
            }
        });
    }

    console.log('Theme toggle functionality initialized');
});

/**
 * Additional utility functions for theme management
 */

/**
 * Get system preferred theme
 */
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * Reset theme to system preference
 */
function resetToSystemTheme() {
    localStorage.removeItem('theme');
    const systemTheme = getSystemTheme();
    document.documentElement.setAttribute('data-theme', systemTheme);
    
    // Update toggle button if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const darkIcon = themeToggle.querySelector('.theme-icon-dark');
        const lightIcon = themeToggle.querySelector('.theme-icon-light');
        
        if (darkIcon && lightIcon) {
            if (systemTheme === 'dark') {
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
            } else {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
            }
        }
    }
    
    console.log(`Theme reset to system preference: ${systemTheme}`);
}

// Expose utility functions globally (optional)
window.themeUtils = {
    getCurrentTheme: function() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    setTheme: function(theme) {
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    },
    getSystemTheme: getSystemTheme,
    resetToSystemTheme: resetToSystemTheme
};
