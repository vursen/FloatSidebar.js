export default function rAFScrollWrapper(callback) {
  let ticked = true;

  return () => {
    if (!ticked) return false;

    window.requestAnimationFrame(() => {
      ticked = true;

      callback();
    });

    ticked = false;
  }
}