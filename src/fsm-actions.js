import * as states from './fsm-states.js';

export default {
  [states.START]: (_d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = '0';
    $sideInner.style.bottom   = 'auto';
    $sideInner.dataset.state  = 'START';
  },

  [states.TOP_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = `${d.topSpacing}px`;
    $sideInner.style.bottom   = 'auto';
    $sideInner.dataset.state  = 'TOP_FIXED';
  },

  [states.UNFIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = `${d.sideInnerTop - d.startPoint + 1}px`;
    $sideInner.style.bottom   = 'auto';
    $sideInner.dataset.state  = 'UNFIXED';
  },

  [states.BOTTOM_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = `${d.bottomSpacing}px`;
    $sideInner.dataset.state  = 'BOTTOM_FIXED';
  },

  [states.FINISH]: (_d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = '0';
    $sideInner.dataset.state  = 'FINISH';
  }
}
