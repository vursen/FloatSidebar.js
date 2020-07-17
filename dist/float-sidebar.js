/*!
 * float-sidebar - Lightweight (2kb gzipped), zero-dependency javascript library for making float sidebars based on the finite state machine
 * @version v1.2.3
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
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/fsm-states.js
/* harmony default export */ var fsm_states = ({
  START: 'START',
  TOP_FIXED: 'TOP_FIXED',
  UNFIXED: 'UNFIXED',
  BOTTOM_FIXED: 'BOTTOM_FIXED',
  FINISH: 'FINISH'
});
// CONCATENATED MODULE: ./src/fsm-actions.js
var _states$START$states$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ var fsm_actions = (_states$START$states$ = {}, _defineProperty(_states$START$states$, fsm_states.START, function (_d, _ref) {
  var $sideInner = _ref.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = '0';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_states$START$states$, fsm_states.TOP_FIXED, function (d, _ref2) {
  var $sideInner = _ref2.$sideInner;

  $sideInner.style.position = 'fixed';
  $sideInner.style.top = d.topSpacing + 'px';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_states$START$states$, fsm_states.UNFIXED, function (d, _ref3) {
  var $sideInner = _ref3.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = d.sideInnerTop - d.startPoint + 'px';
  $sideInner.style.bottom = 'auto';
}), _defineProperty(_states$START$states$, fsm_states.BOTTOM_FIXED, function (d, _ref4) {
  var $sideInner = _ref4.$sideInner;

  $sideInner.style.position = 'fixed';
  $sideInner.style.top = 'auto';
  $sideInner.style.bottom = d.bottomSpacing + 'px';
}), _defineProperty(_states$START$states$, fsm_states.FINISH, function (_d, _ref5) {
  var $sideInner = _ref5.$sideInner;

  $sideInner.style.position = 'absolute';
  $sideInner.style.top = 'auto';
  $sideInner.style.bottom = '0';
}), _states$START$states$);
// CONCATENATED MODULE: ./src/fsm-transitions.js
var fsm_transitions_states$START$states$;

function fsm_transitions_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ var fsm_transitions = (fsm_transitions_states$START$states$ = {}, fsm_transitions_defineProperty(fsm_transitions_states$START$states$, fsm_states.START, [{
  to: fsm_states.FINISH,
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.viewportTop + d.sideInnerHeight >= d.finishPoint];
  }
}, {
  to: fsm_states.BOTTOM_FIXED,
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.isSideInnerFitsViewport === false, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}, {
  to: fsm_states.TOP_FIXED,
  when: function when(d) {
    return [d.isSideInnerFitsPath === true, d.isSideInnerFitsViewport === true, d.viewportTop >= d.startPoint - d.topSpacing];
  }
}]), fsm_transitions_defineProperty(fsm_transitions_states$START$states$, fsm_states.TOP_FIXED, [{
  to: fsm_states.START,
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: fsm_states.START,
  when: function when(d) {
    return [d.viewportTop <= d.startPoint - d.topSpacing];
  }
}, {
  to: fsm_states.FINISH,
  when: function when(d) {
    return [d.sideInnerBottom >= d.finishPoint];
  }
}, {
  to: fsm_states.UNFIXED,
  when: function when(d) {
    return [d.scrollDirection === 'down', d.isSideInnerFitsViewport === false];
  }
}]), fsm_transitions_defineProperty(fsm_transitions_states$START$states$, fsm_states.UNFIXED, [{
  to: fsm_states.START,
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: fsm_states.TOP_FIXED,
  when: function when(d) {
    return [d.viewportTop <= d.sideInnerTop - d.topSpacing];
  }
}, {
  to: fsm_states.TOP_FIXED,
  when: function when(d) {
    return [d.isSideInnerFitsViewport === true, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}, {
  to: fsm_states.BOTTOM_FIXED,
  when: function when(d) {
    return [d.isSideInnerFitsViewport === false, d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing];
  }
}]), fsm_transitions_defineProperty(fsm_transitions_states$START$states$, fsm_states.BOTTOM_FIXED, [{
  to: fsm_states.START,
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: fsm_states.UNFIXED,
  when: function when(d) {
    return [d.scrollDirection === 'up'];
  }
}, {
  to: fsm_states.TOP_FIXED,
  when: function when(d) {
    return [d.isSideInnerFitsViewport === true];
  }
}, {
  to: fsm_states.FINISH,
  when: function when(d) {
    return [d.sideInnerBottom >= d.finishPoint];
  }
}]), fsm_transitions_defineProperty(fsm_transitions_states$START$states$, fsm_states.FINISH, [{
  to: fsm_states.START,
  when: function when(d) {
    return [d.isSideInnerFitsPath === false];
  }
}, {
  to: fsm_states.BOTTOM_FIXED,
  when: function when(d) {
    return [d.sideInnerBottom + d.bottomSpacing <= d.finishPoint, d.viewportBottom <= d.finishPoint];
  }
}, {
  to: fsm_states.TOP_FIXED,
  when: function when(d) {
    return [d.viewportTop <= d.sideInnerTop - d.topSpacing];
  }
}]), fsm_transitions_states$START$states$);
// CONCATENATED MODULE: ./src/fsm.js
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

/* harmony default export */ var src_fsm = (createFSM);
// CONCATENATED MODULE: ./src/throttle.js
function requestAnimationFrameThrottle(callback) {
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
// CONCATENATED MODULE: ./src/dimension-observer.js


var computeViewportDimensions = function computeViewportDimensions($viewport) {
  var height = $viewport.clientHeight || $viewport.innerHeight;
  var top = $viewport.scrollTop || $viewport.pageYOffset;
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

function createDimensionObserver(callback, _ref) {
  var $viewport = _ref.$viewport,
      $relative = _ref.$relative,
      $sideInner = _ref.$sideInner,
      $sideOuter = _ref.$sideOuter,
      topSpacing = _ref.topSpacing,
      bottomSpacing = _ref.bottomSpacing;

  var prevDimensions = {};

  var computeScrollDirection = function computeScrollDirection(viewportTop) {
    return prevDimensions.viewportTop < viewportTop ? 'down' : prevDimensions.viewportTop > viewportTop ? 'up' : 'notChanged';
  };

  var computeDimensions = function computeDimensions() {
    var dim$viewport = computeViewportDimensions($viewport);
    var dim$sideInner = computeElementDimensions($sideInner, dim$viewport.top);
    var dim$sideOuter = computeElementDimensions($sideOuter, dim$viewport.top);
    var dim$relative = computeElementDimensions($relative, dim$viewport.top);

    var scrollDirection = computeScrollDirection(dim$viewport.top);

    var startPoint = dim$sideOuter.top;
    var finishPoint = dim$relative.bottom;

    var pathHeight = finishPoint - startPoint;

    var isSideInnerFitsViewport = dim$sideInner.height + topSpacing + bottomSpacing < dim$viewport.height;
    var isSideInnerFitsPath = dim$sideInner.height < pathHeight;

    var sideOuterHeight = Math.max(dim$sideInner.height, pathHeight);

    return {
      startPoint: startPoint,
      finishPoint: finishPoint,
      topSpacing: topSpacing,
      bottomSpacing: bottomSpacing,
      scrollDirection: scrollDirection,
      isSideInnerFitsPath: isSideInnerFitsPath,
      isSideInnerFitsViewport: isSideInnerFitsViewport,

      sideOuterHeight: sideOuterHeight,

      viewportTop: dim$viewport.top,
      viewportBottom: dim$viewport.bottom,

      sideInnerTop: dim$sideInner.top,
      sideInnerBottom: dim$sideInner.bottom,
      sideInnerHeight: dim$sideInner.height
    };
  };

  var tick = requestAnimationFrameThrottle(function () {
    var dimensions = computeDimensions();

    callback(prevDimensions, dimensions);

    prevDimensions = dimensions;
  });

  var start = function start() {
    $viewport.addEventListener('scroll', tick);
    $viewport.addEventListener('resize', tick);

    tick();
  };

  var stop = function stop() {
    $viewport.removeEventListener('scroll', tick);
    $viewport.removeEventListener('resize', tick);
  };

  return { start: start, stop: stop, tick: tick };
}

/* harmony default export */ var dimension_observer = (createDimensionObserver);
// CONCATENATED MODULE: ./src/index.js







function FloatSidebar(options) {
  var $viewport = options.viewport || window;
  var $sideOuter = options.sidebar;
  var $sideInner = options.sidebarInner || $sideOuter.firstElementChild;
  var $relative = options.relative;

  var topSpacing = options.topSpacing || 0;
  var bottomSpacing = options.bottomSpacing || 0;

  var fsm = src_fsm({
    actions: fsm_actions,
    transitions: fsm_transitions,
    initialState: fsm_states.START
  });

  var dimensionObserver = dimension_observer(function (prevDimensions, dimensions) {
    var transition = fsm.findTransitionFor(dimensions);

    if (transition) {
      fsm.performTransition(transition)(dimensions, {
        $sideInner: $sideInner,
        $sideOuter: $sideOuter,
        $relative: $relative
      });
    }

    updateSideOuterHeight(prevDimensions, dimensions);
  }, {
    $viewport: $viewport,
    $sideOuter: $sideOuter,
    $sideInner: $sideInner,
    $relative: $relative,
    topSpacing: topSpacing,
    bottomSpacing: bottomSpacing
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

/* harmony default export */ var src = __webpack_exports__["default"] = (FloatSidebar);

/***/ })
/******/ ])["default"];
});