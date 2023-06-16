/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

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
const codeToInject = (prompt) => {
    const focusedElement = document.activeElement;
    let textarea;
    if (focusedElement && focusedElement.tagName.toLowerCase() === 'textarea') {
        textarea = focusedElement;
    }
    else {
        textarea = document.getElementById('prompt-textarea');
    }
    if (textarea) {
        textarea.value = prompt;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    else {
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
                    target: { tabId: tab.id },
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
            }
            else {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELHlCQUF5QixHQUFHO0FBQzdFLHNDQUFzQyxZQUFZLEdBQUc7QUFDckQsU0FBUztBQUNUO0FBQ0Esc0NBQXNDLGlCQUFpQixHQUFHO0FBQzFEO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZUFBZTtBQUM3QztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Qcm9tcHRHUFQvLi9zcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIGFkZGluZyBiYWRnZSBjdXJyZW50bHkgYnJva2VuXG4vLyBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcbi8vICAgY29uc29sZS5sb2coJ1RhYiB1cGRhdGVkOiAnLCBjaGFuZ2VJbmZvLCAnVGFiIEluZm86JywgdGFiKTtcbi8vICAgaWYgKHRhYi51cmwpIHtcbi8vICAgICBjb25zb2xlLmxvZygnVVJMIGNoYW5nZWQnKTtcbi8vICAgICBpZiAodGFiLnVybC5pbmNsdWRlcygnY2hhdC5vcGVuYWkuY29tJykpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIGJhZGdlIGNvbG9yIHRvIGdyZWVuJyk7XG4vLyAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6ICcjMDBGRjAwJywgdGFiSWQgfSk7IC8vIFNldCBiYWRnZSBjb2xvciB0byBncmVlbi5cbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogJ09OJyB9KTsgLy8gU2V0IGJhZGdlIHRleHQgdG8gJ09OJy5cbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgY29uc29sZS5sb2coJ0NsZWFyaW5nIGJhZGdlIHRleHQnKTtcbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogJycsIHRhYklkIH0pOyAvLyBDbGVhciBiYWRnZSB0ZXh0LlxuLy8gICAgIH1cbi8vICAgfVxuLy8gfSk7XG5jb25zdCBjb2RlVG9JbmplY3QgPSAocHJvbXB0KSA9PiB7XG4gICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGxldCB0ZXh0YXJlYTtcbiAgICBpZiAoZm9jdXNlZEVsZW1lbnQgJiYgZm9jdXNlZEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIHRleHRhcmVhID0gZm9jdXNlZEVsZW1lbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9tcHQtdGV4dGFyZWEnKTtcbiAgICB9XG4gICAgaWYgKHRleHRhcmVhKSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gcHJvbXB0O1xuICAgICAgICB0ZXh0YXJlYS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIG1hdGNoaW5nIHRleHRhcmVhJyk7XG4gICAgfVxufTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdleGVjdXRlU2NyaXB0Jykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZWQgZXhlY3V0ZVNjcmlwdCByZXF1ZXN0JywgcmVxdWVzdCk7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFiID0gdGFic1swXTtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGEgdGFiIHdhcyBmb3VuZFxuICAgICAgICAgICAgaWYgKHRhYikge1xuICAgICAgICAgICAgICAgIGNocm9tZS5zY3JpcHRpbmdcbiAgICAgICAgICAgICAgICAgICAgLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdGFiSWQ6IHRhYi5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jOiBjb2RlVG9JbmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtyZXF1ZXN0LnByb21wdF0sIC8vIFBhc3MgaW4gdGhlIGNvZGUgYXMgYW4gYXJndW1lbnRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTY3JpcHQgZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIGV4ZWN1dGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGFjdGl2ZSB0YWIgZm91bmQnKTtcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gZmFsc2UgZm9yIGFueSBvdGhlciBtZXNzYWdlcyB0byBjbG9zZSB0aGUgbWVzc2FnZSBwb3J0XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=