import {
  STATE_START,
  STATE_TOP_FIXED,
  STATE_UNFIXED,
  STATE_BOTTOM_FIXED,
  STATE_FINISH
} from './fsmStates.js';

export default {
  [STATE_START]: (d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = '0';
    $sideInner.style.bottom   = 'auto';
  },

  [STATE_TOP_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = `${d.topSpacing}px`;
    $sideInner.style.bottom   = 'auto';
  },

  [STATE_UNFIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = `${d.sideInnerTop - d.startPoint}px`;
    $sideInner.style.bottom   = 'auto';
  },

  [STATE_BOTTOM_FIXED]: (d, { $sideInner }) => {
    $sideInner.style.position = 'fixed';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = `${d.bottomSpacing}px`;
  },

  [STATE_FINISH]: (d, { $sideInner }) => {
    $sideInner.style.position = 'absolute';
    $sideInner.style.top      = 'auto';
    $sideInner.style.bottom   = '0';
  }
}
