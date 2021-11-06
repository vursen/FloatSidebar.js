import { setViewport } from '@web/test-runner-commands';
import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import FloatSidebar from '../src/float-sidebar.js';
import { START, TOP_FIXED, BOTTOM_FIXED, UNFIXED, FINISH } from '../src/fsm-states.js';

import {
  fixtureSidebar,
  querySidebar,
  querySidebarInner,
  queryContent,
  nextFrame,
  scrollTo,
  getElementTop,
  getElementBottom
} from './helpers.js';

describe('transitions', function() {
  const viewportWidth = 1000;
  const viewportHeight = 1000;
  let sidebarInnerHeight, contentHeight;

  let wrapperElement, sidebarElement, sidebarInnerElement, contentElement;
  let floatSidebar

  let changeStateSpy;

  async function forceUpdate() {
    floatSidebar.forceUpdate();
    await nextFrame();
  }

  function setContentHeight(height) {
    contentElement.style.height = `${height}px`;
    contentHeight = height;
  }

  function setSidebarInnerHeight(height) {
    sidebarInnerElement.style.height = `${height}px`;
    sidebarInnerHeight = height;
  }

  function expectTransitionTo(state) {
    expect(changeStateSpy).to.have.been.calledOnceWith(state);
    changeStateSpy.resetHistory();
  }

  function expectNoTransitions() {
    expect(changeStateSpy).to.not.have.been.called;
  }

  before(async () => {
    await setViewport({ width: viewportWidth, height: viewportHeight });
  });

  beforeEach(() => {
    // Reset the scroll position before each test case.
    window.scrollTo({ top: 0 });

    changeStateSpy = sinon.spy();

    wrapperElement = fixtureSidebar();
    contentElement = queryContent(wrapperElement);
    sidebarElement = querySidebar(wrapperElement);
    sidebarInnerElement = querySidebarInner(wrapperElement);

    floatSidebar = new FloatSidebar({
      sidebar: sidebarElement,
      relative: contentElement,
      onStateChange: changeStateSpy
    });
  });

  // isSideInnerFitsViewport === true
  describe('when height(sidebarInner) < height(viewport)', () => {
    beforeEach(() => {
      setSidebarInnerHeight(viewportHeight / 2);
    });

    // isSideInnerFitsPath === false
    describe('when height(content) < height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight / 2);
      });

      it('shoult not perform transitions on scroll', async () => {
        // An alternative to the smooth scroll.
        for (let i = 0; i <= 50; i++) {
          await scrollTo(document.body.clientHeight / 50 * i);
          await forceUpdate();
        }
        expectNoTransitions();
      });
    });

    // isSideInnerFitsPath === true
    describe('when height(content) > height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight * 2);
        await nextFrame();
      });

      it('START => TOP_FIXED', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectNoTransitions();

        await scrollTo(getElementTop(sidebarInnerElement) + 1);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED)
      });

      it('START => TOP_FIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementTop(sidebarInnerElement) + 1);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectTransitionTo(START)
      });

      it('START => TOP_FIXED => START', async () => {
        await scrollTo(getElementTop(sidebarInnerElement) + 1);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        await scrollTo(getElementTop(contentElement));
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => TOP_FIXED => FINISH', async () => {
        await scrollTo(getElementTop(sidebarInnerElement) + 1);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });

      it('START => FINISH', async () => {
        await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });

      it('START => FINISH => START when height(content) decreases', async () => {
        await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);

        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => FINISH => START', async () => {
        await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);

        await scrollTo(getElementTop(contentElement));
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => FINISH => TOP_FIXED', async () => {
        await scrollTo(getElementBottom(contentElement) - sidebarInnerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);

        await scrollTo(getElementTop(sidebarInnerElement) - 1);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);
      });
    });
  });

  // isSideInnerFitsViewport === false
  describe('when height(sidebarInner) > height(viewport)', () => {
    beforeEach(() => {
      setSidebarInnerHeight(viewportHeight * 2);
    });

    // isSideInnerFitsPath === false
    describe('when height(content) < height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight / 2);
      });

      it('shoult not perform transitions on scroll', async () => {
        // An alternative to the smooth scroll.
        for (let i = 0; i <= 50; i++) {
          await scrollTo(document.body.clientHeight / 50 * i);
          await forceUpdate();
        }
        expectNoTransitions();
      });
    });

    // isSideInnerFitsPath === true
    describe('when height(content) > height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight * 2);
        await nextFrame();
      });

      it('START => BOTTOM_FIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);
      });

      it('START => BOTTOM_FIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => START', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => TOP_FIXED when height(sidebarInner) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        setSidebarInnerHeight(viewportHeight / 2);
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);
      });

      it('START => BOTTOM_FIXED => FINISH', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(getElementBottom(contentElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });

      it('START => BOTTOM_FIXED => UNFIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);
      });

      it('START => BOTTOM_FIXED => UNFIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => UNFIXED => START', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(contentElement));
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => UNFIXED => FINISH', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementBottom(contentElement) - window.innerHeight + 1);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });

      it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);
      });

      it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => UNFIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        await scrollTo(window.pageYOffset + 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);
      });

      it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => START', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(START);
      });

      it('START => BOTTOM_FIXED => UNFIXED => TOP_FIXED => FINISH', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectTransitionTo(TOP_FIXED);

        await scrollTo(getElementBottom(contentElement) - window.innerHeight);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });

      it('START => BOTTOM_FIXED => UNFIXED => BOTTOM_FIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight + 2);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);

        await scrollTo(window.pageYOffset - 1);
        await forceUpdate();
        expectTransitionTo(UNFIXED);

        await scrollTo(window.pageYOffset + 1);
        await forceUpdate();
        expectTransitionTo(BOTTOM_FIXED);
      });

      it('START => FINISH', async () => {
        await scrollTo(getElementBottom(contentElement) - window.innerHeight);
        await forceUpdate();
        expectTransitionTo(FINISH);
      });
    });
  });
})
