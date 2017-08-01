import rAFScrollWrapper from './utils/rAFScrollWrapper.js';

import TRANSITIONS  from './constants/transitions.js';
import STATE_STYLES from './constants/stateStyles.js';

function StickySidebar(sidebarEl, props) {
  let __state = 'START';
  let __lastDimensions = {};

  const __props = {
    topSpacing: 0,
    bottomSpacing: 0,
    relativeEl: null,
    innerEl: null,
    ...props,
  };

  const __sidebarEl  = sidebarEl;
  const __innerEl    = __props.innerEl;
  const __relativeEl = __props.relativeEl;

  const findTransition = (state, dimensions) => {
    return TRANSITIONS[state].find(({ cond }) => (
      cond(dimensions).every((value) => value)
    ));
  }

  const performTransition = ({ to: newState }, dimensions) => {
    __state = newState;

    STATE_STYLES[newState](dimensions, __innerEl);
  };

  const needUpdateSidebarStyles = (dimensions) => (
    __lastDimensions.wayHeight   - dimensions.wayHeight   !== 0 ||
    __lastDimensions.innerHeight - dimensions.innerHeight !== 0
  );

  const computeScrollDirection = (viewportTop) => (
    __lastDimensions.viewportTop < viewportTop ? 'down' :
    __lastDimensions.viewportTop > viewportTop ? 'up'   : 'notChanged'
  );

  const computeDimensions = () => {
    const viewportTop       = window.pageYOffset;
    const viewportHeight    = window.innerHeight;

    const innerElRect    = __innerEl.getBoundingClientRect();
    const sidebarElRect  = __sidebarEl.getBoundingClientRect();
    const relativeElRect = __relativeEl.getBoundingClientRect();

    const innerOffsetTop    = innerElRect.top    + viewportTop;
    const innerOffsetBottom = innerElRect.bottom + viewportTop;
    const innerHeight       = innerElRect.height;

    const startPoint  = sidebarElRect.top     + viewportTop;
    const finishPoint = relativeElRect.bottom + viewportTop;

    const scrollDirection = computeScrollDirection(viewportTop);

    return {
      startPoint:           startPoint,
      finishPoint:          finishPoint,
      wayHeight:            finishPoint - startPoint,
      innerHeight:          innerHeight,
      innerOffsetTop:       innerOffsetTop,
      innerOffsetBottom:    innerOffsetBottom,
      isInnerFitsViewport:  innerHeight + __props.topSpacing + __props.bottomSpacing < viewportHeight,
      isInnerFitsContainer: innerHeight < relativeElRect.height,
      viewportTop:          viewportTop,
      viewportBottom:       viewportTop + viewportHeight,
      viewportHeight:       viewportHeight,
      scrollDirection:      scrollDirection,
      topSpacing:           __props.topSpacing,
      bottomSpacing:        __props.bottomSpacing,
    };
  };

  const updateSidebarStyles = (dimensions) => {
    const height = dimensions.wayHeight > dimensions.innerHeight ?
      dimensions.wayHeight :
      dimensions.innerHeight;

    __sidebarEl.style.height = `${height}px`;
  };

  const updateTick = rAFScrollWrapper(() => {
    const dimensions = computeDimensions();
    const transition = findTransition(__state, dimensions);

    if (transition) {
      performTransition(transition, dimensions);
    }

    if (needUpdateSidebarStyles(dimensions)) {
      updateSidebarStyles(dimensions);
    }

    __lastDimensions = dimensions;
  });

  const forceUpdate = () => {
    updateTick();
  }

  const destroy = () => {
    window.removeEventListener('scroll', updateTick);
    window.removeEventListener('resize', updateTick);
  }

  const init = () => requestAnimationFrame(() => {
    const dimensions = computeDimensions();
    const transition = findTransition(__state, dimensions);

    if (transition) {
      performTransition(transition, dimensions);
    }

    updateSidebarStyles(dimensions);

    __sidebarEl.style.willChange = 'height';

    __innerEl.style.width      = 'inherit';
    __innerEl.style.willChange = 'transform';

    __lastDimensions = dimensions;

    window.addEventListener('scroll', updateTick);
    window.addEventListener('resize', updateTick);
  });

  init();

  return { forceUpdate, destroy };
}

export default StickySidebar;