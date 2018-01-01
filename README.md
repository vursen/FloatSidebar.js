# FloatSidebar.js
[![NPM version](https://img.shields.io/npm/v/float-sidebar.svg?style=flat)](https://www.npmjs.org/package/float-sidebar)

> Lightweight (2kb gzipped), vanilla javascript plugin for making smart float sidebars.

## Example

[JSFiddle](https://jsfiddle.net/vursen/cj4erfnj)

## Install

```bash
npm install float-sidebar
```
*or*
```bash
yarn add float-sidebar
```
*or*
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

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th></th>
    <th>Description</th>
  </tr>
  <tr>
    <td><strong>sidebar</strong></td>
    <td>Element</td>
    <td>required</td>
    <td>Sidebar element</td>
  </tr>
  <tr>
    <td><strong>relative</strong></td>
    <td>Element</td>
    <td>required</td>
    <td>Sidebar relative element, e.g. main content</td>
  </tr>
  <tr>
    <td><strong>sidebarInner</strong></td>
    <td>Element</td>
    <td></td>
    <td>Sidebar inner element. <em>Defaults: first element child of sidebar element</em></td>
  </tr>
  <tr>
    <td><strong>topSpacing</strong></td>
    <td>Integer</td>
    <td></td>
    <td>Viewport top spacing when sidebar fixed. <em>Defaults: 0</em></td>
  </tr>
  <tr>
    <td><strong>bottomSpacing</strong></td>
    <td>Integer</td>
    <td></td>
    <td>Viewport bottom spacing when sidebar fixed. <em>Defaults: 0</em></td>
  </tr>
</table>

## Instance methods

<table>
  <tr>
    <td><strong>forceUpdate()</strong></td>
    <td>force recalculate and update sidebar position</td>
  </tr>
  <tr>
    <td><strong>destroy()</strong></td>
    <td>destroy plugin (doesn't delete DOM elements)</td>
  </tr>
</table>

## License

FloatSidebar.js is released under the MIT license.

Author Sergey Vinogradov
