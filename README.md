# FloatSidebar.js
[![NPM version](https://img.shields.io/npm/v/float-sidebar.svg?style=flat)](https://www.npmjs.org/package/float-sidebar)

> A lightweight (2kb gzipped), zero-dependency javascript library for making a sidebar float.

[Demo](https://jsfiddle.net/vursen/cj4erfnj)

The library is designed on top of the finite state machine pattern, which results in a straightforward solution that is pretty easy to understand and maintain.

More about the approach in [the article on medium](https://medium.com/@vursen/state-machine-for-sticky-blocks-70ca0bf4ee97) (in Russian)

## Install

```bash
npm install float-sidebar --save
```
or
```bash
yarn add float-sidebar
```
or
```html
<script src="./path/to/float-sidebar.min.js"></script>
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
  /* Required in case of using an infinite scroll */
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

const sidebar  = document.querySelector('.sidebar');
const relative = document.querySelector('.content');

const floatSidebar = FloatSidebar({
  sidebar,
  relative,
  topSpacing: 20,
  bottomSpacing: 20
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
| topSpacing    | `number`      | `0`                         | The space from the top of the viewport. It is used when the sidebar is fixed. |
| bottomSpacing | `number`      | `0`                         | The space from the bottom of the viewport. It is used when the sidebar is fixed. |

## Instance API

| Method        | Description   |
|:------------- |:------------- |
| forceUpdate() | Recalculates all the dimensions and finally updates the position of the sidebar. |
| destroy()     | Disposes the DOM listeners. |


## Similar libraries

- https://github.com/abouolia/sticky-sidebar

## License

FloatSidebar.js is released under the MIT license.

Author Sergey Vinogradov
