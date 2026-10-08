import * as fsmStates from './fsm-states';
import fsmActions     from './fsm-actions';
import fsmTransitions from './fsm-transitions';

import createFSM               from './fsm';
import createDimensionObserver from './dimension-observer';

function FloatSidebar(options) {
  let $viewport  = options.viewport || window;
  let $sideOuter = options.sidebar;
  let $sideInner = options.sidebarInner || $sideOuter.firstElementChild;
  let $relative  = options.relative;

  let topSpacing    = options.topSpacing    || 0;
  let bottomSpacing = options.bottomSpacing || 0;

  let onStateChange = options.onStateChange;

  let fsm = createFSM({
    actions:      fsmActions,
    transitions:  fsmTransitions,
    initialState: fsmStates.START
  });

  let dimensionObserver = createDimensionObserver(
    (prevDimensions, dimensions) => {
      let transition = fsm.findTransitionFor(dimensions);
      let elements   = { $sideInner, $sideOuter, $relative };

      if (transition) {
        fsm.performTransition(transition)(dimensions, elements);

        if (onStateChange) {
          onStateChange(transition.to);
        }
      } else if (isViewportOffsetChanged(prevDimensions, dimensions)) {
        // The viewport element moved within the window. The fixed states are
        // positioned against the window, so the current state's styles have
        // to be applied again.
        fsm.performAction(dimensions, elements);
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

  let isViewportOffsetChanged = (prevDimensions, dimensions) => (
    (prevDimensions.viewportOffsetTop    || 0) !== dimensions.viewportOffsetTop ||
    (prevDimensions.viewportOffsetBottom || 0) !== dimensions.viewportOffsetBottom
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
