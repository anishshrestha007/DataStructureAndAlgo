"use strict";
(self["webpackChunkweatherapp"] = self["webpackChunkweatherapp"] || []).push([["script"],{

/***/ "./src/contact.js":
/*!************************!*\
  !*** ./src/contact.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function contact() {
  return `Contact`;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contact);


/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function home() {
  return `HomePage`;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (home);


/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
  return `Menu`;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);


/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleHeaderClick": () => (/* binding */ handleHeaderClick)
/* harmony export */ });
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./src/home.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/menu.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact */ "./src/contact.js");






function appendBodyElement(element) {
  const bodyElement = document.getElementById("body-content");
  bodyElement.innerHTML = element();
}

function handleHeaderClick(e) {
  console.log("Hello");
  switch (e.target.id) {
    case "header-label-first":
      appendBodyElement(_home__WEBPACK_IMPORTED_MODULE_0__["default"]);
      break;
    case "header-label-second":
      appendBodyElement(_menu__WEBPACK_IMPORTED_MODULE_1__["default"]);
      break;
    case "header-label-third":
      appendBodyElement(_contact__WEBPACK_IMPORTED_MODULE_2__["default"]);
      break;
    default:
      break;
  }
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/script.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0p2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDSnBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKTTtBQUMxQjtBQUMwQjtBQUMxQjtBQUNnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw2Q0FBSTtBQUM1QjtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9jb250YWN0LmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaG9tZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL21lbnUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY29udGFjdCgpIHtcclxuICByZXR1cm4gYENvbnRhY3RgO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0O1xyXG4iLCJmdW5jdGlvbiBob21lKCkge1xyXG4gIHJldHVybiBgSG9tZVBhZ2VgO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBob21lO1xyXG4iLCJmdW5jdGlvbiBtZW51KCkge1xyXG4gIHJldHVybiBgTWVudWA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lbnU7XHJcbiIsImltcG9ydCBob21lIGZyb20gXCIuL2hvbWVcIjtcclxuXHJcbmltcG9ydCBtZW51IGZyb20gXCIuL21lbnVcIjtcclxuXHJcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGFwcGVuZEJvZHlFbGVtZW50KGVsZW1lbnQpIHtcclxuICBjb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9keS1jb250ZW50XCIpO1xyXG4gIGJvZHlFbGVtZW50LmlubmVySFRNTCA9IGVsZW1lbnQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlSGVhZGVyQ2xpY2soZSkge1xyXG4gIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XHJcbiAgc3dpdGNoIChlLnRhcmdldC5pZCkge1xyXG4gICAgY2FzZSBcImhlYWRlci1sYWJlbC1maXJzdFwiOlxyXG4gICAgICBhcHBlbmRCb2R5RWxlbWVudChob21lKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaGVhZGVyLWxhYmVsLXNlY29uZFwiOlxyXG4gICAgICBhcHBlbmRCb2R5RWxlbWVudChtZW51KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaGVhZGVyLWxhYmVsLXRoaXJkXCI6XHJcbiAgICAgIGFwcGVuZEJvZHlFbGVtZW50KGNvbnRhY3QpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgaGFuZGxlSGVhZGVyQ2xpY2sgfTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9