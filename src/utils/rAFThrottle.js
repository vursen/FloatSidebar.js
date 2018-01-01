function rAFThrottle(callback) {
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

export default rAFThrottle;