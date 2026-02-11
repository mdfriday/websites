/**
 * Clipboard Component - Code Block Copy Button
 * Ported from: quartz-src/quartz/components/scripts/clipboard.inline.ts
 * 
 * Adds a copy button to all code blocks that copies the code to clipboard.
 */

(function() {
  // SVG icons from GitHub Octicons
  const svgCopy = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
  
  const svgCheck = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

  function addClipboardButtons() {
    console.log('[Clipboard] Adding clipboard buttons to code blocks');
    
    const preElements = document.getElementsByTagName('pre');
    console.log('[Clipboard] Found', preElements.length, 'pre elements');
    
    for (let i = 0; i < preElements.length; i++) {
      const pre = preElements[i];
      
      // Skip if button already exists
      if (pre.querySelector('.clipboard-button')) {
        continue;
      }
      
      const codeBlock = pre.getElementsByTagName('code')[0];
      if (!codeBlock) {
        continue;
      }
      
      // Get the source code to copy
      // Support custom data-clipboard attribute for special cases
      let source = codeBlock.dataset.clipboard 
        ? JSON.parse(codeBlock.dataset.clipboard) 
        : codeBlock.innerText;
      
      // Clean up extra newlines (matching Quartz behavior)
      source = source.replace(/\n\n/g, '\n');
      
      // Create the copy button
      const button = document.createElement('button');
      button.className = 'clipboard-button';
      button.type = 'button';
      button.innerHTML = svgCopy;
      button.setAttribute('aria-label', 'Copy source');
      
      // Click handler
      function onClick() {
        if (!navigator.clipboard) {
          console.error('[Clipboard] Clipboard API not available');
          return;
        }
        
        navigator.clipboard.writeText(source).then(
          () => {
            console.log('[Clipboard] Code copied to clipboard');
            button.blur();
            button.innerHTML = svgCheck;
            
            // Reset to copy icon after 2 seconds
            setTimeout(() => {
              button.innerHTML = svgCopy;
              button.style.borderColor = '';
            }, 2000);
          },
          (error) => {
            console.error('[Clipboard] Failed to copy:', error);
          }
        );
      }
      
      button.addEventListener('click', onClick);
      
      // Add button to pre element
      pre.prepend(button);
      console.log('[Clipboard] Added button to code block', i + 1);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addClipboardButtons);
  } else {
    addClipboardButtons();
  }
  
  // Re-add buttons after SPA navigation (if using SPA routing)
  document.addEventListener('nav', addClipboardButtons);
  
  // Also listen for custom events that might indicate new content
  document.addEventListener('contentloaded', addClipboardButtons);
  
  console.log('[Clipboard] Clipboard module initialized');
})();

