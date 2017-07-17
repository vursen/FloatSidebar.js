import rAFScrollWrapper from './rAFScrollWrapper.js';

import TRANSITIONS  from './transitions.js';
import STATE_STYLES from './stateStyles.js';

// const DefaultFastDOMAdapter = (() => {
//   const measure = (callback) => Promise.resolve(callback())
//   const mutate  = (callback) => Promise.resolve(callback())

//   return { mutate, measure }
// })();

function StickySidebar(sidebarEl, props) {
  props = {
    topSpacing: 0,
    bottomSpacing: 0,
    relativeEl: null,
    innerEl: null,
    // FastDOMAdapter: DefaultFastDOMAdapter,
    ...props,
  };

  let __state = 'START';
  let __lastDimensions = {};

  let __sidebarEl      = sidebarEl;
  let __innerEl        = props.innerEl;
  let __relativeEl     = props.relativeEl;

  // const measureDOM = (callback) => props.FastDOMAdapter.measure(callback);
  // const mutateDOM  = (callback) => props.FastDOMAdapter.mutate(callback);

  const findTransition = (state, dimensions) => {
    return TRANSITIONS[state].find(({ cond }) => (
      cond(dimensions).every((value) => value)
    ));
  }

  const performTransition = ({ to: newState }, dimensions) => {
    __state = newState;

    console.log(newState, dimensions)

    STATE_STYLES[newState](dimensions, __innerEl);
  };

  const updateTick = rAFScrollWrapper(() => {
    const dimensions = calculateDimensions();
    const transition = findTransition(__state, dimensions);

    if (transition) {
      performTransition(transition, dimensions);
    }

    if (
      __lastDimensions.wayHeight   - dimensions.wayHeight   !== 0 ||
      __lastDimensions.innerHeight - dimensions.innerHeight !== 0
    ) updateSidebarStyles(dimensions);

    __lastDimensions = dimensions;
  });

  const calculateDimensions = () => {
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

    let scrollDirection = 'notChanged';

    scrollDirection = __lastDimensions.viewportTop < viewportTop ? 'down' : scrollDirection;
    scrollDirection = __lastDimensions.viewportTop > viewportTop ? 'up'   : scrollDirection;

    return {
      startPoint:           startPoint,
      finishPoint:          finishPoint,
      wayHeight:            finishPoint - startPoint,
      innerHeight:          innerHeight,
      innerOffsetTop:       innerOffsetTop,
      innerOffsetBottom:    innerOffsetBottom,
      isInnerFitsViewport:  innerHeight + props.topSpacing + props.bottomSpacing < viewportHeight,
      isInnerFitsContainer: innerHeight < relativeElRect.height,
      viewportTop:          viewportTop,
      viewportBottom:       viewportTop + viewportHeight,
      viewportHeight:       viewportHeight,
      scrollDirection:      scrollDirection,
      topSpacing:           props.topSpacing,
      bottomSpacing:        props.bottomSpacing,
    };
  };

  const updateSidebarStyles = (d) => {
    const height = d.wayHeight > d.innerHeight ? d.wayHeight : d.innerHeight;

    __sidebarEl.style.height = height + 'px';
  };

  const forceUpdate = () => {
    updateTick();
  }

  const destroy = () => {
    window.removeEventListener('scroll', updateTick);
    window.removeEventListener('resize', updateTick);
  }

  const init = () => requestAnimationFrame(() => {
    const dimensions = calculateDimensions();
    const transition = findTransition(__state, dimensions);

    if (transition) performTransition(transition, dimensions);

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