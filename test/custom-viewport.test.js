import { setViewport } from '@web/test-runner-commands'
import { expect } from '@open-wc/testing'
import sinon from 'sinon'
import {
  nextFrame,
  scrollElementTo,
  fixtureCustomViewport,
} from './helpers.js'
import FloatSidebar from '../src/float-sidebar.js'
import { TOP_FIXED, BOTTOM_FIXED, UNFIXED } from '../src/fsm-states.js'

const WINDOW_WIDTH = 1000
const WINDOW_HEIGHT = 1000
const VIEWPORT_OFFSET = 100
const TOP_SPACING = 20
const BOTTOM_SPACING = 20

// The viewport is a scrollable element that starts 100px below the window top,
// like a layout with a fixed top bar (#17).
describe('custom viewport', () => {
  let viewportElement,
    contentElement,
    sidebarElement,
    sidebarInnerElement,
    floatSidebar,
    changeStateSpy

  async function forceUpdate() {
    floatSidebar.forceUpdate()
    await nextFrame()
  }

  function setContentHeight(height) {
    contentElement.style.height = `${height}px`
  }

  function setSidebarInnerHeight(height) {
    sidebarInnerElement.style.height = `${height}px`
  }

  function expectTransitionTo(state) {
    expect(changeStateSpy).to.have.been.calledOnceWith(state)
    changeStateSpy.resetHistory()
  }

  function expectNoTransitions() {
    expect(changeStateSpy).to.have.callCount(0)
  }

  // Edges of the viewport's padding box in window coordinates.
  function getViewportBox() {
    const rect = viewportElement.getBoundingClientRect()
    const top = rect.top + viewportElement.clientTop
    return { top, bottom: top + viewportElement.clientHeight }
  }

  // The scroll position at which the element's bottom plus spacing
  // reaches the bottom of the viewport.
  function getScrollTopForBottom(element, spacing) {
    const rect = element.getBoundingClientRect()
    return viewportElement.scrollTop + rect.bottom + spacing - getViewportBox().bottom
  }

  before(async () => {
    await setViewport({ width: WINDOW_WIDTH, height: WINDOW_HEIGHT })
  })

  beforeEach(async () => {
    changeStateSpy = sinon.spy()

    const rootElement = await fixtureCustomViewport()
    viewportElement = rootElement.querySelector('.viewport')
    contentElement = rootElement.querySelector('.content')
    sidebarElement = rootElement.querySelector('.sidebar')
    sidebarInnerElement = rootElement.querySelector('.sidebar__inner')

    setContentHeight(WINDOW_HEIGHT * 4)

    floatSidebar = new FloatSidebar({
      viewport: viewportElement,
      sidebar: sidebarElement,
      relative: contentElement,
      topSpacing: TOP_SPACING,
      bottomSpacing: BOTTOM_SPACING,
      onStateChange: changeStateSpy,
    })
  })

  afterEach(() => {
    if (floatSidebar) {
      floatSidebar.destroy()
    }
  })

  it('sets the sidebar height before the viewport is scrolled', async () => {
    setSidebarInnerHeight(WINDOW_HEIGHT / 2)
    await nextFrame()
    await nextFrame()
    expect(sidebarElement.style.height).to.equal(`${WINDOW_HEIGHT * 4}px`)
  })

  describe('when height(sidebarInner) < height(viewport)', () => {
    beforeEach(async () => {
      setSidebarInnerHeight(WINDOW_HEIGHT / 2)
      await nextFrame()
    })

    it('START => TOP_FIXED sticks to the top of the viewport', async () => {
      await scrollElementTo(viewportElement, 300)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
      expect(sidebarInnerElement.getBoundingClientRect().top).to.be.closeTo(
        getViewportBox().top + TOP_SPACING,
        1
      )
    })

    it('TOP_FIXED follows the viewport when it moves within the window', async () => {
      await scrollElementTo(viewportElement, 300)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      viewportElement.style.top = `${VIEWPORT_OFFSET + 50}px`
      await forceUpdate()
      expectNoTransitions()
      expect(sidebarInnerElement.getBoundingClientRect().top).to.be.closeTo(
        getViewportBox().top + TOP_SPACING,
        1
      )
    })
  })

  describe('when height(sidebarInner) > height(viewport)', () => {
    beforeEach(async () => {
      setSidebarInnerHeight(WINDOW_HEIGHT * 2)
      await nextFrame()
    })

    it('START => BOTTOM_FIXED sticks to the bottom of the viewport', async () => {
      await scrollElementTo(
        viewportElement,
        getScrollTopForBottom(sidebarInnerElement, BOTTOM_SPACING) + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)
      expect(sidebarInnerElement.getBoundingClientRect().bottom).to.be.closeTo(
        getViewportBox().bottom - BOTTOM_SPACING,
        1
      )
    })

    it('START => BOTTOM_FIXED does not jump', async () => {
      const STEP = 5
      const transitionAt = getScrollTopForBottom(sidebarInnerElement, BOTTOM_SPACING)

      await scrollElementTo(viewportElement, transitionAt - 50)
      await forceUpdate()
      expectNoTransitions()

      let prevTop = sidebarInnerElement.getBoundingClientRect().top
      let maxDelta = 0

      while (viewportElement.scrollTop < transitionAt + 50) {
        viewportElement.scrollTop += STEP
        await forceUpdate()

        const top = sidebarInnerElement.getBoundingClientRect().top
        maxDelta = Math.max(maxDelta, Math.abs(top - prevTop))
        prevTop = top
      }

      expectTransitionTo(BOTTOM_FIXED)
      expect(maxDelta).to.be.at.most(STEP + 1)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED sticks to the top of the viewport', async () => {
      await scrollElementTo(
        viewportElement,
        getScrollTopForBottom(sidebarInnerElement, BOTTOM_SPACING) + 500
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollElementTo(viewportElement, viewportElement.scrollTop - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      const distanceToTop =
        getViewportBox().top + TOP_SPACING - sidebarInnerElement.getBoundingClientRect().top
      await scrollElementTo(viewportElement, viewportElement.scrollTop - distanceToTop)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
      expect(sidebarInnerElement.getBoundingClientRect().top).to.be.closeTo(
        getViewportBox().top + TOP_SPACING,
        1
      )
    })
  })
})
