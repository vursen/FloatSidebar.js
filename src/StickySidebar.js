import rAFScrollWrapper from './rAFScrollWrapper.js';

import TRANSITIONS  from './transitions.js';
import STATE_STYLES from './stateStyles.js';

// const DefaultFastDOMAdapter = (() => {
//   const measure = (callback) => Promise.resolve(callback())
//   const mutate  = (callback) => Promise.resolve(callback())

//   return { mutate, measure }
// })();

function StickySidebar(el, props) {
  props = {
    topSpacing: 0,
    bottomSpacing: 0,
    relativeEl: null,
    // FastDOMAdapter: DefaultFastDOMAdapter,
    ...props,
  };

  let __state = 'START';
  let __lastViewportTop = -1;
  let __lastFinishPoint = -1;

  let __wrapperEl  = el;
  let __innerEl    = el.firstChild;
  let __relativeEl = props.relativeEl;

  // const measureDOM = (callback) => props.FastDOMAdapter.measure(callback);
  // const mutateDOM  = (callback) => props.FastDOMAdapter.mutate(callback);

  const findTransition = (state, dimensions) => {
    return TRANSITIONS[state].find(({ cond }) => (
      cond(dimensions).every((value) => value)
    ));
  }

  const performTransition = ({ to: newState }, dimensions) => {
    __state = newState;

    STATE_STYLES[newState](dimensions, __innerEl);
  };

  const updateTick = rAFScrollWrapper(() => {
    const dimensions = calculateDimensions();
    const transition = findTransition(__state, dimensions);

    if (transition) {
      performTransition(transition, dimensions);
    }

    if (__lastFinishPoint - dimensions.finishPoint !== 0) {
      updateWrapperStyles(dimensions);
    }

    __lastViewportTop = dimensions.viewportTop;
    __lastFinishPoint = dimensions.finishPoint;
  });

  const calculateDimensions = () => {
    const viewportTop       = window.pageYOffset;
    const viewportHeight    = window.innerHeight;

    const innerElRect       = __innerEl.getBoundingClientRect();
    const wrapperElRect     = __wrapperEl.getBoundingClientRect();
    const relativeElRect    = __relativeEl.getBoundingClientRect();

    const innerOffsetTop    = innerElRect.top    + viewportTop;
    const innerOffsetBottom = innerElRect.bottom + viewportTop;
    const innerHeight       = innerElRect.height;

    const startPoint  = wrapperElRect.top     + viewportTop;
    const finishPoint = relativeElRect.bottom + viewportTop;

    let scrollDirection = 'notChanged';

    scrollDirection = __lastViewportTop < viewportTop ? 'down' : scrollDirection;
    scrollDirection = __lastViewportTop > viewportTop ? 'up'   : scrollDirection;

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

  const updateWrapperStyles = (d) => {
    const height = d.wayHeight > d.innerHeight ? d.wayHeight : d.innerHeight;

    __wrapperEl.style.height = height + 'px';
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

    updateWrapperStyles(dimensions);

    __wrapperEl.style.willChange = 'height';

    __innerEl.style.width = 'inherit';
    __innerEl.style.willChange = 'transform';

    __lastViewportTop = dimensions.viewportTop;
    __lastFinishPoint = dimensions.finishPoint;

    window.addEventListener('scroll', updateTick);
    window.addEventListener('resize', updateTick);
  });

  init();

  return { forceUpdate, destroy };
}

export default StickySidebar;