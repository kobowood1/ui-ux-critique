// This service worker is responsible for opening the side panel
// when the user clicks the action icon in the toolbar.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
