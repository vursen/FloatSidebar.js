/*!
 * float-sidebar - Lightweight, vanilla javascript library for making smart float sidebars
 * @version v1.0.2
 * @link https://github.com/vursen/FloatSidebar.js
 * @author Sergey Vinogradov
 * @license The MIT License (MIT)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FloatSidebar"] = factory();
	else
		root["FloatSidebar"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return STATE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return STATE_TOP_FIXED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return STATE_UNFIXED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STATE_BOTTOM_FIXED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return STATE_FINISH; });
var STATE_START = 'START';
var STATE_TOP_FIXED = 'TOP_FIXED';
var STATE_UNFIXED = 'UNFIXED';
var STATE_BOTTOM_FIXED = 'BOTTOM_FIXED';
var STATE_FINISH = 'FINISH';

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_fsmTransitions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_fsmActions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_fsmStates__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_createFSM__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_createDimensionObserver__ = __webpack_require__(5);







function FloatSidebar(options) {
  var $sideOuter = options.sidebar;
  var $sideInner = options.sidebarInner || $sideOuter.firstElementChild;
  var $relative = options.relative;

  var topSpacing = options.topSpacing || 0;
  var bottomSpacing = options.bottomSpacing || 0;

  var fsm = Object(__WEBPACK_IMPORTED_MODULE_3__utils_createFSM__["a" /* default */])({
    actions: __WEBPACK_IMPORTED_MODULE_1__constants_fsmActions__["a" /* default */],
    transitions: __WEBPACK_IMPORTED_MODULE_0__constants_fsmTransitions__["a" /* default */],
    initialState: __WEBPACK_IMPORTED_MODULE_2__constants_fsmStates__["c" /* STATE_START */]
  });

  var dimensionObserver = Object(__WEBPACK_IMPORTED_MODULE_4__utils_createDimensionObserver__["a" /* default */])({
    $sideOuter: $sideOuter,
    $sideInner: $sideInner,
    $relative: $relative,
    topSpacing: topSpacing,
    bottomSpacing: bottomSpacing
  }, function (prevDimensions, dimensions) {
    var transition = fsm.findTransitionFor(dimensions);

    if (transition) {
      fsm.performTransition(transition)(dimensions, {
        $sideInner: $sideInner,
        $sideOuter: $sideOuter,
        $relative: $relative
      });
    }

    updateSideOuterHeight(prevDimensions, dimensions);
  });

  var updateSideOuterHeight = function updateSideOuterHeight(prevDimensions, dimensions) {
    var isHeightChanged = Math.abs((prevDimensions.sideOuterHeight || 0) - dimensions.sideOuterHeight) >= 1;

    if (isHeightChanged) {
      $sideOuter.style.height = dimensions.sideOuterHeight + 'px';
    }
  };

  var forceUpdate = function forceUpdate() {
    dimensionObserver.tick();
  };

  var destroy = function destroy() {
    dimensionObserver.stop();
  };

  var init = function init() {
    $sideOuter.style.willChange = 'height';
    $sideInner.style.width = 'inherit';
    $sideInner.style.transform = 'translateZ(0)';
    $sideInner.style.willChange = 'transform';

    dimensionObserver.start();
  };

  requestAnimationFrame(init);

  return { forceUpdate: forceUpdate, destroy: destroy };
}

/* harmony default export */ __webpack_exports__["default"] = (FloatSidebar);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__ = __webpack_require__(0);
var _STATE_START$STATE_TO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = (_STATE_START$STATE_TO = {}, _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */], [{
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["b" /* STATE_FINISH */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.viewportTop + d.sideInnerHeight >= d.finishPoint];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["a" /* STATE_BOTTOM_FIXED */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.isSideInnerFitsViewport === false, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.isSideInnerFitsViewport === true, d.viewportTop >= d.startPoint - d.topSpacing];
  }
}]), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */], [{
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */],
  when: function when(d) {
    return [d.viewportTop <= d.startPoint - d.topSpacing];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["b" /* STATE_FINISH */],
  when: function when(d) {
    return [d.sideInnerBottom >= d.finishPoint];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["e" /* STATE_UNFIXED */],
  when: function when(d) {
    return [d.scrollDirection === 'down', d.isSideInnerFitsViewport === false];
  }
}]), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["e" /* STATE_UNFIXED */], [{
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */],
  when: function when(d) {
    return [d.viewportTop <= d.sideInnerTop - d.topSpacing];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */],
  when: function when(d) {
    return [d.isSideInnerFitsViewport === true, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["a" /* STATE_BOTTOM_FIXED */],
  when: function when(d) {
    return [d.isSideInnerFitsViewport === false, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}]), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["a" /* STATE_BOTTOM_FIXED */], [{
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["e" /* STATE_UNFIXED */],
  when: function when(d) {
    return [d.scrollDirection === 'up'];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */],
  when: function when(d) {
    return [d.isSideInnerFitsViewport === true];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["b" /* STATE_FINISH */],
  when: function when(d) {
    return [d.sideInnerBottom >= d.finishPoint];
  }
}]), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["b" /* STATE_FINISH */], [{
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */],
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["a" /* STATE_BOTTOM_FIXED */],
  when: function when(d) {
    return [d.sideInnerBottom + d.bottomSpacing <= d.finishPoint, d.viewportBottom <= d.finishPoint];
  }
}, {
  to: __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */],
  when: function when(d) {
    return [d.viewportTop <= d.sideInnerTop - d.topSpacing];
  }
}]), _STATE_START$STATE_TO);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__ = __webpack_require__(0);
var _STATE_START$STATE_TO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = (_STATE_START$STATE_TO = {}, _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["c" /* STATE_START */], function (d, _ref) {
  var $sideInner = _ref.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = '0';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["d" /* STATE_TOP_FIXED */], function (d, _ref2) {
  var $sideInner = _ref2.$sideInner;

  $sideInner.style.position = 'fixed';
  $sideInner.style.top = d.topSpacing + 'px';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["e" /* STATE_UNFIXED */], function (d, _ref3) {
  var $sideInner = _ref3.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = d.sideInnerTop - d.startPoint + 'px';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["a" /* STATE_BOTTOM_FIXED */], function (d, _ref4) {
  var $sideInner = _ref4.$sideInner;

  $sideInner.style.position = 'fixed';
  $sideInner.style.top = 'auto';
  $sideInner.style.bottom = d.bottomSpacing + 'px';
}), _defineProperty(_STATE_START$STATE_TO, __WEBPACK_IMPORTED_MODULE_0__fsmStates_js__["b" /* STATE_FINISH */], function (d, _ref5) {
  var $sideInner = _ref5.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = 'auto';
  $sideInner.style.bottom = '0';
}), _STATE_START$STATE_TO);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function createFSM(_ref) {
  var actions = _ref.actions,
      transitions = _ref.transitions,
      initialState = _ref.initialState;

  var currentState = initialState;

  var findTransitionFor = function findTransitionFor() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return transitions[currentState].find(function (_ref2) {
      var when = _ref2.when;

      return when.apply(undefined, args).every(function (condition) {
        return condition;
      });
    });
  };

  var performTransition = function performTransition(_ref3) {
    var newState = _ref3.to;
    return function () {
      currentState = newState;

      actions[newState].apply(actions, arguments);
    };
  };

  return { findTransitionFor: findTransitionFor, performTransition: performTransition };
}

/* harmony default export */ __webpack_exports__["a"] = (createFSM);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rAFThrottle__ = __webpack_require__(6);


var computeViewportDimensions = function computeViewportDimensions() {
  var height = window.innerHeight;
  var top = window.pageYOffset;
  var bottom = top + height;

  return { top: top, bottom: bottom, height: height };
};

var computeElementDimensions = function computeElementDimensions($element, viewportTop) {
  var rect = $element.getBoundingClientRect();

  return {
    top: rect.top + viewportTop,
    bottom: rect.bottom + viewportTop,
    height: rect.height
  };
};

function createDimensionObserver(_ref, callback) {
  var $sideInner = _ref.$sideInner,
      $sideOuter = _ref.$sideOuter,
      $relative = _ref.$relative,
      topSpacing = _ref.topSpacing,
      bottomSpacing = _ref.bottomSpacing;

  var prevDimensions = {};

  var computeScrollDirection = function computeScrollDirection(viewportTop) {
    return prevDimensions.viewportTop < viewportTop ? 'down' : prevDimensions.viewportTop > viewportTop ? 'up' : 'notChanged';
  };

  var computeDimensions = function computeDimensions() {
    var _computeViewportDimen = computeViewportDimensions(),
        viewportTop = _computeViewportDimen.top,
        viewportBottom = _computeViewportDimen.bottom,
        viewportHeight = _computeViewportDimen.height;

    var _computeElementDimens = computeElementDimensions($sideInner, viewportTop),
        sideInnerTop = _computeElementDimens.top,
        sideInnerBottom = _computeElementDimens.bottom,
        sideInnerHeight = _computeElementDimens.height;

    var _computeElementDimens2 = computeElementDimensions($sideOuter, viewportTop),
        sideOuterTop = _computeElementDimens2.top,
        sideOuterBottom = _computeElementDimens2.bottom;

    var _computeElementDimens3 = computeElementDimensions($relative, viewportTop),
        relativeTop = _computeElementDimens3.top,
        relativeBottom = _computeElementDimens3.bottom;

    var scrollDirection = computeScrollDirection(viewportTop);

    var startPoint = sideOuterTop;
    var finishPoint = relativeBottom;
    var pathHeight = finishPoint - startPoint;

    var isSideInnerFitsViewport = sideInnerHeight + topSpacing + bottomSpacing < viewportHeight;
    var isSideInnerFitsPath = sideInnerHeight < pathHeight;

    var sideOuterHeight = Math.max(sideInnerHeight, pathHeight);

    return {
      startPoint: startPoint,
      finishPoint: finishPoint,
      viewportTop: viewportTop,
      viewportBottom: viewportBottom,
      sideOuterHeight: sideOuterHeight,
      sideInnerTop: sideInnerTop,
      sideInnerBottom: sideInnerBottom,
      sideInnerHeight: sideInnerHeight,
      isSideInnerFitsViewport: isSideInnerFitsViewport,
      isSideInnerFitsPath: isSideInnerFitsPath,
      scrollDirection: scrollDirection,
      topSpacing: topSpacing,
      bottomSpacing: bottomSpacing
    };
  };

  var tick = Object(__WEBPACK_IMPORTED_MODULE_0__rAFThrottle__["a" /* default */])(function () {
    var dimensions = computeDimensions();

    callback(prevDimensions, dimensions);

    prevDimensions = dimensions;
  });

  var start = function start() {
    window.addEventListener('scroll', tick);
    window.addEventListener('resize', tick);

    tick();
  };

  var stop = function stop() {
    window.removeEventListener('scroll', tick);
    window.removeEventListener('resize', tick);
  };

  return { start: start, stop: stop, tick: tick };
}

/* harmony default export */ __webpack_exports__["a"] = (createDimensionObserver);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function rAFThrottle(callback) {
  var requestId = void 0;

  return function () {
    if (!requestId) {
      requestId = requestAnimationFrame(function () {
        requestId = null;
        callback();
      });
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (rAFThrottle);

/***/ })
/******/ ])["default"];
});