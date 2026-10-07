import { requestAnimationFrameThrottle } from './throttle.js';

let computeViewportDimensions = ($viewport) => {
  if ($viewport === window) {
    let top    = window.pageYOffset;
    let height = window.innerHeight;

    return { top, bottom: top + height, height, offsetTop: 0, offsetBottom: 0 }
  }

  let rect   = $viewport.getBoundingClientRect();
  let top    = $viewport.scrollTop;
  let height = $viewport.clientHeight;

  // Where the viewport's padding box sits in the window. Elements are measured
  // relative to it and the fixed states are offset by it, so that
  // `position: fixed` lands inside the viewport element instead of the window.
  let offsetTop    = rect.top + $viewport.clientTop;
  let offsetBottom = window.innerHeight - offsetTop - height;

  return { top, bottom: top + height, height, offsetTop, offsetBottom }
}

// Positions are relative to the viewport's scrollable content:
// 0 is the top of the content when the viewport is scrolled to the top.
let computeElementDimensions = ($element, viewport) => {
  let rect = $element.getBoundingClientRect();

  return {
    top:    rect.top    - viewport.offsetTop + viewport.top,
    bottom: rect.bottom - viewport.offsetTop + viewport.top,
    height: rect.height
  }
}

function createDimensionObserver(callback, {
  $viewport,
  $relative,
  $sideInner,
  $sideOuter,
  topSpacing,
  bottomSpacing
}) {
  let prevDimensions = {};

  let computeScrollDirection = (viewportTop) => (
    prevDimensions.viewportTop < viewportTop ? 'down' :
    prevDimensions.viewportTop > viewportTop ? 'up'   : 'notChanged'
  )

  let computeDimensions = () => {
    let dim$viewport  = computeViewportDimensions($viewport);
    let dim$sideInner = computeElementDimensions($sideInner, dim$viewport);
    let dim$sideOuter = computeElementDimensions($sideOuter, dim$viewport);
    let dim$relative  = computeElementDimensions($relative,  dim$viewport);

    let scrollDirection = computeScrollDirection(dim$viewport.top);

    let startPoint  = dim$sideOuter.top;
    let finishPoint = dim$relative.bottom;

    let pathHeight  = finishPoint - startPoint;

    let isSideInnerWithinViewport = dim$sideInner.height + topSpacing + bottomSpacing < dim$viewport.height;
    let isSideInnerWithinPath     = dim$sideInner.height < pathHeight;

    let sideOuterHeight = Math.max(dim$sideInner.height, pathHeight);

    return {
      startPoint,
      finishPoint,
      topSpacing,
      bottomSpacing,
      scrollDirection,
      isSideInnerWithinPath,
      isSideInnerWithinViewport,

      sideOuterHeight: sideOuterHeight,

      viewportTop:    dim$viewport.top,
      viewportBottom: dim$viewport.bottom,

      viewportOffsetTop:    dim$viewport.offsetTop,
      viewportOffsetBottom: dim$viewport.offsetBottom,

      sideInnerTop:    dim$sideInner.top,
      sideInnerBottom: dim$sideInner.bottom,
      sideInnerHeight: dim$sideInner.height,
    }
  }

  let tick = () => {
    let dimensions = computeDimensions();

    callback(prevDimensions, dimensions);

    prevDimensions = dimensions;
  };

  let throttledTick = requestAnimationFrameThrottle(tick);

  let resizeObserver = new ResizeObserver(throttledTick);
  let $resizeTarget  = $viewport === window ? document.documentElement : $viewport;

  let start = () => {
    $viewport.addEventListener('scroll', throttledTick);
    resizeObserver.observe($resizeTarget);

    // Scrolling the window moves a custom viewport element within the window,
    // which moves the fixed states.
    if ($viewport !== window) {
      window.addEventListener('scroll', throttledTick);
    }

    tick();
  }

  let stop = () => {
    $viewport.removeEventListener('scroll', throttledTick);
    resizeObserver.disconnect();

    if ($viewport !== window) {
      window.removeEventListener('scroll', throttledTick);
    }
  }

  return { start, stop, tick };
}

export default createDimensionObserver;
