/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rAFScrollWrapper_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stateStyles_js__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






// const DefaultFastDOMAdapter = (() => {
//   const measure = (callback) => Promise.resolve(callback())
//   const mutate  = (callback) => Promise.resolve(callback())

//   return { mutate, measure }
// })();

function StickySidebar(el, props) {
  props = _extends({
    topSpacing: 0,
    bottomSpacing: 0,
    relativeEl: null
  }, props);

  var __state = 'START';
  var __lastViewportTop = -1;
  var __lastFinishPoint = -1;

  var __wrapperEl = el;
  var __innerEl = el.firstChild;
  var __relativeEl = props.relativeEl;

  // const measureDOM = (callback) => props.FastDOMAdapter.measure(callback);
  // const mutateDOM  = (callback) => props.FastDOMAdapter.mutate(callback);

  var findTransition = function findTransition(state, dimensions) {
    return __WEBPACK_IMPORTED_MODULE_1__transitions_js__["a" /* default */][state].find(function (_ref) {
      var cond = _ref.cond;
      return cond(dimensions).every(function (value) {
        return value;
      });
    });
  };

  var performTransition = function performTransition(_ref2, dimensions) {
    var newState = _ref2.to;

    __state = newState;

    __WEBPACK_IMPORTED_MODULE_2__stateStyles_js__["a" /* default */][newState](dimensions, __innerEl);
  };

  var updateTick = __WEBPACK_IMPORTED_MODULE_0__rAFScrollWrapper_js__["a" /* default */](function () {
    var dimensions = calculateDimensions();
    var transition = findTransition(__state, dimensions);

    if (transition) {
      performTransition(transition, dimensions);
    }

    if (__lastFinishPoint - dimensions.finishPoint !== 0) {
      updateWrapperStyles(dimensions);
    }

    __lastViewportTop = dimensions.viewportTop;
    __lastFinishPoint = dimensions.finishPoint;
  });

  var calculateDimensions = function calculateDimensions() {
    var viewportTop = window.pageYOffset;
    var viewportHeight = window.innerHeight;

    var innerElRect = __innerEl.getBoundingClientRect();
    var wrapperElRect = __wrapperEl.getBoundingClientRect();
    var relativeElRect = __relativeEl.getBoundingClientRect();

    var innerOffsetTop = innerElRect.top + viewportTop;
    var innerOffsetBottom = innerElRect.bottom + viewportTop;
    var innerHeight = innerElRect.height;

    var startPoint = wrapperElRect.top + viewportTop;
    var finishPoint = relativeElRect.bottom + viewportTop;

    var scrollDirection = 'notChanged';

    scrollDirection = __lastViewportTop < viewportTop ? 'down' : scrollDirection;
    scrollDirection = __lastViewportTop > viewportTop ? 'up' : scrollDirection;

    return {
      startPoint: startPoint,
      finishPoint: finishPoint,
      wayHeight: finishPoint - startPoint,
      innerHeight: innerHeight,
      innerOffsetTop: innerOffsetTop,
      innerOffsetBottom: innerOffsetBottom,
      isInnerFitsViewport: innerHeight + props.topSpacing + props.bottomSpacing < viewportHeight,
      isInnerFitsContainer: innerHeight < relativeElRect.height,
      viewportTop: viewportTop,
      viewportBottom: viewportTop + viewportHeight,
      viewportHeight: viewportHeight,
      scrollDirection: scrollDirection,
      topSpacing: props.topSpacing,
      bottomSpacing: props.bottomSpacing
    };
  };

  var updateWrapperStyles = function updateWrapperStyles(d) {
    var height = d.wayHeight > d.innerHeight ? d.wayHeight : d.innerHeight;

    __wrapperEl.style.height = height + 'px';
  };

  var forceUpdate = function forceUpdate() {
    updateTick();
  };

  var destroy = function destroy() {
    window.removeEventListener('scroll', updateTick);
    window.removeEventListener('resize', updateTick);
  };

  var init = function init() {
    return requestAnimationFrame(function () {
      var dimensions = calculateDimensions();
      var transition = findTransition(__state, dimensions);

      if (transition) performTransition(transition, dimensions);

      updateWrapperStyles(dimensions);

      __wrapperEl.style.willChange = 'height';

      __innerEl.style.width = 'inherit';

      __lastViewportTop = dimensions.viewportTop;
      __lastFinishPoint = dimensions.finishPoint;

      window.addEventListener('scroll', updateTick);
      window.addEventListener('resize', updateTick);
    });
  };

  init();

  return { forceUpdate: forceUpdate, destroy: destroy };
}

/* harmony default export */ __webpack_exports__["default"] = (StickySidebar);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rAFScrollWrapper;
function rAFScrollWrapper(callback) {
  var ticked = true;

  return function () {
    if (!ticked) return false;

    window.requestAnimationFrame(function () {
      ticked = true;

      callback();
    });

    ticked = false;
  };
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  START: [{
    to: 'FINISH',
    cond: function cond(d) {
      return [d.innerOffsetBottom >= d.finishPoint];
    }
  }, {
    to: 'BOTTOM_FIXED',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === true, d.isInnerFitsViewport === false, d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing - 1];
    }
  }, {
    to: 'TOP_FIXED',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === true, d.isInnerFitsViewport === true, d.viewportTop >= d.startPoint - d.topSpacing];
    }
  }],

  TOP_FIXED: [{
    to: 'START',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === false];
    }
  }, {
    to: 'START',
    cond: function cond(d) {
      return [d.viewportTop <= d.startPoint - d.topSpacing];
    }
  }, {
    to: 'FINISH',
    cond: function cond(d) {
      return [d.innerOffsetBottom >= d.finishPoint];
    }
  }, {
    to: 'UNFIXED',
    cond: function cond(d) {
      return [d.scrollDirection === 'down', d.isInnerFitsViewport === false];
    }
  }],

  UNFIXED: [{
    to: 'START',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === false];
    }
  }, {
    to: 'TOP_FIXED',
    cond: function cond(d) {
      return [d.viewportTop <= d.innerOffsetTop - d.topSpacing];
    }
  }, {
    to: 'TOP_FIXED',
    cond: function cond(d) {
      return [d.isInnerFitsViewport === true, d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing];
    }
  }, {
    to: 'BOTTOM_FIXED',
    cond: function cond(d) {
      return [d.isInnerFitsViewport === false, d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing];
    }
  }],

  BOTTOM_FIXED: [{
    to: 'START',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === false];
    }
  }, {
    to: 'UNFIXED',
    cond: function cond(d) {
      return [d.scrollDirection === 'up'];
    }
  }, {
    to: 'FINISH',
    cond: function cond(d) {
      return [d.scrollDirection === 'down', d.innerOffsetBottom >= d.finishPoint];
    }
  }],

  FINISH: [{
    to: 'START',
    cond: function cond(d) {
      return [d.isInnerFitsContainer === false];
    }
  }, {
    to: 'BOTTOM_FIXED',
    cond: function cond(d) {
      return [d.innerOffsetBottom + d.bottomSpacing <= d.finishPoint, d.viewportBottom <= d.finishPoint];
    }
  }, {
    to: 'TOP_FIXED',
    cond: function cond(d) {
      return [d.scrollDirection === 'up', d.viewportTop <= d.innerOffsetTop - d.topSpacing];
    }
  }]
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  START: function START(d, innerEl) {
    innerEl.style.position = 'static';
    innerEl.style.top = 'auto';
    innerEl.style.bottom = 'auto';
  },

  TOP_FIXED: function TOP_FIXED(d, innerEl) {
    innerEl.style.position = 'fixed';
    innerEl.style.top = d.topSpacing + 'px';
    innerEl.style.bottom = 'auto';
  },

  UNFIXED: function UNFIXED(d, innerEl) {
    innerEl.style.position = 'absolute';
    innerEl.style.top = d.innerOffsetTop - d.startPoint + 'px';
    innerEl.style.bottom = 'auto';
  },

  BOTTOM_FIXED: function BOTTOM_FIXED(d, innerEl) {
    innerEl.style.position = 'fixed';
    innerEl.style.top = 'auto';
    innerEl.style.bottom = d.bottomSpacing + 'px';
  },

  FINISH: function FINISH(d, innerEl) {
    innerEl.style.position = 'absolute';
    innerEl.style.top = 'auto';
    innerEl.style.bottom = '0';
  }
});

/***/ })
/******/ ]);