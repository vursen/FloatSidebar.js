import { requestAnimationFrameThrottle } from './throttle.js';

let computeViewportDimensions = ($viewport) => {
  let height = $viewport.clientHeight || $viewport.innerHeight;
  let top    = $viewport.scrollTop    || $viewport.pageYOffset;
  let bottom = top + height;

  return { top, bottom, height }
}

let computeElementDimensions = ($element, viewportTop) => {
  let rect = $element.getBoundingClientRect();

  return {
    top:    rect.top    + viewportTop,
    bottom: rect.bottom + viewportTop,
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
    let dim$sideInner = computeElementDimensions($sideInner, dim$viewport.top);
    let dim$sideOuter = computeElementDimensions($sideOuter, dim$viewport.top);
    let dim$relative  = computeElementDimensions($relative,  dim$viewport.top);

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

  let start = () => {
    $viewport.addEventListener('scroll', throttledTick);
    $viewport.addEventListener('resize', throttledTick);

    tick();
  }

  let stop = () => {
    $viewport.removeEventListener('scroll', throttledTick);
    $viewport.removeEventListener('resize', throttledTick);
  }

  return { start, stop, tick };
}

export default createDimensionObserver;
