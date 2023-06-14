chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (changeInfo.url.includes('chat.openai.com')) {
      chrome.action.setBadgeBackgroundColor({ color: '#00FF00', tabId }); // Set badge color to green.
      chrome.action.setBadgeText({ text: '' }); // Clear badge text.
    } else {
      chrome.action.setBadgeText({ text: '' }); // Clear badge text.
    }
  }
});

const codeToInject = (prompt: string) => {
  const focusedElement = document.activeElement as HTMLTextAreaElement;
  let textarea: HTMLTextAreaElement | null;
  if (focusedElement && focusedElement.tagName.toLowerCase() === 'textarea') {
    textarea = focusedElement;
  } else {
    textarea = document.getElementById(
      'prompt-textarea'
    ) as HTMLTextAreaElement | null;
  }
  if (textarea) {
    textarea.value = prompt.substring(1, prompt.length - 1);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    console.log('no matching textarea');
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'executeScript') {
    console.log('Received executeScript request', request);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0];
      if (tab.id) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            func: codeToInject,
            args: [request.prompt], // Pass in the code as an argument
          })
          .catch(() => {
            console.log('damn no execution');
            sendResponse({
              error: true,
            });
          });
      }
    });
  }
});
