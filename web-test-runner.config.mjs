export default {
  // The tests drive scrolling with requestAnimationFrame, which browsers
  // throttle in background tabs. Run the test files one at a time.
  concurrency: 1,
};
