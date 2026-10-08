import { fixture, html } from '@open-wc/testing';

export const VIEWPORT_ELEMENT_TOP = 100;

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

// A scrollable element placed below the top of the window, used as a viewport (#17).
export function fixtureCustomViewport() {
  return fixture(html`
    <div class="viewport" style="height: calc(100vh - ${VIEWPORT_ELEMENT_TOP}px); margin-top: ${VIEWPORT_ELEMENT_TOP}px; overflow: auto;"></div>
  `);
}

// Renders the sidebar into the viewport: the document for window, or the element.
export function fixtureSidebar(viewportElement = window) {
  const sidebar = html`
    <div class="wrapper" style="display: flex; align-items: flex-start; padding-top: 150vh; padding-bottom: 150vh;">
      <div class="content" style="flex: 1;"></div>
      <div class="sidebar" style="width: 200px; position: relative;">
        <div class="sidebar__inner"></div>
      </div>
    </div>
  `;

  return viewportElement === window
    ? fixture(sidebar)
    : fixture(sidebar, { parentNode: viewportElement });
}

// The helpers below take the viewport element first and work in its own
// coordinates, so that a suite reads the same for the window and for an element.

export function getScrollTop(viewportElement) {
  return viewportElement === window ? window.pageYOffset : viewportElement.scrollTop;
}

export function getScrollHeight(viewportElement) {
  return viewportElement === window ? document.body.clientHeight : viewportElement.scrollHeight;
}

export function getViewportHeight(viewportElement) {
  return viewportElement === window ? window.innerHeight : viewportElement.clientHeight;
}

export async function scrollTo(viewportElement, top, options = {}) {
  const steps = options.steps || 1;
  const start = getScrollTop(viewportElement);
  const delta = top - start;

  for (let i = 1; i <= steps; i++) {
    const next = start + i * delta / steps;

    if (viewportElement === window) {
      window.scrollTo({ top: next });
    } else {
      viewportElement.scrollTop = next;
    }

    await nextFrame();
  }
}

function getViewportOffsetTop(viewportElement) {
  return viewportElement === window
    ? 0
    : viewportElement.getBoundingClientRect().top + viewportElement.clientTop;
}

export function getElementTop(viewportElement, element) {
  return element.getBoundingClientRect().top - getViewportOffsetTop(viewportElement) + getScrollTop(viewportElement);
}

export function getElementBottom(viewportElement, element) {
  return element.getBoundingClientRect().bottom - getViewportOffsetTop(viewportElement) + getScrollTop(viewportElement);
}
