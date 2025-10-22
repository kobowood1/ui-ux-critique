chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is to get page content
  if (request.action === "getPageContent") {
    
    const getPageStyles = () => {
      let cssText = '';
      // Iterate over all stylesheets in the document
      for (const sheet of document.styleSheets) {
        try {
          // Check if cssRules are accessible (they might not be for cross-origin sheets)
          if (sheet.cssRules) {
            for (const rule of sheet.cssRules) {
              cssText += rule.cssText + '\n';
            }
          }
        } catch (e) {
          // Log a warning if a stylesheet's rules can't be read
          console.warn("Could not read CSS rules from: ", sheet.href, e);
        }
      }
      return cssText;
    };

    // Construct the response object with HTML and CSS
    const response = {
      html: document.body.innerHTML,
      css: getPageStyles(),
    };
    
    // Send the response back to the sender (the side panel)
    sendResponse(response);
  }
  
  // Return true to indicate that we will be sending a response asynchronously.
  // This is important for keeping the message channel open.
  return true; 
});
