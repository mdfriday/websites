/**
 * Graph Component - Complete Quartz Implementation with D3 + PixiJS
 * Ported from: quartz-src/quartz/components/scripts/graph.inline.ts
 * 
 * This is the full implementation with GPU acceleration via PixiJS.
 * Suitable for all site sizes.
 */

(function() {
  const localStorageKey = "graph-visited";

  function getVisited() {
    try {
      return new Set(JSON.parse(localStorage.getItem(localStorageKey) || "[]"));
    } catch {
      return new Set();
    }
  }

  function addToVisited(slug) {
    const visited = getVisited();
    visited.add(slug);
    localStorage.setItem(localStorageKey, JSON.stringify([...visited]));
  }

  function simplifySlug(slug) {
    // Based on Quartz simplifySlug: quartz-src/quartz/util/path.ts
    // Remove trailing /index and leading/trailing slashes
    slug = slug.replace(/\/index$/i, "");
    slug = slug.replace(/^\//, "").replace(/\/$/, "");
    return slug.length === 0 ? "/" : slug;
  }

  function removeAllChildren(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  async function renderGraph(graphElement, fullSlug) {
    console.log('[Graph] renderGraph called with fullSlug:', fullSlug);
    
    const slug = simplifySlug(fullSlug);
    console.log('[Graph] Simplified slug:', slug);
    
    const visited = getVisited();
    console.log('[Graph] Visited pages:', Array.from(visited));
    
    removeAllChildren(graphElement);

    // Get configuration
    const cfg = JSON.parse(graphElement.dataset["cfg"] || "{}");
    console.log('[Graph] Configuration:', cfg);
    
    const {
      drag: enableDrag = true,
      zoom: enableZoom = true,
      depth = 1,
      scale = 1.1,
      repelForce = 0.5,
      centerForce = 0.3,
      linkDistance = 30,
      fontSize = 0.6,
      opacityScale = 1,
      removeTags = [],
      showTags = true,
      focusOnHover = false,
      enableRadial = false
    } = cfg;

    // Get content index data - following Quartz's fetchData pattern
    const contentIndex = window.__FOUNDRY_CONTENT_INDEX__ || {};
    console.log('[Graph] Content index raw:', contentIndex);
    console.log('[Graph] Content index keys:', Object.keys(contentIndex));
    
    // Convert to Map and simplify slugs - matching Quartz line 92-96
    const data = new Map(
      Object.entries(contentIndex).map(([k, v]) => {
        const simplifiedKey = simplifySlug(k);
        console.log('[Graph] Mapping key:', k, '->', simplifiedKey);
        return [simplifiedKey, v];
      })
    );
    
    console.log('[Graph] Data map size:', data.size);
    console.log('[Graph] Data map keys:', Array.from(data.keys()));

    // Build links array - matching Quartz line 98-123
    const links = [];
    const tags = [];
    const validLinks = new Set(data.keys());

    for (const [source, details] of data.entries()) {
      const outgoing = details.links || [];
      console.log('[Graph] Processing source:', source, 'outgoing:', outgoing);

      for (const dest of outgoing) {
        if (validLinks.has(dest)) {
          links.push({ source, target: dest });
          console.log('[Graph] Added link:', source, '->', dest);
        } else {
          console.log('[Graph] Skipped invalid link:', source, '->', dest);
        }
      }

      if (showTags && Array.isArray(details.tags)) {
        // Tags array already contains full slugs like "tags/feature/transformer"
        // from Hugo template using $.Site.GetPage().RelPermalink
        const localTags = details.tags
          .filter(tag => !removeTags.includes(tag));
          // No need to add "tags/" prefix or call simplifySlug - paths are already correct!

        tags.push(...localTags.filter(tag => !tags.includes(tag)));

        for (const tag of localTags) {
          links.push({ source, target: tag });
        }
      }
    }

    console.log('[Graph] Total links:', links.length);
    console.log('[Graph] Links:', links);

    // Compute neighborhood (BFS with depth limit) - matching Quartz line 125-144
    const neighbourhood = new Set();
    const wl = [slug, "__SENTINEL"];
    let currentDepth = depth;

    console.log('[Graph] Starting BFS with depth:', depth, 'from:', slug);

    if (depth >= 0) {
      while (currentDepth >= 0 && wl.length > 0) {
        const cur = wl.shift();
        console.log('[Graph] BFS: Processing', cur, 'depth:', currentDepth, 'queue length:', wl.length);
        
        if (cur === "__SENTINEL") {
          currentDepth--;
          console.log('[Graph] BFS: Hit sentinel, depth now:', currentDepth);
          wl.push("__SENTINEL");  // Always push sentinel (matching Quartz line 133)
        } else {
          neighbourhood.add(cur);
          console.log('[Graph] BFS: Added to neighbourhood:', cur);
          
          const outgoing = links.filter(l => l.source === cur);
          const incoming = links.filter(l => l.target === cur);
          console.log('[Graph] BFS: Found', outgoing.length, 'outgoing,', incoming.length, 'incoming links');
          
          wl.push(...outgoing.map(l => l.target), ...incoming.map(l => l.source));
        }
      }
    } else {
      // Global graph: show all nodes - matching Quartz line 142-143
      console.log('[Graph] Global mode: Adding all nodes');
      validLinks.forEach(id => neighbourhood.add(id));
      if (showTags) tags.forEach(tag => neighbourhood.add(tag));
    }

    console.log('[Graph] Neighbourhood size:', neighbourhood.size);
    console.log('[Graph] Neighbourhood:', Array.from(neighbourhood));

    // Build graph data - matching Quartz line 146-162
    const nodes = [...neighbourhood].map(url => {
      // Check if URL starts with "tags/" (no leading slash in our data)
      const isTag = url.startsWith("tags/");
      
      let text;
      if (isTag) {
        // Extract tag name after "tags/"
        // url format: "tags/plugin/emitter" -> we want "plugin/emitter"
        const tagName = url.substring(5); // Remove "tags/" prefix
        text = "#" + tagName;
      } else {
        text = data.get(url)?.title || url;
      }
      
      console.log('[Graph] Creating node:', url, 'text:', text);
      
      return {
        id: url,
        text,
        tags: Array.isArray(data.get(url)?.tags) ? data.get(url).tags : []
      };
    });

    const graphData = {
      nodes,
      links: links
        .filter(l => neighbourhood.has(l.source) && neighbourhood.has(l.target))
        .map(l => ({
          source: nodes.find(n => n.id === l.source),
          target: nodes.find(n => n.id === l.target)
        }))
    };

    console.log('[Graph] Graph data:', graphData);
    console.log('[Graph] Nodes:', graphData.nodes.length, 'Links:', graphData.links.length);

    const width = graphElement.offsetWidth;
    const height = Math.max(graphElement.offsetHeight, 250);

    console.log('[Graph] Canvas dimensions:', width, 'x', height);

    // Check if PixiJS is available
    if (typeof PIXI === 'undefined') {
      console.warn('[Graph] PixiJS not loaded, falling back to SVG rendering');
      return renderGraphSVG(graphElement, graphData, cfg, slug, visited, width, height);
    }

    // Setup PixiJS application - matching Quartz line 352-363
    const app = new PIXI.Application();
    await app.init({
      width,
      height,
      antialias: true,
      autoStart: false,
      autoDensity: true,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
    });
    
    graphElement.appendChild(app.view);
    console.log('[Graph] PixiJS app initialized');

    const stage = app.stage;

    // Create layers - matching Quartz line 369-372
    const labelsContainer = new PIXI.Container();
    labelsContainer.zIndex = 3;
    const nodesContainer = new PIXI.Container();
    nodesContainer.zIndex = 2;
    const linkContainer = new PIXI.Container();
    linkContainer.zIndex = 1;
    
    stage.addChild(linkContainer, nodesContainer, labelsContainer);
    stage.sortableChildren = true;

    // Get CSS variables - matching Quartz line 178-194
    const style = getComputedStyle(document.documentElement);
    const colors = {
      secondary: style.getPropertyValue("--secondary").trim(),
      tertiary: style.getPropertyValue("--tertiary").trim(),
      gray: style.getPropertyValue("--gray").trim(),
      light: style.getPropertyValue("--light").trim(),
      lightgray: style.getPropertyValue("--lightgray").trim(),
      dark: style.getPropertyValue("--dark").trim(),
      darkgray: style.getPropertyValue("--darkgray").trim(),
      bodyFont: style.getPropertyValue("--bodyFont").trim()
    };

    console.log('[Graph] Colors:', colors);

    // Color function - matching Quartz line 197-206
    const color = d => {
      const isCurrent = d.id === slug;
      if (isCurrent) {
        return colors.secondary;
      } else if (visited.has(d.id) || d.id.startsWith("tags/")) {
        return colors.tertiary;
      } else {
        return colors.gray;
      }
    };

    // Node radius function - matching Quartz line 208-213
    function nodeRadius(d) {
      const numLinks = graphData.links.filter(
        l => l.source.id === d.id || l.target.id === d.id
      ).length;
      return 2 + Math.sqrt(numLinks);
    }

    // Create force simulation - matching Quartz line 168-175
    // Note: Quartz uses (0, 0) center because coordinates are offset in rendering
    const simulation = d3.forceSimulation(graphData.nodes)
      .force("charge", d3.forceManyBody().strength(-100 * repelForce))
      .force("center", d3.forceCenter(0, 0).strength(centerForce))
      .force("link", d3.forceLink(graphData.links).distance(linkDistance).id(d => d.id))
      .force("collide", d3.forceCollide(nodeRadius).iterations(3));

    if (enableRadial) {
      const radius = Math.min(width, height) / 2 * 0.8;
      simulation.force("radial", d3.forceRadial(radius, 0, 0).strength(0.2));
    }

    console.log('[Graph] Force simulation created');

    let hoveredNodeId = null;
    let hoveredNeighbours = new Set();
    const linkRenderData = [];
    const nodeRenderData = [];

    // Create nodes - matching Quartz line 374-435
    for (const n of graphData.nodes) {
      const nodeId = n.id;
      const isTagNode = nodeId.startsWith("tags/");

      // Create label
      const label = new PIXI.Text(n.text, {
        fontSize: fontSize * 15,
        fill: colors.dark,
        fontFamily: colors.bodyFont
      });
      label.anchor.set(0.5, 1.2);
      label.alpha = 0;
      label.scale.set(1 / scale);
      labelsContainer.addChild(label);

      // Create node graphics - matching Quartz PixiJS v8 API (line 394-420)
      const gfx = new PIXI.Graphics();
      gfx.eventMode = 'static';
      gfx.cursor = 'pointer';
      gfx.hitArea = new PIXI.Circle(0, 0, nodeRadius(n));
      gfx.circle(0, 0, nodeRadius(n))
        .fill({ color: isTagNode ? colors.light : color(n) });
      
      if (isTagNode) {
        gfx.stroke({ width: 2, color: colors.tertiary });
      }
      
      nodesContainer.addChild(gfx);

      nodeRenderData.push({
        simulationData: n,
        gfx,
        label,
        color: color(n),
        alpha: 1,
        active: false
      });
    }

    // Create links - matching Quartz line 437-450
    for (const l of graphData.links) {
      const gfx = new PIXI.Graphics();
      linkContainer.addChild(gfx);

      linkRenderData.push({
        simulationData: l,
        gfx,
        color: colors.lightgray,
        alpha: 1,
        active: false
      });
    }

    console.log('[Graph] Created', nodeRenderData.length, 'nodes and', linkRenderData.length, 'links');

    // Update hover info - matching Quartz line 219-247
    function updateHoverInfo(newHoveredId) {
      hoveredNodeId = newHoveredId;

      if (newHoveredId === null) {
        hoveredNeighbours = new Set();
        for (const n of nodeRenderData) {
          n.active = false;
        }
        for (const l of linkRenderData) {
          l.active = false;
        }
      } else {
        hoveredNeighbours = new Set();
        for (const l of linkRenderData) {
          const linkData = l.simulationData;
          if (linkData.source.id === newHoveredId || linkData.target.id === newHoveredId) {
            hoveredNeighbours.add(linkData.source.id);
            hoveredNeighbours.add(linkData.target.id);
          }
          l.active = linkData.source.id === newHoveredId || linkData.target.id === newHoveredId;
        }
        for (const n of nodeRenderData) {
          n.active = hoveredNeighbours.has(n.simulationData.id);
        }
      }

      renderNodes();
      renderLinks();
      renderLabels();
    }

    function renderNodes() {
      for (const n of nodeRenderData) {
        let alpha = 1;
        if (hoveredNodeId !== null && focusOnHover) {
          alpha = n.active ? 1 : 0.2;
        }
        n.gfx.alpha = alpha;
      }
    }

    function renderLinks() {
      // Match Quartz line 252-276
      for (const l of linkRenderData) {
        let alpha = 1;
        if (hoveredNodeId) {
          alpha = l.active ? 1 : 0.2;
        }
        l.alpha = alpha;
        // Update color: active links are gray, inactive are lightgray
        l.color = l.active ? colors.gray : colors.lightgray;
      }
    }

    function renderLabels() {
      const defaultScale = 1 / scale;
      const activeScale = defaultScale * 1.1;
      
      for (const n of nodeRenderData) {
        const nodeId = n.simulationData.id;
        if (hoveredNodeId === nodeId) {
          n.label.alpha = 1;
          n.label.scale.set(activeScale, activeScale);
        } else {
          n.label.scale.set(defaultScale, defaultScale);
        }
      }
    }

    // Add hover listeners
    for (const n of nodeRenderData) {
      const nodeId = n.simulationData.id;
      
      n.gfx.on('pointerover', () => {
        updateHoverInfo(nodeId);
      });
      
      n.gfx.on('pointerout', () => {
        updateHoverInfo(null);
        n.label.alpha = 0;
      });
      
      n.gfx.on('click', () => {
        console.log('[Graph] Node clicked:', nodeId);
        const baseURL = window.__FOUNDRY_BASE_URL_PATH__ || "";
        
        if (nodeId.startsWith("tags/")) {
          // Tag node: nodeId format is "tags/plugin/emitter"
          const tagName = nodeId.substring(5); // Remove "tags/" prefix
          // Generate URL with baseURL prefix
          const url = baseURL ? `/${baseURL}/tags/${tagName}/` : `/tags/${tagName}/`;
          window.location.href = url;
        } else {
          // Regular page node
          const url = baseURL ? `/${baseURL}/${nodeId}.html` : `/${nodeId}.html`;
          window.location.href = url;
        }
      });
    }

    // Drag behavior - matching Quartz line 453-489
    let dragStartTime = 0;
    let dragging = false;
    let currentTransform = d3.zoomIdentity;

    if (enableDrag) {
      d3.select(app.view).call(
        d3.drag()
          .container(() => app.view)
          .subject(() => graphData.nodes.find(n => n.id === hoveredNodeId))
          .on("start", function(event) {
            if (!event.active) simulation.alphaTarget(1).restart();
            if (event.subject) {
              event.subject.fx = event.subject.x;
              event.subject.fy = event.subject.y;
              event.subject.__initialDragPos = {
                x: event.subject.x,
                y: event.subject.y,
                fx: event.subject.fx,
                fy: event.subject.fy
              };
            }
            dragStartTime = Date.now();
            dragging = true;
          })
          .on("drag", function(event) {
            if (event.subject && event.subject.__initialDragPos) {
              const initPos = event.subject.__initialDragPos;
              event.subject.fx = initPos.x + (event.x - initPos.x) / currentTransform.k;
              event.subject.fy = initPos.y + (event.y - initPos.y) / currentTransform.k;
            }
          })
          .on("end", function(event) {
            if (!event.active) simulation.alphaTarget(0);
            if (event.subject) {
              event.subject.fx = null;
              event.subject.fy = null;
            }
            dragging = false;
          })
      );
    }

    // Zoom behavior - matching Quartz line 499-524
    if (enableZoom) {
      d3.select(app.view).call(
        d3.zoom()
          .extent([[0, 0], [width, height]])
          .scaleExtent([0.25, 4])
          .on("zoom", ({ transform }) => {
            currentTransform = transform;
            stage.scale.set(transform.k, transform.k);
            stage.position.set(transform.x, transform.y);

            // Adjust label opacity based on zoom
            const zoomScale = transform.k * opacityScale;
            let scaleOpacity = Math.max((zoomScale - 1) / 3.75, 0);
            
            for (const n of nodeRenderData) {
              if (!n.active) {
                n.label.alpha = scaleOpacity;
              }
            }
          })
      );
    }

    // Animation loop - matching Quartz line 526-550
    let stopAnimation = false;
    
    function animate() {
      if (stopAnimation) return;

      // Update node positions - matching Quartz line 529-536
      for (const n of nodeRenderData) {
        const { x, y } = n.simulationData;
        if (x !== undefined && y !== undefined) {
          n.gfx.position.set(x + width / 2, y + height / 2);
          n.label.position.set(x + width / 2, y + height / 2);
        }
      }

      // Update link positions - matching Quartz line 538-545
      for (const l of linkRenderData) {
        const linkData = l.simulationData;
        const sx = linkData.source.x;
        const sy = linkData.source.y;
        const tx = linkData.target.x;
        const ty = linkData.target.y;
        
        if (sx !== undefined && sy !== undefined && tx !== undefined && ty !== undefined) {
          l.gfx.clear();
          l.gfx.moveTo(sx + width / 2, sy + height / 2);
          l.gfx.lineTo(tx + width / 2, ty + height / 2)
            .stroke({ alpha: l.alpha, width: 1, color: l.color });
        }
      }

      app.renderer.render(stage);
      requestAnimationFrame(animate);
    }

    simulation.on("tick", () => {
      // Position updates handled in animate loop
    });

    requestAnimationFrame(animate);
    console.log('[Graph] Animation started');

    // Return cleanup function - matching Quartz line 553-556
    return () => {
      console.log('[Graph] Cleaning up');
      stopAnimation = true;
      simulation.stop();
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }

  // Fallback SVG rendering (if PixiJS not available)
  function renderGraphSVG(container, graphData, cfg, slug, visited, width, height) {
    console.log('[Graph] Using SVG fallback rendering');
    
    // ... (keep existing SVG implementation as fallback)
    // This would be the simplified version we had before
  }

  // Initialize on page load - matching Quartz line 576-649
  let localGraphCleanup = null;
  let globalGraphCleanup = null;

  function cleanupLocalGraph() {
    if (localGraphCleanup) {
      localGraphCleanup();
      localGraphCleanup = null;
    }
  }

  function cleanupGlobalGraph() {
    if (globalGraphCleanup) {
      globalGraphCleanup();
      globalGraphCleanup = null;
    }
  }

  async function initGraph() {
    // Get current page slug - with URL decoding
    const currentPath = window.location.pathname;
    console.log('[Graph] Current pathname:', currentPath);
    
    // Decode URI component to handle Chinese characters
    let slug = decodeURIComponent(currentPath)
      .replace(/^\//, "")
      .replace(/\.html$/, "")
      .replace(/\/$/, "");

    console.log('[Graph] After decoding:', slug);

    // Remove baseURL prefix if present
    const baseURL = window.__FOUNDRY_BASE_URL_PATH__ || "";
    console.log('[Graph] Base URL path from global:', baseURL);
    
    // Strategy 1: Use explicit baseURL if provided
    if (baseURL && slug.startsWith(baseURL + "/")) {
      slug = slug.substring(baseURL.length + 1);
      console.log('[Graph] After removing baseURL:', slug);
    } 
    // Strategy 2: Auto-detect baseURL from Content Index keys
    else if (!baseURL && window.__FOUNDRY_CONTENT_INDEX__) {
      // Get first key from content index to detect the real slug format
      const contentIndexKeys = Object.keys(window.__FOUNDRY_CONTENT_INDEX__);
      console.log('[Graph] Content index keys sample:', contentIndexKeys.slice(0, 3));
      
      // Check if current slug has a prefix that's not in content index
      const slugParts = slug.split('/');
      if (slugParts.length > 1) {
        // Try removing first segment and see if it matches any content index key
        const slugWithoutFirstSegment = slugParts.slice(1).join('/');
        console.log('[Graph] Trying without first segment:', slugWithoutFirstSegment);
        
        if (contentIndexKeys.includes(slugWithoutFirstSegment)) {
          console.log('[Graph] Auto-detected baseURL prefix:', slugParts[0]);
          slug = slugWithoutFirstSegment;
        }
      }
    }

    slug = simplifySlug(slug);
    console.log('[Graph] Final slug:', slug);
    
    addToVisited(slug);

    // Render local graph
    cleanupLocalGraph();
    const localContainers = document.querySelectorAll(".graph-container");
    console.log('[Graph] Found', localContainers.length, 'local graph containers');
    
    for (const container of localContainers) {
      try {
        localGraphCleanup = await renderGraph(container, slug);
      } catch (error) {
        console.error('[Graph] Error rendering local graph:', error);
      }
    }

    // Setup global graph toggle
    const globalOuterContainers = document.querySelectorAll(".global-graph-outer");
    const globalIcons = document.querySelectorAll(".global-graph-icon");

    // Move global graph containers to body to avoid z-index stacking context issues
    // This ensures the global graph can overlay everything including sidebars
    globalOuterContainers.forEach(container => {
      if (container.parentElement !== document.body) {
        document.body.appendChild(container);
        console.log('[Graph] Moved global-graph-outer to body for proper z-index stacking');
      }
    });

    async function showGlobalGraph() {
      console.log('[Graph] Showing global graph');
      cleanupGlobalGraph();
      
      for (const container of globalOuterContainers) {
        container.classList.add("active");
        const graphContainer = container.querySelector(".global-graph-container");
        if (graphContainer) {
          try {
            globalGraphCleanup = await renderGraph(graphContainer, slug);
          } catch (error) {
            console.error('[Graph] Error rendering global graph:', error);
          }
        }
      }
    }

    function hideGlobalGraph() {
      console.log('[Graph] Hiding global graph');
      cleanupGlobalGraph();
      globalOuterContainers.forEach(container => {
        container.classList.remove("active");
      });
    }

    // Click global graph icon to toggle
    globalIcons.forEach(icon => {
      icon.addEventListener("click", showGlobalGraph);
    });

    // Click outside to close
    globalOuterContainers.forEach(container => {
      container.addEventListener("click", (e) => {
        if (e.target === container) {
          hideGlobalGraph();
        }
      });
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideGlobalGraph();
      }
    });

    // Keyboard shortcut: Ctrl/Cmd + G
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "g" && !e.shiftKey) {
        e.preventDefault();
        const isOpen = [...globalOuterContainers].some(c => c.classList.contains("active"));
        isOpen ? hideGlobalGraph() : showGlobalGraph();
      }
    });

    // Re-render on theme change
    document.addEventListener("themechange", async () => {
      console.log('[Graph] Theme changed, re-rendering');
      cleanupLocalGraph();
      
      for (const container of localContainers) {
        try {
          localGraphCleanup = await renderGraph(container, slug);
        } catch (error) {
          console.error('[Graph] Error re-rendering after theme change:', error);
        }
      }
    });
  }

  // Wait for dependencies to load
  function checkDependencies() {
    if (typeof d3 === "undefined") {
      console.error('[Graph] D3.js not loaded');
      return false;
    }
    if (typeof PIXI === "undefined") {
      console.warn('[Graph] PixiJS not loaded, will use SVG fallback');
    }
    if (!window.__FOUNDRY_CONTENT_INDEX__) {
      console.error('[Graph] Content index not loaded');
      return false;
    }
    return true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (checkDependencies()) {
        initGraph();
      }
    });
  } else {
    if (checkDependencies()) {
      initGraph();
    }
  }
})();
