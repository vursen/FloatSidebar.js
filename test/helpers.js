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

export function fixtureCustomViewport() {
  return fixture(html`
    <div style="position: fixed; inset: 0;">
      <div class="viewport" style="position: absolute; top: 100px; left: 0; right: 0; bottom: 0; overflow: auto;">
        <div class="wrapper" style="display: flex; align-items: flex-start; padding-top: 50px; padding-bottom: 150vh;">
          <div class="content" style="flex: 1;"></div>
          <div class="sidebar" style="width: 200px; position: relative;">
            <div class="sidebar__inner"></div>
          </div>
        </div>
      </div>
    </div>
  `)
}

export async function scrollElementTo(element, top, options = {}) {
  const steps = options.steps || 1;
  const start = element.scrollTop;
  const delta = top - start;

  for (let i = 1; i <= steps; i++) {
    element.scrollTop = start + i * delta / steps;
    await nextFrame();
  }
}
