import { setViewport } from '@web/test-runner-commands'
import { expect } from '@open-wc/testing'
import sinon from 'sinon'
import {
  scrollTo,
  nextFrame,
  getElementTop,
  getElementBottom,
  fixtureSidebar,
} from './helpers.js'
import FloatSidebar from '../src/float-sidebar.js'
import {
  START,
  TOP_FIXED,
  BOTTOM_FIXED,
  UNFIXED,
  FINISH,
} from '../src/fsm-states.js'

const VIEWPORT_WIDTH = 1000
const VIEWPORT_HEIGHT = 1000

describe('transitions when height(sideInner) > height(viewport)', () => {
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
    setSidebarInnerHeight(VIEWPORT_HEIGHT * 2)
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
      setContentHeight(sidebarInnerHeight * 1.5)
      await nextFrame()
    })

    it('START => BOTTOM_FIXED', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)
    })

    it('START => BOTTOM_FIXED => START when height(content) decreases', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      setContentHeight(sidebarInnerHeight / 1.5)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => START', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => TOP_FIXED when height(sidebarInner) decreases', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      setSidebarInnerHeight(VIEWPORT_HEIGHT / 2)
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
    })

    it('START => BOTTOM_FIXED => FINISH', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 1
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(getElementBottom(contentElement) - window.innerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })

    it('START => BOTTOM_FIXED => UNFIXED', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)
    })

    it('START => BOTTOM_FIXED => UNFIXED => START when height(content) decreases', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      setContentHeight(sidebarInnerHeight / 1.5)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => UNFIXED => START', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(contentElement))
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => UNFIXED => FINISH', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementBottom(contentElement) - window.innerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => UNFIXED', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      await scrollTo(window.pageYOffset + 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => START when height(content) decreases', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      setContentHeight(sidebarInnerHeight / 2)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => START', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(START)
    })

    it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => FINISH', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(getElementTop(sidebarInnerElement))
      await forceUpdate()
      expectTransitionTo(TOP_FIXED)

      await scrollTo(getElementBottom(contentElement) - window.innerHeight)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })

    it('START => BOTTOM_FIXED => UNFIXED => BOTTOM_FIXED', async () => {
      await scrollTo(
        getElementBottom(sidebarInnerElement) - window.innerHeight + 2
      )
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)

      await scrollTo(window.pageYOffset - 1)
      await forceUpdate()
      expectTransitionTo(UNFIXED)

      await scrollTo(window.pageYOffset + 1)
      await forceUpdate()
      expectTransitionTo(BOTTOM_FIXED)
    })

    it('START => FINISH', async () => {
      await scrollTo(getElementBottom(contentElement) - window.innerHeight + 1)
      await forceUpdate()
      expectTransitionTo(FINISH)
    })
  })
})
