import { expect } from '@open-wc/testing'
import {
  nextFrame,
  fixtureSidebar,
  fixtureCustomViewport,
} from './helpers.js'
import FloatSidebar from '../src/float-sidebar.js'

describe('sidebar height', function () {
  ['default', 'custom'].forEach((viewportKind) => {
    describe(viewportKind, () => {
      let viewportElement,
        wrapperElement,
        sidebarElement,
        sidebarInnerElement,
        contentElement,
        floatSidebar

      async function forceUpdate() {
        floatSidebar.forceUpdate()
        await nextFrame()
      }

      beforeEach(async () => {
        if (viewportKind === 'default') {
          viewportElement = window
        } else {
          viewportElement = await fixtureCustomViewport()
        }

        wrapperElement = await fixtureSidebar(viewportElement)
        contentElement = wrapperElement.querySelector('.content')
        sidebarElement = wrapperElement.querySelector('.sidebar')
        sidebarInnerElement = wrapperElement.querySelector('.sidebar__inner')

        floatSidebar = new FloatSidebar({
          viewport: viewportElement,
          sidebar: sidebarElement,
          relative: contentElement,
        })
      })

      describe('height(content) > height(sidebarInner)', () => {
        beforeEach(async () => {
          contentElement.style.height = '1000px'
          sidebarInnerElement.style.height = '500px'
          await nextFrame()
        })

        it('should set the sidebar height to the content height', () => {
          expect(sidebarElement.style.height).to.equal('1000px')
        })

        it('should set the sidebar height to the sidebar inner height when it increases', async () => {
          sidebarInnerElement.style.height = '2000px'
          await forceUpdate()
          expect(sidebarElement.style.height).to.equal('2000px')
        })
      })

      describe('height(content) < height(sidebarInner)', () => {
        beforeEach(async () => {
          contentElement.style.height = '500px'
          sidebarInnerElement.style.height = '1000px'
          await nextFrame()
        })

        it('should set the sidebar height to the sidebar inner height', () => {
          expect(sidebarElement.style.height).to.equal('1000px')
        })

        it('should set the sidebar height to the content height when it increases', async () => {
          contentElement.style.height = '2000px'
          await forceUpdate()
          expect(sidebarElement.style.height).to.equal('2000px')
        })
      })
    })
  });
})
