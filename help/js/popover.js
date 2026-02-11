/**
 * Popover Preview for Internal Links
 * Based on Quartz popover.inline.ts
 * 
 * Features:
 * - Hover preview for internal links
 * - Async content loading with cache
 * - Smart positioning with Floating UI
 * - Support for anchors, images, PDFs
 * - Mobile-friendly (disabled on mobile)
 */

(async function() {
  'use strict';

  // Only enable on desktop
  if (window.innerWidth <= 1024) {
    console.log('[Popover] Disabled on mobile');
    return;
  }

  // Wait for Floating UI to be loaded
  if (!window.FloatingUIDOM) {
    console.error('[Popover] Floating UI not loaded');
    return;
  }

  const { computePosition, flip, inline, shift } = window.FloatingUIDOM;

  const parser = new DOMParser();
  let activeAnchor = null;
  const cache = new Map(); // Cache loaded popovers

  /**
   * Mouse enter handler - show popover
   */
  async function mouseEnterHandler(event) {
    const link = this;
    activeAnchor = link;

    // Skip if explicitly disabled
    if (link.dataset.noPopover === 'true') {
      return;
    }

    // Skip external links
    if (!link.classList.contains('internal')) {
      return;
    }

    const targetUrl = new URL(link.href);
    const hash = decodeURIComponent(targetUrl.hash);
    targetUrl.hash = '';
    targetUrl.search = '';
    
    const popoverId = `popover-${targetUrl.pathname.replace(/\//g, '-').replace(/\./g, '-')}`;

    /**
     * Position popover using Floating UI
     */
    async function setPosition(popoverElement) {
      try {
        const { x, y } = await computePosition(link, popoverElement, {
          strategy: 'fixed',
          middleware: [
            inline({ x: event.clientX, y: event.clientY }),
            shift({ padding: 10 }),
            flip()
          ]
        });
        Object.assign(popoverElement.style, {
          transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`
        });
      } catch (err) {
        console.error('[Popover] Position error:', err);
      }
    }

    /**
     * Show existing popover
     */
    function showPopover(popoverElement) {
      clearActivePopover();
      popoverElement.classList.add('active-popover');
      setPosition(popoverElement);

      // Scroll to anchor if present
      if (hash) {
        const popoverInner = popoverElement.querySelector('.popover-inner');
        const targetAnchor = `#popover-internal-${hash.slice(1)}`;
        const heading = popoverInner.querySelector(targetAnchor);
        if (heading) {
          // Leave ~12px of buffer when scrolling to a heading
          popoverInner.scroll({ top: heading.offsetTop - 12, behavior: 'instant' });
        }
      }
    }

    // Check cache first
    const existingPopover = document.getElementById(popoverId);
    if (existingPopover) {
      showPopover(existingPopover);
      return;
    }

    // Fetch content
    let response;
    try {
      response = await fetch(targetUrl.href);
    } catch (err) {
      console.error('[Popover] Fetch failed:', err);
      return;
    }

    if (!response.ok) {
      console.warn('[Popover] Response not ok:', response.status);
      return;
    }

    const contentType = response.headers.get('Content-Type') || '';
    const [contentTypeCategory, typeInfo] = contentType.split('/');

    // Create popover element
    const popoverElement = document.createElement('div');
    popoverElement.id = popoverId;
    popoverElement.classList.add('popover');

    const popoverInner = document.createElement('div');
    popoverInner.classList.add('popover-inner');
    popoverInner.dataset.contentType = contentType;
    popoverElement.appendChild(popoverInner);

    // Handle different content types
    if (contentTypeCategory === 'image') {
      const img = document.createElement('img');
      img.src = targetUrl.href;
      img.alt = targetUrl.pathname;
      popoverInner.appendChild(img);
    } else if (contentType.includes('pdf')) {
      const pdf = document.createElement('iframe');
      pdf.src = targetUrl.href;
      popoverInner.appendChild(pdf);
    } else {
      // HTML content
      const html = await response.text();
      const doc = parser.parseFromString(html, 'text/html');

      // Normalize relative URLs
      normalizeRelativeURLs(doc, targetUrl);

      // Prepend IDs to prevent duplicates
      doc.querySelectorAll('[id]').forEach(el => {
        el.id = `popover-internal-${el.id}`;
      });

      // Extract .popover-hint elements
      const hintElements = doc.querySelectorAll('.popover-hint');
      if (hintElements.length === 0) {
        console.warn('[Popover] No .popover-hint found in:', targetUrl.href);
        return;
      }

      hintElements.forEach(el => {
        // Clone and append
        const cloned = el.cloneNode(true);
        popoverInner.appendChild(cloned);
      });
    }

    // Avoid duplicate
    if (document.getElementById(popoverId)) {
      return;
    }

    document.body.appendChild(popoverElement);

    // Check if still hovering the same link
    if (activeAnchor !== link) {
      return;
    }

    showPopover(popoverElement);
  }

  /**
   * Clear active popover
   */
  function clearActivePopover() {
    activeAnchor = null;
    document.querySelectorAll('.popover').forEach(el => {
      el.classList.remove('active-popover');
    });
  }

  /**
   * Normalize relative URLs in popover content
   * Based on Quartz path.ts normalizeRelativeURLs implementation
   * Only processes relative paths (starting with ./ or ../ or empty)
   * Converts them to pathname + hash (no origin/host)
   */
  function normalizeRelativeURLs(doc, baseUrl) {
    const base = new URL(baseUrl);
    
    // Only process relative paths starting with ./ or ../ or empty
    // This matches Quartz's implementation: [href^="./"], [href^="../"], [href=""]
    doc.querySelectorAll('a[href^="./"], a[href^="../"], a[href=""]').forEach(link => {
      const href = link.getAttribute('href');
      if (href !== null && !href.startsWith('#') && !href.startsWith('mailto:')) {
        try {
          const rebased = new URL(href, base);
          // Only keep pathname + hash, not the full URL (no origin)
          link.setAttribute('href', rebased.pathname + rebased.hash);
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });

    // Process images - only relative paths
    doc.querySelectorAll('img[src^="./"], img[src^="../"], img[src=""]').forEach(img => {
      const src = img.getAttribute('src');
      if (src !== null && !src.startsWith('data:')) {
        try {
          const rebased = new URL(src, base);
          img.setAttribute('src', rebased.pathname + rebased.hash);
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });

    // Process stylesheets - only relative paths
    doc.querySelectorAll('link[rel="stylesheet"][href^="./"], link[rel="stylesheet"][href^="../"], link[rel="stylesheet"][href=""]').forEach(link => {
      const href = link.getAttribute('href');
      if (href !== null) {
        try {
          const rebased = new URL(href, base);
          link.setAttribute('href', rebased.pathname + rebased.hash);
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });
  }

  /**
   * Initialize popover for all internal links
   */
  function init() {
    const links = document.querySelectorAll('a.internal');
    links.forEach(link => {
      link.addEventListener('mouseenter', mouseEnterHandler);
      link.addEventListener('mouseleave', clearActivePopover);
    });

    console.log(`[Popover] Initialized for ${links.length} internal links`);
  }

  // Initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize when content changes (e.g., after wikilink processing)
  // Use MutationObserver to detect new links
  const observer = new MutationObserver((mutations) => {
    let hasNewLinks = false;
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.matches && node.matches('a.internal')) {
            hasNewLinks = true;
          } else if (node.querySelectorAll) {
            const newLinks = node.querySelectorAll('a.internal');
            if (newLinks.length > 0) {
              hasNewLinks = true;
            }
          }
        }
      });
    });

    if (hasNewLinks) {
      // Re-attach listeners to new links
      const newLinks = document.querySelectorAll('a.internal');
      newLinks.forEach(link => {
        // Remove old listeners (if any) to avoid duplicates
        link.removeEventListener('mouseenter', mouseEnterHandler);
        link.removeEventListener('mouseleave', clearActivePopover);
        // Add new listeners
        link.addEventListener('mouseenter', mouseEnterHandler);
        link.addEventListener('mouseleave', clearActivePopover);
      });
      console.log(`[Popover] Re-initialized for new links`);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();

