"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["script"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0p2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDSnBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKTTtBQUMxQjtBQUMwQjtBQUMxQjtBQUNnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw2Q0FBSTtBQUM1QjtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2NvbnRhY3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2hvbWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL21lbnUuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjb250YWN0KCkge1xyXG4gIHJldHVybiBgQ29udGFjdGA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3Q7XHJcbiIsImZ1bmN0aW9uIGhvbWUoKSB7XHJcbiAgcmV0dXJuIGBIb21lUGFnZWA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvbWU7XHJcbiIsImZ1bmN0aW9uIG1lbnUoKSB7XHJcbiAgcmV0dXJuIGBNZW51YDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVudTtcclxuIiwiaW1wb3J0IGhvbWUgZnJvbSBcIi4vaG9tZVwiO1xyXG5cclxuaW1wb3J0IG1lbnUgZnJvbSBcIi4vbWVudVwiO1xyXG5cclxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xyXG5cclxuZnVuY3Rpb24gYXBwZW5kQm9keUVsZW1lbnQoZWxlbWVudCkge1xyXG4gIGNvbnN0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2R5LWNvbnRlbnRcIik7XHJcbiAgYm9keUVsZW1lbnQuaW5uZXJIVE1MID0gZWxlbWVudCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVIZWFkZXJDbGljayhlKSB7XHJcbiAgY29uc29sZS5sb2coXCJIZWxsb1wiKTtcclxuICBzd2l0Y2ggKGUudGFyZ2V0LmlkKSB7XHJcbiAgICBjYXNlIFwiaGVhZGVyLWxhYmVsLWZpcnN0XCI6XHJcbiAgICAgIGFwcGVuZEJvZHlFbGVtZW50KGhvbWUpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJoZWFkZXItbGFiZWwtc2Vjb25kXCI6XHJcbiAgICAgIGFwcGVuZEJvZHlFbGVtZW50KG1lbnUpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJoZWFkZXItbGFiZWwtdGhpcmRcIjpcclxuICAgICAgYXBwZW5kQm9keUVsZW1lbnQoY29udGFjdCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBoYW5kbGVIZWFkZXJDbGljayB9O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=