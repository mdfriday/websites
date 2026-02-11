/**
 * Callout Component - Collapsible/Expandable Functionality
 * Ported from: quartz-src/quartz/components/scripts/callout.inline.ts
 * 
 * Handles click events on collapsible callout titles to toggle content visibility.
 */

(function() {
  /**
   * Toggle callout collapsed state
   */
  function toggleCallout() {
    const outerBlock = this.parentElement;
    if (!outerBlock) return;

    outerBlock.classList.toggle('is-collapsed');
    
    const content = outerBlock.getElementsByClassName('callout-content')[0];
    if (!content) return;

    const collapsed = outerBlock.classList.contains('is-collapsed');
    content.style.gridTemplateRows = collapsed ? '0fr' : '1fr';
  }

  /**
   * Setup callout interactivity
   */
  function setupCallout() {
    console.log('[Callout] Setting up collapsible callouts');
    
    const collapsible = document.getElementsByClassName('callout is-collapsible');
    console.log('[Callout] Found', collapsible.length, 'collapsible callouts');
    
    for (const div of collapsible) {
      const title = div.getElementsByClassName('callout-title')[0];
      const content = div.getElementsByClassName('callout-content')[0];
      
      if (!title || !content) continue;

      // Add click listener to title
      title.addEventListener('click', toggleCallout);
      
      // Set initial state
      const collapsed = div.classList.contains('is-collapsed');
      content.style.gridTemplateRows = collapsed ? '0fr' : '1fr';
      
      console.log('[Callout] Initialized callout:', div.dataset.callout, 'collapsed:', collapsed);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCallout);
  } else {
    setupCallout();
  }
  
  // Re-setup after SPA navigation (if using SPA routing)
  document.addEventListener('nav', setupCallout);
  
  // Also listen for custom content loaded events
  document.addEventListener('contentloaded', setupCallout);
  
  console.log('[Callout] Callout module initialized');
})();

