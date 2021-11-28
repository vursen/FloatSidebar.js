import { setViewport } from '@web/test-runner-commands'
import { expect } from '@open-wc/testing'
import sinon from 'sinon'
import {
  scrollTo,
  nextFrame,
  getElementTop,
  getElementBottom,
  fixtureSidebar
} from './helpers.js'
import FloatSidebar from '../src/float-sidebar.js'
import { START, TOP_FIXED, FINISH } from '../src/fsm-states.js'

const VIEWPORT_WIDTH = 1000
const VIEWPORT_HEIGHT = 1000

describe('transitions when height(sidebarInner) < height(viewport)', () => {
  let sidebarInnerHeight,
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
    // Reset the scroll position before each test case.
    window.scrollTo({ top: 0 })

    changeStateSpy = sinon.spy()

    wrapperElement = await fixtureSidebar()
    contentElement = wrapperElement.querySelector('.content')
    sidebarElement = wrapperElement.querySelector('.sidebar')
    sidebarInnerElement = wrapperElement.querySelector('.sidebar__inner')

    floatSidebar = new FloatSidebar({
      sidebar: sidebarElement,
      relative: contentElement,
      onStateChange: changeStateSpy,
    })
  })

  beforeEach(() => {
    setSidebarInnerHeight(VIEWPORT_HEIGHT / 2)
  })

  // isSideInnerWithinPath === false
  describe('when height(content) < height(sidebarInner)', () => {
    beforeEach(async () => {
      setContentHeight(sidebarInnerHeight / 2)
    })

    it('shoult not perform transitions on scroll', async () => {
      // An alternative to the smooth scroll.
      await scrollTo(document.body.clientHeight, { steps: 50 })
      expectNoTransitions()
    })
  })

  // isSideInnerWithinPath === true
  describe('when height(content) > height(sidebarInner)', () => {
    beforeEach(async () => {
      setContentHeight(sidebarInnerHeight * 2)
      await nextFrame()
    })

    it('START => TOP_FIXED', async () => {
      // To catch possible off-by-one errors
      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectNoTransitions()

      await scrollTo(getElementTop(sidebarInnerElement) + 1)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
    })

    it('START => TOP_FIXED => START when height(content) decreases', async () => {
      await scrollTo(getElementTop(sidebarInnerElement) + 1)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      setContentHeight(sidebarInnerHeight / 2)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => TOP_FIXED => START', async () => {
      await scrollTo(getElementTop(sidebarInnerElement) + 1)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      // To catch possible off-by-one errors
      await scrollTo(getElementTop(contentElement) + 1)
      await forceUpdate()
      expectNoTransitions()

      await scrollTo(getElementTop(contentElement))
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => TOP_FIXED => FINISH', async () => {
      await scrollTo(getElementTop(sidebarInnerElement) + 1)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })

    it('START => FINISH', async () => {
      await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })

    it('START => FINISH => START when height(content) decreases', async () => {
      await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)

      setContentHeight(sidebarInnerHeight / 2)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => FINISH => START', async () => {
      await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)

      await scrollTo(getElementTop(contentElement))
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => FINISH => TOP_FIXED', async () => {
      await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)

      await scrollTo(getElementTop(sidebarInnerElement) - 1)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
    })
  })
})
