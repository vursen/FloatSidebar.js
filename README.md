# FloatSidebar.js

[![NPM version](https://img.shields.io/npm/v/float-sidebar.svg?style=flat)](https://www.npmjs.org/package/float-sidebar)

FloatSidebar.js is a lightweight (2kb gzipped), zero-dependency JavaScript library that creates sticky, floating sidebars. It keeps the sidebar visible in the viewport by dynamically sticking it to the top or bottom based on scroll direction and sidebar height.

1. Tall Sidebars (taller than the viewport), scrolls with the content, sticking to the bottom when scrolling down and to the top when scrolling up. _(see the left sidebar in the video)_.
2. Short Sidebars (shorter than the viewport): Stays fixed at the top during scrolling. _(see the right sidebar in the video)_.

https://user-images.githubusercontent.com/5039436/164990489-0424b5ab-c231-4f5c-bc1b-fc3f9594e347.mov

[Demo](https://js-2sy9en.stackblitz.io)

## Install

```bash
npm install float-sidebar --save
```

or

```bash
yarn add float-sidebar
```

## Usage

```html
<div class="wrapper">
  <div class="content">
    <!-- Content -->
  </div>

  <div class="sidebar">
    <div class="sidebar__inner">
      <!-- Sidebar content -->
    </div>
  </div>
</div>
```

```css
.wrapper {
  display: flex;
  /* Required when using infinite scroll */
  align-items: flex-start;
}

.sidebar {
  /* Required */
  position: relative;

  /* Required. The sidebar element should have a fixed width */
  width: 220px;
}
```

```javascript
import FloatSidebar from 'float-sidebar';

const sidebar = document.querySelector('.sidebar');
const relative = document.querySelector('.content');

const floatSidebar = FloatSidebar({
  sidebar,
  relative,
  topSpacing: 20,
  bottomSpacing: 20,
});

// ...

floatSidebar.forceUpdate();

// ...

floatSidebar.destroy();
```

## Options

| Name          | Type          | Default                     | Description      |
|:------------- |:------------- |:--------------------------- | ---------------- |
| sidebar       | `HTMLElement` | Required                    | The sidebar element |
| relative      | `HTMLElement` | Required                    | The sidebar relative element, e.g. the main content |
| viewport      | `HTMLElement` | `window`                    | The viewport element |
| sidebarInner  | `HTMLElement` | `sidebar.firstElementChild` | The sidebar inner element |
| topSpacing    | `number`      | `0`                         | The space from the top of the viewport. Used when the sidebar is in fixed state. |
| bottomSpacing | `number`      | `0`                         | The space from the bottom of the viewport. Used when the sidebar is in fixed state. |

## Instance API

| Method        | Description                                                    |
| :------------ | :------------------------------------------------------------- |
| forceUpdate() | Recalculates the dimensions and updates the sidebar's position |
| destroy()     | Cleans up DOM references and listeners                         |

## Similar libraries

- https://github.com/abouolia/sticky-sidebar

## License

FloatSidebar.js is released under the MIT license.

Author Sergey Vinogradov
