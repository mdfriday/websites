/**
 * Mermaid Client-Side Rendering Script with Pan-Zoom Support
 * Based on Quartz's mermaid implementation
 * Reference: quartz-src/quartz/components/scripts/mermaid.inline.ts
 * 
 * Features:
 * - Render mermaid diagrams
 * - Full-screen expand view
 * - Pan and zoom support
 * - Control buttons (+, -, Reset)
 */

(function() {
  'use strict';
  
  let mermaidLoaded = false;
  let mermaid = null;
  
  /**
   * Pan-Zoom controller for diagram interaction
   */
  class DiagramPanZoom {
    constructor(container, content) {
      this.container = container;
      this.content = content;
      this.isDragging = false;
      this.startPan = { x: 0, y: 0 };
      this.currentPan = { x: 0, y: 0 };
      this.scale = 1;
      this.MIN_SCALE = 0.5;
      this.MAX_SCALE = 3;
      this.cleanups = [];
      
      this.setupEventListeners();
      this.setupNavigationControls();
      this.resetTransform();
    }
    
    setupEventListeners() {
      const mouseDownHandler = this.onMouseDown.bind(this);
      const mouseMoveHandler = this.onMouseMove.bind(this);
      const mouseUpHandler = this.onMouseUp.bind(this);
      const touchStartHandler = this.onTouchStart.bind(this);
      const touchMoveHandler = this.onTouchMove.bind(this);
      const touchEndHandler = this.onTouchEnd.bind(this);
      const resizeHandler = this.resetTransform.bind(this);
      
      this.container.addEventListener('mousedown', mouseDownHandler);
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      this.container.addEventListener('touchstart', touchStartHandler, { passive: false });
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('touchend', touchEndHandler);
      window.addEventListener('resize', resizeHandler);
      
      this.cleanups.push(
        () => this.container.removeEventListener('mousedown', mouseDownHandler),
        () => document.removeEventListener('mousemove', mouseMoveHandler),
        () => document.removeEventListener('mouseup', mouseUpHandler),
        () => this.container.removeEventListener('touchstart', touchStartHandler),
        () => document.removeEventListener('touchmove', touchMoveHandler),
        () => document.removeEventListener('touchend', touchEndHandler),
        () => window.removeEventListener('resize', resizeHandler)
      );
    }
    
    setupNavigationControls() {
      const controls = document.createElement('div');
      controls.className = 'mermaid-controls';
      
      const zoomIn = this.createButton('+', () => this.zoom(0.1));
      const zoomOut = this.createButton('-', () => this.zoom(-0.1));
      const resetBtn = this.createButton('Reset', () => this.resetTransform());
      
      controls.appendChild(zoomOut);
      controls.appendChild(resetBtn);
      controls.appendChild(zoomIn);
      
      this.container.appendChild(controls);
    }
    
    createButton(text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.className = 'mermaid-control-button';
      button.addEventListener('click', onClick);
      this.cleanups.push(() => button.removeEventListener('click', onClick));
      return button;
    }
    
    onMouseDown(e) {
      if (e.button !== 0) return;
      this.isDragging = true;
      this.startPan = { x: e.clientX - this.currentPan.x, y: e.clientY - this.currentPan.y };
      this.container.style.cursor = 'grabbing';
    }
    
    onMouseMove(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      this.currentPan = {
        x: e.clientX - this.startPan.x,
        y: e.clientY - this.startPan.y
      };
      this.updateTransform();
    }
    
    onMouseUp() {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    }
    
    onTouchStart(e) {
      if (e.touches.length !== 1) return;
      this.isDragging = true;
      const touch = e.touches[0];
      this.startPan = { x: touch.clientX - this.currentPan.x, y: touch.clientY - this.currentPan.y };
    }
    
    onTouchMove(e) {
      if (!this.isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      const touch = e.touches[0];
      this.currentPan = {
        x: touch.clientX - this.startPan.x,
        y: touch.clientY - this.startPan.y
      };
      this.updateTransform();
    }
    
    onTouchEnd() {
      this.isDragging = false;
    }
    
    zoom(delta) {
      const newScale = Math.min(Math.max(this.scale + delta, this.MIN_SCALE), this.MAX_SCALE);
      const rect = this.content.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scaleDiff = newScale - this.scale;
      
      this.currentPan.x -= centerX * scaleDiff;
      this.currentPan.y -= centerY * scaleDiff;
      this.scale = newScale;
      this.updateTransform();
    }
    
    updateTransform() {
      this.content.style.transform = `translate(${this.currentPan.x}px, ${this.currentPan.y}px) scale(${this.scale})`;
    }
    
    resetTransform() {
      const svg = this.content.querySelector('svg');
      if (!svg) return;
      
      const rect = svg.getBoundingClientRect();
      const width = rect.width / this.scale;
      const height = rect.height / this.scale;
      
      this.scale = 1;
      this.currentPan = {
        x: (this.container.clientWidth - width) / 2,
        y: (this.container.clientHeight - height) / 2
      };
      this.updateTransform();
    }
    
    cleanup() {
      this.cleanups.forEach(fn => fn());
    }
  }
  
  /**
   * Load Mermaid library from CDN
   */
  async function loadMermaid() {
    if (mermaidLoaded) {
      return mermaid;
    }
    
    try {
      const module = await import('https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs');
      mermaid = module.default;
      mermaidLoaded = true;
      return mermaid;
    } catch (error) {
      console.error('Failed to load Mermaid:', error);
      return null;
    }
  }
  
  /**
   * Get CSS variables for theming
   */
  function getCSSVars() {
    const cssVars = [
      '--secondary', '--tertiary', '--gray', '--light', '--lightgray',
      '--highlight', '--dark', '--darkgray', '--codeFont'
    ];
    
    const computedStyleMap = {};
    cssVars.forEach(function(key) {
      computedStyleMap[key] = window.getComputedStyle(document.documentElement).getPropertyValue(key);
    });
    
    return computedStyleMap;
  }
  
  /**
   * Check if dark mode is enabled
   */
  function isDarkMode() {
    const savedTheme = document.documentElement.getAttribute('saved-theme');
    const dataTheme = document.documentElement.getAttribute('data-theme');
    return savedTheme === 'dark' || dataTheme === 'dark';
  }
  
  /**
   * Remove all children from element
   */
  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  
  /**
   * Setup expand/collapse functionality for a mermaid diagram
   */
  function setupExpandButton(codeBlock, expandBtn, popupContainer) {
    let panZoom = null;
    
    function showMermaid() {
      const container = popupContainer.querySelector('#mermaid-space');
      const content = popupContainer.querySelector('.mermaid-content');
      if (!content || !container) return;
      
      removeAllChildren(content);
      
      // Clone the mermaid SVG
      const svg = codeBlock.querySelector('svg');
      if (!svg) return;
      
      const mermaidContent = svg.cloneNode(true);
      content.appendChild(mermaidContent);
      
      // Show container
      popupContainer.classList.add('active');
      container.style.cursor = 'grab';
      
      // Initialize pan-zoom
      panZoom = new DiagramPanZoom(container, content);
    }
    
    function hideMermaid() {
      popupContainer.classList.remove('active');
      if (panZoom) {
        panZoom.cleanup();
        panZoom = null;
      }
    }
    
    // Expand button click
    expandBtn.addEventListener('click', showMermaid);
    
    // ESC key to close
    function escapeHandler(e) {
      if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
        hideMermaid();
      }
    }
    document.addEventListener('keydown', escapeHandler);
    
    // Click outside to close
    popupContainer.addEventListener('click', function(e) {
      if (e.target === popupContainer) {
        hideMermaid();
      }
    });
    
    return {
      cleanup: function() {
        expandBtn.removeEventListener('click', showMermaid);
        document.removeEventListener('keydown', escapeHandler);
        if (panZoom) {
          panZoom.cleanup();
        }
      }
    };
  }
  
  /**
   * Render all mermaid diagrams
   */
  async function renderMermaid() {
    const mermaidBlocks = document.querySelectorAll('code.mermaid');
    
    if (mermaidBlocks.length === 0) {
      return;
    }
    
    const mermaidLib = await loadMermaid();
    if (!mermaidLib) {
      console.error('Mermaid library could not be loaded');
      return;
    }
    
    const styleMap = getCSSVars();
    const darkMode = isDarkMode();
    
    mermaidLib.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: darkMode ? 'dark' : 'base',
      themeVariables: {
        fontFamily: styleMap['--codeFont'],
        primaryColor: styleMap['--light'],
        primaryTextColor: styleMap['--darkgray'],
        primaryBorderColor: styleMap['--tertiary'],
        lineColor: styleMap['--darkgray'],
        secondaryColor: styleMap['--secondary'],
        tertiaryColor: styleMap['--tertiary'],
        clusterBkg: styleMap['--light'],
        edgeLabelBackground: styleMap['--highlight'],
      },
    });
    
    mermaidBlocks.forEach(function(block) {
      block.removeAttribute('data-processed');
    });
    
    try {
      await mermaidLib.run({ nodes: mermaidBlocks });
      
      // Setup expand buttons for each diagram
      mermaidBlocks.forEach(function(codeBlock) {
        codeBlock.classList.add('mermaid-rendered');
        
        const pre = codeBlock.parentElement;
        const clipboardBtn = pre.querySelector('.clipboard-button');
        const expandBtn = pre.querySelector('.expand-button');
        const popupContainer = pre.querySelector('#mermaid-container');
        
        if (expandBtn) {
          // Adjust expand button position to not overlap with clipboard button
          if (clipboardBtn) {
            const clipboardStyle = window.getComputedStyle(clipboardBtn);
            const clipboardWidth = 
              clipboardBtn.offsetWidth +
              parseFloat(clipboardStyle.marginLeft || '0') +
              parseFloat(clipboardStyle.marginRight || '0');
            
            // Set expand button position (same as Quartz)
            expandBtn.style.right = 'calc(' + clipboardWidth + 'px + 0.3rem)';
          }
          
          // Move expand button to beginning of pre (for proper z-index)
          pre.prepend(expandBtn);
        }
        
        if (expandBtn && popupContainer) {
          setupExpandButton(codeBlock, expandBtn, popupContainer);
        }
      });
    } catch (error) {
      console.error('Error rendering mermaid diagrams:', error);
    }
  }
  
  /**
   * Initialize
   */
  function init() {
    renderMermaid();
    
    // Re-render on theme change
    document.addEventListener('themechange', renderMermaid);
    
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'data-theme' || 
             mutation.attributeName === 'saved-theme')) {
          renderMermaid();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'saved-theme'],
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
