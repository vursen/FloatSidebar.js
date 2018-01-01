import fsmTransitions from './constants/fsmTransitions';
import fsmActions     from './constants/fsmActions';
import * as fsmStates from './constants/fsmStates';

import createFSM               from './utils/createFSM';
import createDimensionObserver from './utils/createDimensionObserver';

function FloatSidebar(options) {
  const $sideOuter = options.sidebar;
  const $sideInner = options.sidebarInner || $sideOuter.firstElementChild;
  const $relative  = options.relative;

  const topSpacing    = options.topSpacing    || 0;
  const bottomSpacing = options.bottomSpacing || 0;

  const fsm = createFSM({
    actions:      fsmActions,
    transitions:  fsmTransitions,
    initialState: fsmStates.STATE_START
  });

  const dimensionObserver = createDimensionObserver(
    {
      $sideOuter,
      $sideInner,
      $relative,
      topSpacing,
      bottomSpacing
    },

    (prevDimensions, dimensions) => {
      const transition = fsm.findTransitionFor(dimensions);

      if (transition) {
        fsm.performTransition(transition)(dimensions, {
          $sideInner,
          $sideOuter,
          $relative
        });
      }

      updateSideOuterHeight(prevDimensions, dimensions);
    }
  )

  const updateSideOuterHeight = (prevDimensions, dimensions) => {
    const isHeightChanged = Math.abs(
      (prevDimensions.sideOuterHeight || 0) - dimensions.sideOuterHeight
    ) >= 1;

    if (isHeightChanged) {
      $sideOuter.style.height = `${dimensions.sideOuterHeight}px`;
    }
  }

  const forceUpdate = () => {
    dimensionObserver.tick();
  }

  const destroy = () => {
    dimensionObserver.stop();
  }

  const init = () => {
    $sideOuter.style.willChange = 'height';
    $sideInner.style.width      = 'inherit';
    $sideInner.style.transform  = 'translateZ(0)';
    $sideInner.style.willChange = 'transform';

    dimensionObserver.start();
  }

  requestAnimationFrame(init);

  return { forceUpdate, destroy };
}

export default FloatSidebar;
