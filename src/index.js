import fsmTransitions from './constants/fsmTransitions';
import fsmActions     from './constants/fsmActions';
import * as fsmStates from './constants/fsmStates';

import createFSM               from './utils/createFSM';
import createDimensionObserver from './utils/createDimensionObserver';

function FloatSidebar(options) {
  let $viewport  = options.viewport || window;
  let $sideOuter = options.sidebar;
  let $sideInner = options.sidebarInner || $sideOuter.firstElementChild;
  let $relative  = options.relative;

  let topSpacing    = options.topSpacing    || 0;
  let bottomSpacing = options.bottomSpacing || 0;

  let fsm = createFSM({
    actions:      fsmActions,
    transitions:  fsmTransitions,
    initialState: fsmStates.STATE_START
  });

  let dimensionObserver = createDimensionObserver(
    (prevDimensions, dimensions) => {
      let transition = fsm.findTransitionFor(dimensions);

      if (transition) {
        fsm.performTransition(transition)(dimensions, {
          $sideInner,
          $sideOuter,
          $relative
        });
      }

      updateSideOuterHeight(prevDimensions, dimensions);
    },

    {
      $viewport,
      $sideOuter,
      $sideInner,
      $relative,
      topSpacing,
      bottomSpacing
    }
  )

  let updateSideOuterHeight = (prevDimensions, dimensions) => {
    let isHeightChanged = Math.abs(
      (prevDimensions.sideOuterHeight || 0) - dimensions.sideOuterHeight
    ) >= 1;

    if (isHeightChanged) {
      $sideOuter.style.height = `${dimensions.sideOuterHeight}px`;
    }
  }

  let forceUpdate = () => {
    dimensionObserver.tick();
  }

  let destroy = () => {
    dimensionObserver.stop();
  }

  let init = () => {
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
