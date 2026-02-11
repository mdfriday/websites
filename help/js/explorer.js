/**
 * Explorer - File tree navigation component for Foundry themes
 * Based on Quartz Explorer component
 */

(function () {
  'use strict';

  let currentExplorerState = [];

  /**
   * Toggle explorer panel visibility (desktop/mobile)
   */
  function toggleExplorer() {
    const nearestExplorer = this.closest('.explorer');
    if (!nearestExplorer) {
      return;
    }

    const wasCollapsed = nearestExplorer.classList.contains('collapsed');
    const explorerCollapsed = nearestExplorer.classList.toggle('collapsed');
    
    nearestExplorer.setAttribute(
      'aria-expanded',
      nearestExplorer.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );

    if (!explorerCollapsed) {
      // Stop <html> from being scrollable when mobile explorer is open
      document.documentElement.classList.add('mobile-no-scroll');
    } else {
      document.documentElement.classList.remove('mobile-no-scroll');
    }
  }

  /**
   * Toggle folder open/closed state
   */
  function toggleFolder(evt) {
    evt.stopPropagation();
    const target = evt.target;
    if (!target) return;

    // Check if target was svg icon or button
    const isSvg = target.nodeName === 'svg' || target.nodeName === 'polyline';

    // Find the folder container
    let folderContainer;
    if (isSvg) {
      // svg -> div.folder-container
      folderContainer = target.closest('.folder-container');
    } else {
      // button.folder-button -> div -> div.folder-container
      folderContainer = target.parentElement?.parentElement;
    }

    if (!folderContainer) return;

    const childFolderContainer = folderContainer.nextElementSibling;
    if (!childFolderContainer) return;

    childFolderContainer.classList.toggle('open');

    // Update collapsed state
    const isCollapsed = !childFolderContainer.classList.contains('open');
    const folderPath = folderContainer.dataset.folderpath;

    const currentFolderState = currentExplorerState.find(
      (item) => item.path === folderPath
    );

    if (currentFolderState) {
      currentFolderState.collapsed = isCollapsed;
    } else {
      currentExplorerState.push({
        path: folderPath,
        collapsed: isCollapsed
      });
    }

    // Save state to localStorage
    try {
      localStorage.setItem('fileTree', JSON.stringify(currentExplorerState));
    } catch (e) {
      console.warn('Failed to save explorer state:', e);
    }
  }

  /**
   * Create a file node (leaf) in the tree
   */
  function createFileNode(currentPath, node) {
    const template = document.getElementById('template-file');
    if (!template) return null;

    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    const a = li.querySelector('a');

    a.href = node.url;
    a.dataset.for = node.slug;
    a.textContent = node.displayName || node.title;

    if (currentPath === node.slug || currentPath === node.url) {
      a.classList.add('active');
    }

    return li;
  }

  /**
   * Create a folder node (branch) in the tree
   */
  function createFolderNode(currentPath, node, opts) {
    const template = document.getElementById('template-folder');
    if (!template) return null;

    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    const folderContainer = li.querySelector('.folder-container');
    const titleContainer = folderContainer.querySelector('div');
    const folderOuter = li.querySelector('.folder-outer');
    const ul = folderOuter.querySelector('ul');

    const folderPath = node.slug || node.url;
    folderContainer.dataset.folderpath = folderPath;

    if (currentPath === folderPath) {
      folderContainer.classList.add('active');
    }

    // Set folder title
    if (opts.folderClickBehavior === 'link') {
      // Replace button with link
      const button = titleContainer.querySelector('.folder-button');
      const a = document.createElement('a');
      a.href = node.url;
      a.dataset.for = folderPath;
      a.className = 'folder-title';
      a.textContent = node.displayName || node.title;
      button.replaceWith(a);
    } else {
      const span = titleContainer.querySelector('.folder-title');
      span.textContent = node.displayName || node.title;
    }

    // Check if folder should be collapsed
    const savedState = currentExplorerState.find((item) => item.path === folderPath);
    const isCollapsed = savedState?.collapsed ?? (opts.folderDefaultState === 'collapsed');

    // Check if this folder is a prefix of current path
    const simpleFolderPath = folderPath.replace(/\/index$/, '').replace(/\/$/, '');
    const simpleCurrentPath = currentPath.replace(/\/index$/, '').replace(/\/$/, '');
    const folderIsPrefixOfCurrentSlug = simpleCurrentPath.startsWith(simpleFolderPath + '/') || simpleCurrentPath === simpleFolderPath;

    // Open folder if it's in the current path
    if (!isCollapsed || folderIsPrefixOfCurrentSlug) {
      folderOuter.classList.add('open');
    }

    // Add children recursively
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const childNode = child.isFolder
          ? createFolderNode(currentPath, child, opts)
          : createFileNode(currentPath, child);
        if (childNode) {
          ul.appendChild(childNode);
        }
      }
    }

    return li;
  }

  /**
   * Sort tree nodes according to Quartz sorting rules
   * Folders first, then files, alphabetically within each type
   * Based on Quartz Explorer.tsx sortFn (lines 32-48)
   */
  function sortTree(node) {
    if (!node.children || node.children.length === 0) return;

    // Sort children: folders first, then files, alphabetically within each type
    node.children.sort((a, b) => {
      // Both folders or both files: alphabetical sort
      if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,      // "1" < "2" < "10"
          sensitivity: 'base' // a = á = A
        });
      }

      // a is file, b is folder: b comes first (folders before files)
      if (!a.isFolder && b.isFolder) {
        return 1;
      }

      // a is folder, b is file: a comes first
      return -1;
    });

    // Recursively sort all children
    node.children.forEach(child => sortTree(child));
  }

  /**
   * Filter function to exclude taxonomy pages and special folders
   * Based on Quartz Explorer.tsx filterFn (line 49)
   */
  function shouldExcludePage(page) {
    const slug = page.slug || page.displayPath || '';
    const segments = slug.split('/').filter(s => s);
    
    if (segments.length === 0) return false;
    
    // Exclude taxonomy folders (tags, category, etc.)
    // Match Quartz: node.slugSegment !== "tags"
    const firstSegment = segments[0];
    if (firstSegment === 'tags' || firstSegment === 'category' || firstSegment === 'categories') {
      return true;
    }
    
    return false;
  }

  /**
   * Check if a page is a folder index page (like Quartz fileTrie line 71-75)
   * Folder index pages should attach to folder node, not create separate child
   */
  function isFolderIndexPage(page, segments) {
    // Check if this page represents a folder
    // In Hugo/Foundry, folder pages have paths like "advanced" (for advanced/_index.md)
    // They should not appear as children of the folder
    
    // If slug equals the folder path (e.g., "advanced"), it's a folder index
    // Children would have paths like "advanced/something"
    
    // This is heuristic: if there are other pages that start with this path + "/",
    // then this is a folder index page
    return segments.length > 0; // Will be determined during tree building
  }

  /**
   * Build file tree from pages data
   * This function constructs a tree structure from flat page data
   * Based on Quartz FileTrieNode structure
   */
  function buildFileTree(pages, currentPath) {
    const tree = {
      children: [],
      isFolder: true,
      slug: '',
      url: '/',
      displayName: 'Root'
    };

    // Filter out taxonomy pages before building tree (matching Quartz behavior)
    const filteredPages = pages.filter(page => !shouldExcludePage(page));

    // Build index of folders (for matching section pages)
    const folders = new Map();
    
    // First pass: identify folder index pages vs regular pages
    // This mimics Quartz fileTrie logic where "index" files attach to folder node
    const folderIndexPages = new Map(); // Map<folderPath, pageData>
    const regularPages = [];
    
    for (const page of filteredPages) {
      const displayPath = page.displayPath || page.slug || '';
      const segments = displayPath.split('/').filter(s => s);
      
      if (segments.length === 0) {
        // Root page
        regularPages.push(page);
        continue;
      }
      
      // Check if this is a folder index by looking for children
      // A page is a folder index if other pages have it as a prefix
      let hasChildren = false;
      for (const otherPage of filteredPages) {
        if (otherPage === page) continue;
        
        const otherPath = otherPage.displayPath || otherPage.slug || '';
        // Check if otherPage is a child of this page
        if (otherPath.startsWith(displayPath + '/')) {
          hasChildren = true;
          break;
        }
      }
      
      if (hasChildren) {
        // This is a folder index page (like "advanced" which has "advanced/architecture")
        folderIndexPages.set(displayPath, page);
      } else {
        // This is a regular page
        regularPages.push(page);
      }
    }

    // Second pass: build tree structure using ONLY regular pages
    // Folder index pages will be attached to their folder nodes, not as children
    for (const page of regularPages) {
      const displayPath = page.displayPath || page.slug || '';
      const segments = displayPath.split('/').filter(s => s);

      if (segments.length === 0) {
        // Root page (index)
        tree.children.push({
          isFolder: false,
          slug: page.slug,
          url: page.url,
          title: page.title || 'Index',
          displayName: page.title || 'Index'
        });
        continue;
      }

      let currentLevel = tree.children;
      let currentFolderPath = '';

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentFolderPath += (i === 0 ? '' : '/') + segment;

        const isLastSegment = i === segments.length - 1;

        if (isLastSegment) {
          // This is the page itself
          currentLevel.push({
            isFolder: false,
            slug: page.slug,
            url: page.url,
            title: page.title || segment,
            displayName: page.title || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          });
        } else {
          // This is a folder - check if we already created it
          let folder = folders.get(currentFolderPath);

          if (!folder) {
            // Check if there's a folder index page for this folder
            // Matching Quartz fileTrie line 71-75: if segment === "index", attach data to folder
            const indexPage = folderIndexPages.get(currentFolderPath);
            
            folder = {
              isFolder: true,
              slug: currentFolderPath,
              url: indexPage ? indexPage.url : (currentFolderPath + '/'),
              title: indexPage ? indexPage.title : segment,
              displayName: indexPage 
                ? indexPage.title 
                : segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              children: []
            };
            folders.set(currentFolderPath, folder);
            currentLevel.push(folder);
          }

          currentLevel = folder.children;
        }
      }
    }

    // Apply Quartz-style sorting: folders first, then files, alphabetically
    sortTree(tree);

    return tree;
  }

  /**
   * Setup explorer with page data
   */
  function setupExplorer() {
    const explorer = document.querySelector('.explorer');
    if (!explorer) {
      console.warn('[Explorer] No .explorer element found');
      return;
    }
    
    // Mobile should start with explorer collapsed to avoid animation on page load
    // Add collapsed class for mobile views only
    // This must happen synchronously before rendering to avoid animation
    if (window.innerWidth < 800 && !explorer.classList.contains('collapsed')) {
      explorer.classList.add('collapsed');
      explorer.setAttribute('aria-expanded', 'false');
    }

    const currentPath = window.location.pathname;

    // Get options from data attributes
    const opts = {
      folderClickBehavior: explorer.dataset.behavior || 'link',
      folderDefaultState: explorer.dataset.collapsed || 'collapsed',
      useSavedState: explorer.dataset.savestate === 'true'
    };

    // Load saved state from localStorage
    if (opts.useSavedState) {
      try {
        const storageTree = localStorage.getItem('fileTree');
        if (storageTree) {
          currentExplorerState = JSON.parse(storageTree);
        }
      } catch (e) {
        console.warn('[Explorer] Failed to load explorer state:', e);
        currentExplorerState = [];
      }
    }

    // Get page data (injected by theme)
    const pages = window.__FOUNDRY_PAGES__ || [];

    if (pages.length === 0) {
      console.warn('[Explorer] No pages data available');
      return;
    }

    // Build file tree
    const tree = buildFileTree(pages, currentPath);

    // Render tree
    const explorerUl = explorer.querySelector('.explorer-ul');
    if (!explorerUl) {
      console.warn('[Explorer] No .explorer-ul element found');
      return;
    }

    // Clear existing content
    explorerUl.innerHTML = '';

    // Create and insert new content
    const fragment = document.createDocumentFragment();
    for (const child of tree.children) {
      const node = child.isFolder
        ? createFolderNode(currentPath, child, opts)
        : createFileNode(currentPath, child);

      if (node) {
        fragment.appendChild(node);
      }
    }
    explorerUl.appendChild(fragment);

    // Restore scroll position
    try {
      const scrollTop = sessionStorage.getItem('explorerScrollTop');
      if (scrollTop) {
        explorerUl.scrollTop = parseInt(scrollTop);
      } else {
        // Scroll to active element
        const activeElement = explorerUl.querySelector('.active');
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (e) {
      // Ignore errors
    }

    // Setup event handlers
    const explorerButtons = explorer.querySelectorAll('.explorer-toggle');
    explorerButtons.forEach(button => {
      button.addEventListener('click', toggleExplorer);
    });

    // Log mobile explorer visibility
    const mobileExplorer = explorer.querySelector('.mobile-explorer');

    // Setup folder click handlers
    if (opts.folderClickBehavior === 'collapse') {
      const folderButtons = explorer.querySelectorAll('.folder-button');
      folderButtons.forEach(button => {
        button.addEventListener('click', toggleFolder);
      });
    }

    const folderIcons = explorer.querySelectorAll('.folder-icon');
    folderIcons.forEach(icon => {
      icon.addEventListener('click', toggleFolder);
    });

    // Remove hide-until-loaded class (reuse mobileExplorer from above)
    if (mobileExplorer) {
      mobileExplorer.classList.remove('hide-until-loaded');
    }
  }

  /**
   * Save scroll position before navigation
   */
  function saveScrollPosition() {
    const explorerUl = document.querySelector('.explorer-ul');
    if (explorerUl) {
      try {
        sessionStorage.setItem('explorerScrollTop', explorerUl.scrollTop.toString());
      } catch (e) {
        // Ignore errors
      }
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    const explorer = document.querySelector('.explorer');
    if (!explorer) return;
    
    const isCollapsed = explorer.classList.contains('collapsed');
    const mobileExplorer = explorer.querySelector('.mobile-explorer');
    const isMobileView = mobileExplorer ? window.getComputedStyle(mobileExplorer).display !== 'none' : false;

    if (explorer && !isCollapsed) {
      document.documentElement.classList.add('mobile-no-scroll');
    } else {
      document.documentElement.classList.remove('mobile-no-scroll');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupExplorer);
  } else {
    setupExplorer();
  }

  // Save scroll position before leaving page
  window.addEventListener('beforeunload', saveScrollPosition);

  // Handle window resize
  window.addEventListener('resize', handleResize);

  /**
   * Auto-collapse explorer on mobile after navigation
   * Matches Quartz behavior: when user clicks a link on mobile,
   * the explorer should close automatically
   */
  document.addEventListener('DOMContentLoaded', function() {

    // Listen for clicks on explorer links (use capture phase to intercept early)
    document.addEventListener('click', function(e) {

      // Check if click was on an explorer link or its child
      const link = e.target.closest('.explorer a');
      if (!link) {
        return;
      }
      
      // Check if we're on mobile (hamburger menu visible)
      const explorer = document.querySelector('.explorer');
      if (!explorer) {
        return;
      }

      const mobileExplorer = explorer.querySelector('.mobile-explorer');
      if (!mobileExplorer) {
        return;
      }

      // Check if mobile explorer button is visible (using getComputedStyle)
      const styles = window.getComputedStyle(mobileExplorer);
      const isMobileView = styles.display !== 'none';
      const isCollapsed = explorer.classList.contains('collapsed');

      if (isMobileView && !isCollapsed) {
        // Explorer is open on mobile - collapse it before navigation
        explorer.classList.add('collapsed');
        explorer.setAttribute('aria-expanded', 'false');
        
        // Allow <html> to be scrollable again
        document.documentElement.classList.remove('mobile-no-scroll');
      } else {
        console.error('[Explorer Mobile] ❌ Conditions NOT met - not collapsing:', {
          reason: !isMobileView ? 'Not mobile view' : 'Explorer already collapsed'
        });
      }
    }, true); // Use capture phase (true) to run before the navigation
  });
})();

