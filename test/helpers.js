export function fixtureSidebar() {
  let wrapper;

  wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'flex-start';
  wrapper.style.paddingTop = '150vh';
  wrapper.style.paddingBottom = '150vh';
  wrapper.innerHTML = `
    <div class="content" style="background: red; flex: 1;">Content</div>
    <div class="sidebar" style="width: 200px; position: relative;">
      <div class="sidebar__inner" style="background: blue;">Sidebar</div>
    </div>
  `;

  document.body.appendChild(wrapper);

  afterEach(() => {
    wrapper.remove();
  });

  return wrapper;
}

export function queryContent(element) {
  return element.querySelector('.content');
}

export function querySidebar(element) {
  return element.querySelector('.sidebar');
}

export function querySidebarInner(element) {
  return element.querySelector('.sidebar__inner');
}

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export async function scrollTo(top) {
  window.scrollTo({ top });
  await nextFrame();
}

export async function smoothScrollTo(top) {
  top = Math.max(top, 0);
  top = Math.min(top, document.body.clientHeight - window.innerHeight);

  const delta = top - window.pageYOffset;
  const step = Math.sign(delta);

  while (top - window.pageYOffset !== 0) {
    window.scrollTo({ top: window.pageYOffset + step });
  }

  await nextFrame();
}

export function getElementTop(element) {
  return element.getBoundingClientRect().top + window.pageYOffset;
}

export function getElementBottom(element) {
  return element.getBoundingClientRect().bottom + window.pageYOffset;
}

export function getElementHeight(element) {
  return element.getBoundingClientRect().height;
}
