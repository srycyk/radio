/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./app/javascript/packs/show_time.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ShowTime = {
  now: function now() {
    return new Date();
  },
  hhmm: function hhmm() {
    return this.now().toTimeString().substr(0, 5);
  },
  isForToday: function isForToday(date) {
    return !date || date === 'now' || date === 'today';
  },
  isUpcoming: function isUpcoming(finishes, hhmm) {
    return finishes >= hhmm;
  },
  isDayEnd: function isDayEnd(starts, finishes) {
    return !finishes || finishes <= starts;
  },
  today: function today() {
    return this.yyyymmdd(this.now());
  },
  tomorrow: function tomorrow() {
    return this.yyyymmdd(this.timeShift(1));
  },
  yyyymmdd: function yyyymmdd(date) {
    return date.toISOString().substr(0, 10);
  },
  convertToDate: function convertToDate(date) {
    if (typeof date === 'string') return new Date(Date.parse(date));else return date;
  },
  formatDate: function formatDate(date) {
    return this.convertToDate(date).toDateString();
  },
  displayDate: function displayDate(date) {
    return this.isForToday(date) ? 'upcoming' : this.formatDate(date);
  },
  currentDateTime: function currentDateTime() {
    return this.currentDate() + ' ' + this.currentTime();
  },
  currentDate: function currentDate() {
    return this.now().toDateString();
  },
  currentTime: function currentTime() {
    return this.now().toLocaleTimeString().substr(0, 5);
  },
  dateRange: function dateRange() {
    var ceiling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var floor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    var dates = [];

    for (var i = floor; i < ceiling; i++) {
      dates.push(this.yyyymmdd(this.timeShift(i)));
    }return dates;
  },
  timeShift: function timeShift(numDays) {
    return new Date(this.now().getTime() + this.milliDay(numDays));
  },
  milliDay: function milliDay(numDays) {
    return numDays * 24 * 60 * 60 * 1000;
  },
  linkDate: function linkDate(date) {
    return date === this.today() ? 'Today' : date === this.tomorrow() ? 'Tomorrow' : date;
  }
};

exports.default = ShowTime;

/***/ })

/******/ });
//# sourceMappingURL=show_time.js.map