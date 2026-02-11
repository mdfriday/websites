// Reader Mode - Matching Quartz readermode.inline.ts
(function() {
  let isReaderMode = false

  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"
    document.documentElement.setAttribute("reader-mode", newMode)
    
    console.log(`[ReaderMode] Switched to ${newMode}`)
    
    // Emit custom event for other components to react
    const event = new CustomEvent("readermodechange", {
      detail: { mode: newMode }
    })
    document.dispatchEvent(event)
  }

  // Setup reader mode buttons
  function setupReaderMode() {
    for (const readerModeButton of document.getElementsByClassName("readermode")) {
      readerModeButton.addEventListener("click", switchReaderMode)
      console.log('[ReaderMode] Added click listener to button')
    }
    
    // Set initial state
    document.documentElement.setAttribute("reader-mode", "off")
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReaderMode)
  } else {
    setupReaderMode()
  }
})()

