// Function to save the API key to chrome.storage
function saveOptions() {
  const apiKeyInput = document.getElementById('apiKey');
  const status = document.getElementById('status');
  
  if (!apiKeyInput) return;
  const apiKey = apiKeyInput.value;

  chrome.storage.local.set({ apiKey: apiKey }, () => {
    status.textContent = 'API Key saved successfully!';
    status.classList.remove('text-red-400');
    status.classList.add('text-green-400');
    
    setTimeout(() => {
      status.textContent = '';
    }, 2500);
  });
}

// Function to restore the saved API key from chrome.storage
function restoreOptions() {
  chrome.storage.local.get(['apiKey'], (result) => {
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput && result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
  });
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  restoreOptions();
  const saveButton = document.getElementById('save');
  if (saveButton) {
    saveButton.addEventListener('click', saveOptions);
  }
});
