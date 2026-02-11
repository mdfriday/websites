// Table of Contents - Matching Quartz implementation
// Based on quartz-src/quartz/components/scripts/toc.inline.ts

(function() {
  // IntersectionObserver for highlighting current section
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const slug = entry.target.id;
      const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`);
      const windowHeight = entry.rootBounds?.height;
      
      if (windowHeight && tocEntryElements.length > 0) {
        if (entry.boundingClientRect.y < windowHeight) {
          tocEntryElements.forEach((tocEntryElement) => 
            tocEntryElement.classList.add("in-view")
          );
        } else {
          tocEntryElements.forEach((tocEntryElement) => 
            tocEntryElement.classList.remove("in-view")
          );
        }
      }
    }
  });

  // Toggle TOC collapse/expand
  function toggleToc() {
    this.classList.toggle("collapsed");
    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
    const content = this.nextElementSibling;
    if (!content) return;
    content.classList.toggle("collapsed");
  }

  // Setup TOC
  function setupToc() {
    console.log('[TOC] Setting up Table of Contents');
    
    for (const toc of document.getElementsByClassName("toc")) {
      const button = toc.querySelector(".toc-header");
      const content = toc.querySelector(".toc-content");
      
      if (!button || !content) {
        console.log('[TOC] Missing button or content element');
        continue;
      }
      
      button.addEventListener("click", toggleToc);
      console.log('[TOC] Added click listener to button');
      
      // Process TOC links to add data-for attribute
      // Hugo's .TableOfContents directly generates <ul>...</ul> without nav wrapper
      const tocNav = content.querySelector('nav#TableOfContents'); // Try standard Hugo format
      const container = tocNav || content; // Fallback to content div if no nav
      
      const links = container.querySelectorAll('a[href^="#"]');
      console.log(`[TOC] Found ${links.length} TOC links`);
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const slug = href.substring(1); // Remove '#'
          link.setAttribute('data-for', slug);
          
          // Add depth class based on nesting level
          const listItem = link.closest('li');
          if (listItem) {
            // Count ul ancestors to determine depth
            let depth = 0;
            let current = listItem.parentElement;
            const rootContainer = tocNav || content.querySelector('ul');
            while (current && current !== rootContainer && current !== content) {
              if (current.tagName === 'UL') depth++;
              current = current.parentElement;
            }
            listItem.classList.add(`depth-${depth}`);
            console.log(`[TOC] Added depth-${depth} to ${slug}`);
          }
        }
      });
    }
    
    // Update TOC entry highlighting with IntersectionObserver
    observer.disconnect();
    const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
    console.log(`[TOC] Observing ${headers.length} headers`);
    headers.forEach((header) => observer.observe(header));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToc);
  } else {
    setupToc();
  }
})();
