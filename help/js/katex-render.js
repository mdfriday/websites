/**
 * KaTeX Client-Side Rendering Script
 * Based on Quartz's LaTeX transformer approach
 * 
 * This script runs after the DOM is loaded and renders all math elements
 * marked with data-math attributes.
 */

(function() {
  'use strict';
  
  /**
   * Render all math elements on the page
   */
  function renderAllMath() {
    // Check if KaTeX is loaded
    if (typeof katex === 'undefined') {
      console.error('KaTeX is not loaded');
      return;
    }
    
    // Find all elements with data-math attribute
    const mathElements = document.querySelectorAll('[data-math]');
    
    mathElements.forEach(function(element) {
      try {
        const mathType = element.getAttribute('data-math');
        const isBlock = mathType === 'block';
        
        // Get the raw LaTeX content (already HTML-escaped by server)
        const content = element.textContent || element.innerText;
        
        // Clear the element
        element.textContent = '';
        
        // Render with KaTeX
        katex.render(content, element, {
          displayMode: isBlock,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: false,
          // Enable \color and other color commands
          colorIsTextColor: true,
        });
        
        // Add rendered class
        element.classList.add('math-rendered');
        
      } catch (error) {
        console.error('Error rendering math:', error);
        // Show error in element
        element.classList.add('math-error');
        element.textContent = 'Math rendering error: ' + error.message;
      }
    });
  }
  
  /**
   * Initialize when DOM is ready
   */
  function init() {
    // Wait for KaTeX to be loaded
    if (typeof katex !== 'undefined') {
      renderAllMath();
    } else {
      // Retry after a short delay
      setTimeout(function() {
        if (typeof katex !== 'undefined') {
          renderAllMath();
        } else {
          console.error('KaTeX failed to load');
        }
      }, 100);
    }
  }
  
  // Run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already loaded
    init();
  }
  
})();

