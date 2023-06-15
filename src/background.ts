// adding badge currently broken
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log('Tab updated: ', changeInfo, 'Tab Info:', tab);

//   if (tab.url) {
//     console.log('URL changed');
//     if (tab.url.includes('chat.openai.com')) {
//       console.log('Setting badge color to green');
//       chrome.action.setBadgeBackgroundColor({ color: '#00FF00', tabId }); // Set badge color to green.
//       chrome.action.setBadgeText({ text: 'ON' }); // Set badge text to 'ON'.
//     } else {
//       console.log('Clearing badge text');
//       chrome.action.setBadgeText({ text: '', tabId }); // Clear badge text.
//     }
//   }
// });

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
    textarea.value = prompt;
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

      // Check if a tab was found
      if (tab) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id as number },
            func: codeToInject,
            args: [request.prompt], // Pass in the code as an argument
          })
          .then(() => {
            console.log('Script executed successfully');
            sendResponse({
              success: true,
            });
          })
          .catch((err) => {
            console.log('Failed to execute');
            sendResponse({
              error: true,
            });
          });
      } else {
        console.error('No active tab found');
        sendResponse({
          error: true,
        });
      }
    });
    return true;
  }
  // Return false for any other messages to close the message port
  return false;
});
