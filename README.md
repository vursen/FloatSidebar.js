# FloatSidebar.js
[![NPM version](https://img.shields.io/npm/v/float-sidebar.svg?style=flat)](https://www.npmjs.org/package/float-sidebar)

> Lightweight (2kb gzipped), vanilla javascript plugin for making smart float sidebars.

## Example

[JSFiddle](https://jsfiddle.net/vursen/cj4erfnj)

## Install

```bash
npm install float-sidebar
```
```bash
yarn add float-sidebar
```
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

#### sidebarInner

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

destroy plugin (doesn't delete DOM elements)

## License

FloatSidebar.js is released under the MIT license.

Author Sergey Vinogradov
