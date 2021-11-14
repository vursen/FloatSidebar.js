export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export async function scrollTo(top) {
  window.scrollTo({ top });
  await nextFrame();
}

export function getElementTop(element) {
  return element.getBoundingClientRect().top + window.pageYOffset;
}

export function getElementBottom(element) {
  return element.getBoundingClientRect().bottom + window.pageYOffset;
}
