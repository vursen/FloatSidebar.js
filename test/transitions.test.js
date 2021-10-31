import { setViewport } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import FloatSidebar from '../src/float-sidebar.js';
import {
  fixtureSidebar,
  querySidebar,
  querySidebarInner,
  queryContent,
  nextFrame,
  scrollTo,
  getElementTop,
  getElementBottom,
  getElementHeight,
} from './helpers.js';

describe('transitions', () => {
  const viewportWidth = 1000;
  const viewportHeight = 1000;
  let sidebarInnerHeight, contentHeight;

  let wrapperElement, sidebarElement, sidebarInnerElement, contentElement;
  let floatSidebar

  function forceUpdate() {
    floatSidebar.forceUpdate();
    return nextFrame();
  }

  function setContentHeight(height) {
    contentElement.style.height = `${height}px`;
    contentHeight = height;
  }

  function setSidebarInnerHeight(height) {
    sidebarInnerElement.style.height = `${height}px`;
    sidebarInnerHeight = height;
  }

  function expectState(state) {
    expect(sidebarInnerElement.dataset.state || 'START').to.equal(state);
  }

  beforeEach(async () => {
    await setViewport({ width: viewportWidth, height: viewportHeight });
  });

  beforeEach(() => {
    wrapperElement = fixtureSidebar();
    contentElement = queryContent(wrapperElement);
    sidebarElement = querySidebar(wrapperElement);
    sidebarInnerElement = querySidebarInner(wrapperElement);

    floatSidebar = new FloatSidebar({
      sidebar: sidebarElement,
      relative: contentElement
    });
  });

  // isSideInnerFitsViewport === true
  describe('height(sidebarInner) < height(viewport)', () => {
    beforeEach(() => {
      setSidebarInnerHeight(viewportHeight / 2);
    });

    // isSideInnerFitsPath === false
    describe('height(content) < height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight / 2);
      });
    });

    // isSideInnerFitsPath === true
    describe('height(content) > height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight * 2);
        await nextFrame();
      });

      it('START', () => {
        expectState('START');
      });

      it('START => TOP_FIXED', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectState('TOP_FIXED');
      });

      it('START => TOP_FIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectState('START');
      });

      it('START => TOP_FIXED => START', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        await scrollTo(0);
        await forceUpdate();
        expectState('START');
      });

      it('START => TOP_FIXED => FINISH', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        await scrollTo(getElementBottom(contentElement));
        await forceUpdate();
        expectState('FINISH');
      });

      it('START => FINISH', async () => {
        await scrollTo(getElementBottom(contentElement));
        await forceUpdate();
        expectState('FINISH');
      });

      it('START => FINISH => START when height(content) decreases', async () => {
        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectState('START');
      });

      it('START => FINISH => TOP_FIXED', async () => {
        await scrollTo(getElementTop(sidebarInnerElement));
        await forceUpdate();
        expectState('TOP_FIXED');
      })
    });
  });

  // isSideInnerFitsViewport === false
  describe('height(sidebarInner) > height(viewport)', () => {
    beforeEach(() => {
      setSidebarInnerHeight(viewportHeight * 2);
    });

    // isSideInnerFitsPath === false
    describe('height(content) < height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight / 2);
      });
    });

    // isSideInnerFitsPath === true
    describe('height(content) > height(sidebarInner)', () => {
      beforeEach(async () => {
        setContentHeight(sidebarInnerHeight * 2);
        await nextFrame();
      });

      it('START', () => {
        expectState('START');
      });

      it('START => BOTTOM_FIXED', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight);
        await forceUpdate();
        expectState('BOTTOM_FIXED');
      });

      it('START => BOTTOM_FIXED => START when height(content) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight);
        await forceUpdate();
        setContentHeight(sidebarInnerHeight / 2);
        await forceUpdate();
        expectState('START');
      });

      it('START => BOTTOM_FIXED => TOP_FIXED when height(sidebarInner) decreases', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight);
        await forceUpdate();
        setSidebarInnerHeight(viewportHeight / 2);
        await forceUpdate();
        expectState('TOP_FIXED');
      });

      it('START => BOTTOM_FIXED => FINISH', async () => {
        await scrollTo(getElementBottom(sidebarInnerElement) - window.innerHeight);
        await forceUpdate();
        await scrollTo(getElementBottom(contentElement));
        await forceUpdate();
        expectState('FINISH');
      });

      it('START => FINISH', async () => {
        await scrollTo(getElementBottom(contentElement));
        await forceUpdate();
        expectState('FINISH');
      });
    });
  });
})
