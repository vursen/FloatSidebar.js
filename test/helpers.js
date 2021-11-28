import { fixture, html } from '@open-wc/testing';

export function fixtureSidebar() {
  return fixture(html`
    <div class="wrapper" style="display: flex; align-items: flex-start; padding-top: 150vh; padding-bottom: 150vh;">
      <div class="content" style="flex: 1;"></div>
      <div class="sidebar" style="width: 200px; position: relative;">
        <div class="sidebar__inner"></div>
      </div>
    </div>
  `)
}

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export async function scrollTo(top, options = {}) {
  const steps = options.steps || 1;
  const delta = top - window.pageYOffset;

  for (let i = 1; i <= steps; i++) {
    window.scrollTo({ top: window.pageYOffset + i * delta / steps });
    await nextFrame();
  }

}

export function getElementTop(element) {
  return element.getBoundingClientRect().top + window.pageYOffset;
}

export function getElementBottom(element) {
  return element.getBoundingClientRect().bottom + window.pageYOffset;
}
