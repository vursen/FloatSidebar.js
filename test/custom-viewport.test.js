import { setViewport } from '@web/test-runner-commands'
import { expect } from '@open-wc/testing'
import sinon from 'sinon'
import {
  nextFrame,
  scrollTo,
  getScrollTop,
  getElementTop,
  fixtureSidebar,
  fixtureCustomViewport,
  VIEWPORT_ELEMENT_TOP,
} from './helpers.js'
import FloatSidebar from '../src/float-sidebar.js'
import { TOP_FIXED } from '../src/fsm-states.js'

const VIEWPORT_WIDTH = 1000
const VIEWPORT_HEIGHT = 1000

// The transitions are covered for a custom viewport by the other suites.
describe('custom viewport', () => {
  let viewportElement,
    sidebarInnerHeight,
    wrapperElement,
    sidebarElement,
    sidebarInnerElement,
    contentElement,
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
    sidebarInnerHeight = height
  }

  function expectTransitionTo(state) {
    expect(changeStateSpy).to.have.been.calledOnceWith(state)
    changeStateSpy.resetHistory()
  }

  function expectNoTransitions() {
    expect(changeStateSpy).to.have.callCount(0)
  }

  before(async () => {
    await setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT })
  })

  beforeEach(async () => {
    changeStateSpy = sinon.spy()

    viewportElement = await fixtureCustomViewport()
    wrapperElement = await fixtureSidebar(viewportElement)
    contentElement = wrapperElement.querySelector('.content')
    sidebarElement = wrapperElement.querySelector('.sidebar')
    sidebarInnerElement = wrapperElement.querySelector('.sidebar__inner')

    floatSidebar = new FloatSidebar({
      viewport: viewportElement,
      sidebar: sidebarElement,
      relative: contentElement,
      onStateChange: changeStateSpy,
    })
  })

  beforeEach(async () => {
    setSidebarInnerHeight(VIEWPORT_HEIGHT / 2)
    setContentHeight(sidebarInnerHeight * 2)
    await nextFrame()
  })

  it('TOP_FIXED stays at the top edge when the viewport is resized', async () => {
    await scrollTo(viewportElement, getElementTop(viewportElement, sidebarInnerElement) + 1)
    await forceUpdate()
    expectTransitionTo(TOP_FIXED)

    // Picked up by ResizeObserver, so no forceUpdate() here
    viewportElement.style.marginTop = `${VIEWPORT_ELEMENT_TOP + 50}px`
    viewportElement.style.height = `calc(100vh - ${VIEWPORT_ELEMENT_TOP + 50}px)`
    await nextFrame()
    await nextFrame()
    await nextFrame()
    expectNoTransitions()
    expect(getElementTop(viewportElement, sidebarInnerElement)).to.equal(getScrollTop(viewportElement))
  })
})
