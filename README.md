# FloatSidebar.js
[![NPM version](https://img.shields.io/npm/v/float-sidebar.svg?style=flat)](https://www.npmjs.org/package/float-sidebar)

> Lightweight (2kb gzipped), zero-dependency vanilla javascript library for making float sidebars

[Demo](https://jsfiddle.net/vursen/cj4erfnj)

## Install

```bash
npm install float-sidebar
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
<div>
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

floadSidebar.forceUpdate();

// ...

floatSidebar.destroy();
```

```css
.sidebar {
  /* Required */
  position: relative;

  /* Required. Sidebar element should have a fixed width */
  width: 220px;
}
```

## Options

#### sidebar

Type: `Element`<br/>
Required

Sidebar element

#### relative

Type: `Element`<br/>
Required

Sidebar relative element, e.g. main content

#### viewport

Type: `Element`<br/>
Defaults: `window`

Viewport element

#### sidebarInner

Type: `Element`<br/>
Defaults: `first element child of sidebar element`

Sidebar inner element

#### topSpacing

Type: `Integer`<br/>
Defaults: `0`

Viewport top spacing when sidebar fixed

#### bottomSpacing

Type: `Integer`<br/>
Defaults: `0`

Viewport bottom spacing when sidebar fixed

## Instance API

#### forceUpdate()

Force recalculate and update sidebar position

#### destroy()

Destroy plugin (doesn't delete DOM elements)

## License

FloatSidebar.js is released under the MIT license.

Author Sergey Vinogradov
