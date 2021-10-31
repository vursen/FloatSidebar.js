import * as states from './fsm-states.js';

export default {
  [states.START]: (_d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = '0';
    $sideInner.style.bottom   = 'auto';
  },

  [states.TOP_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = `${d.topSpacing}px`;
    $sideInner.style.bottom   = 'auto';
  },

  [states.UNFIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = `${d.sideInnerTop - d.startPoint}px`;
    $sideInner.style.bottom   = 'auto';
  },

  [states.BOTTOM_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = `${d.bottomSpacing}px`;
  },

  [states.FINISH]: (_d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = '0';
  }
}
