/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
  \********************************/

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log('Receive color = ' + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse('Change color to ' + msg.color);
    }
    else {
        sendResponse('Color message is none.');
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUHJvbXB0R1BULy4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGlmIChtc2cuY29sb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2VpdmUgY29sb3IgPSAnICsgbXNnLmNvbG9yKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBtc2cuY29sb3I7XG4gICAgICAgIHNlbmRSZXNwb25zZSgnQ2hhbmdlIGNvbG9yIHRvICcgKyBtc2cuY29sb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKCdDb2xvciBtZXNzYWdlIGlzIG5vbmUuJyk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=