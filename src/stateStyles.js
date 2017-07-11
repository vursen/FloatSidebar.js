export default const STATE_STYLES = {
  START: (d, innerEl) => {
    innerEl.style.position = 'static';
    innerEl.style.top      = 'auto';
    innerEl.style.bottom   = 'auto';
  },

  TOP_FIXED: (d, innerEl) => {
    innerEl.style.position = 'fixed';
    innerEl.style.top      = `${d.topSpacing}px`;
    innerEl.style.bottom   = 'auto';
  },

  UNFIXED: (d, innerEl) => {
    innerEl.style.position = 'absolute';
    innerEl.style.top      = `${d.innerOffsetTop - d.startPoint}px`;
    innerEl.style.bottom   = 'auto';
  },

  BOTTOM_FIXED: (d, innerEl) => {
    innerEl.style.position = 'fixed';
    innerEl.style.top      = 'auto';
    innerEl.style.bottom   = `${d.bottomSpacing}px`;
  },

  FINISH: (d, innerEl) => {
    innerEl.style.position = 'absolute';
    innerEl.style.top      = 'auto';
    innerEl.style.bottom   = '0';
  }
}
