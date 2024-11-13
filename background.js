chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.sync.get(null, (items) => {
      const blockedUrls = Object.keys(items);
      blockedUrls.forEach((url) => {
        if (tab.url.includes(url)) {
          chrome.tabs.remove(tabId);
          alert('This site is blocked for productivity!');
        }
      });
    });
  });
  