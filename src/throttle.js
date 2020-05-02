export function requestAnimationFrameThrottle(callback) {
  let requestId;

  return () => {
    if (!requestId) {
      requestId = requestAnimationFrame(() => {
        requestId = null;
        callback();
      });
    }
  }
}
