"use strict";
self["webpackHotUpdatePromptGPT"]("background",{

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (() => {


function isFileArray(files) {
    return Array.isArray(files);
}
const filesInDirectory = (dir) => new Promise((resolve) => dir.createReader().readEntries((entries) => Promise.all(entries
    .filter((e) => e.name[0] !== '.')
    .map((e) => e.isDirectory
    ? filesInDirectory(e)
    : new Promise((resolve) => e.file(resolve))))
    .then((files) => files.flat())
    .then((files) => {
    const fileList = files.filter(isFileArray).flat();
    resolve(fileList);
})));
const timestampForFilesInDirectory = (dir) => filesInDirectory(dir).then((files) => files.map((f) => f.name + f.lastModified).join() // Accessing properties of File objects
);
const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then((timestamp) => {
        if (!lastTimestamp || lastTimestamp === timestamp) {
            setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
        }
        else {
            chrome.runtime.reload();
        }
    });
};
chrome.management.getSelf((self) => {
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            // NB: see https://github.com/xpl/crx-hotreload/issues/5
            if (tabs[0] && tabs[0].id !== undefined) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c99ea8d93950419ea813")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC4wOGVjYzgwZDJhNzQ1MTVkM2M2NS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUNBQXVDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7Ozs7Ozs7O1VDcENEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUHJvbXB0R1BULy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vUHJvbXB0R1BUL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzRmlsZUFycmF5KGZpbGVzKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZmlsZXMpO1xufVxuY29uc3QgZmlsZXNJbkRpcmVjdG9yeSA9IChkaXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBkaXIuY3JlYXRlUmVhZGVyKCkucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IFByb21pc2UuYWxsKGVudHJpZXNcbiAgICAuZmlsdGVyKChlKSA9PiBlLm5hbWVbMF0gIT09ICcuJylcbiAgICAubWFwKChlKSA9PiBlLmlzRGlyZWN0b3J5XG4gICAgPyBmaWxlc0luRGlyZWN0b3J5KGUpXG4gICAgOiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gZS5maWxlKHJlc29sdmUpKSkpXG4gICAgLnRoZW4oKGZpbGVzKSA9PiBmaWxlcy5mbGF0KCkpXG4gICAgLnRoZW4oKGZpbGVzKSA9PiB7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBmaWxlcy5maWx0ZXIoaXNGaWxlQXJyYXkpLmZsYXQoKTtcbiAgICByZXNvbHZlKGZpbGVMaXN0KTtcbn0pKSk7XG5jb25zdCB0aW1lc3RhbXBGb3JGaWxlc0luRGlyZWN0b3J5ID0gKGRpcikgPT4gZmlsZXNJbkRpcmVjdG9yeShkaXIpLnRoZW4oKGZpbGVzKSA9PiBmaWxlcy5tYXAoKGYpID0+IGYubmFtZSArIGYubGFzdE1vZGlmaWVkKS5qb2luKCkgLy8gQWNjZXNzaW5nIHByb3BlcnRpZXMgb2YgRmlsZSBvYmplY3RzXG4pO1xuY29uc3Qgd2F0Y2hDaGFuZ2VzID0gKGRpciwgbGFzdFRpbWVzdGFtcCkgPT4ge1xuICAgIHRpbWVzdGFtcEZvckZpbGVzSW5EaXJlY3RvcnkoZGlyKS50aGVuKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgaWYgKCFsYXN0VGltZXN0YW1wIHx8IGxhc3RUaW1lc3RhbXAgPT09IHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3YXRjaENoYW5nZXMoZGlyLCB0aW1lc3RhbXApLCAxMDAwKTsgLy8gcmV0cnkgYWZ0ZXIgMXNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuY2hyb21lLm1hbmFnZW1lbnQuZ2V0U2VsZigoc2VsZikgPT4ge1xuICAgIGlmIChzZWxmLmluc3RhbGxUeXBlID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLmdldFBhY2thZ2VEaXJlY3RvcnlFbnRyeSgoZGlyKSA9PiB3YXRjaENoYW5nZXMoZGlyKSk7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBsYXN0Rm9jdXNlZFdpbmRvdzogdHJ1ZSB9LCAodGFicykgPT4ge1xuICAgICAgICAgICAgLy8gTkI6IHNlZSBodHRwczovL2dpdGh1Yi5jb20veHBsL2NyeC1ob3RyZWxvYWQvaXNzdWVzLzVcbiAgICAgICAgICAgIGlmICh0YWJzWzBdICYmIHRhYnNbMF0uaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbG9hZCh0YWJzWzBdLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJjOTllYThkOTM5NTA0MTllYTgxM1wiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==