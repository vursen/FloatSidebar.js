import rAFThrottle from './rAFThrottle';

const computeViewportDimensions = () => {
  const height = window.innerHeight;
  const top    = window.pageYOffset;
  const bottom = top + height;

  return { top, bottom, height }
}

const computeElementDimensions = ($element, viewportTop) => {
  const rect = $element.getBoundingClientRect();

  return {
    top:    rect.top    + viewportTop,
    bottom: rect.bottom + viewportTop,
    height: rect.height
  }
}

function createDimensionObserver({
  $sideInner,
  $sideOuter,
  $relative,
  topSpacing,
  bottomSpacing
}, callback) {
  let prevDimensions = {};

  const computeScrollDirection = (viewportTop) => (
    prevDimensions.viewportTop < viewportTop ? 'down' :
    prevDimensions.viewportTop > viewportTop ? 'up'   : 'notChanged'
  )

  const computeDimensions = () => {
    const {
      top:    viewportTop,
      bottom: viewportBottom,
      height: viewportHeight
    } = computeViewportDimensions();

    const {
      top:    sideInnerTop,
      bottom: sideInnerBottom,
      height: sideInnerHeight
    } = computeElementDimensions($sideInner, viewportTop);

    const {
      top:    sideOuterTop,
      bottom: sideOuterBottom
    } = computeElementDimensions($sideOuter, viewportTop);

    const {
      top:    relativeTop,
      bottom: relativeBottom
    } = computeElementDimensions($relative, viewportTop);

    const scrollDirection = computeScrollDirection(viewportTop);

    const startPoint  = sideOuterTop;
    const finishPoint = relativeBottom;
    const pathHeight  = finishPoint - startPoint;

    const isSideInnerFitsViewport = sideInnerHeight + topSpacing + bottomSpacing < viewportHeight;
    const isSideInnerFitsPath     = sideInnerHeight < pathHeight;

    const sideOuterHeight = Math.max(sideInnerHeight, pathHeight);

    return {
      startPoint,
      finishPoint,
      viewportTop,
      viewportBottom,
      sideOuterHeight,
      sideInnerTop,
      sideInnerBottom,
      sideInnerHeight,
      isSideInnerFitsViewport,
      isSideInnerFitsPath,
      scrollDirection,
      topSpacing,
      bottomSpacing
    }
  }

  const tick = rAFThrottle(() => {
    const dimensions = computeDimensions();

    callback(prevDimensions, dimensions);

    prevDimensions = dimensions;
  });

  const start = () => {
    window.addEventListener('scroll', tick);
    window.addEventListener('resize', tick);

    tick();
  }

  const stop = () => {
    window.removeEventListener('scroll', tick);
    window.removeEventListener('resize', tick);
  }

  return { start, stop, tick };
}

export default createDimensionObserver;