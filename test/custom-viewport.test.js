import { expect } from '@open-wc/testing';
import { nextFrame } from './helpers.js';
import FloatSidebar from '../src/float-sidebar.js';
import { fixture, html } from '@open-wc/testing';

describe('Custom viewport behavior', () => {
  let customViewport, sidebarElement, sidebarInnerElement, contentElement, floatSidebar;

  async function createCustomViewportFixture() {
    const wrapper = await fixture(html`
      <div id="custom-viewport" style="height: 500px; overflow-y: auto; border: 1px solid #ccc;">
        <div style="height: 100px; background: red;">Top bar (100px height)</div>
        <div style="display: flex; padding-top: 20px;">
          <div class="content" style="flex: 1; height: 2000px; background: lightblue;">
            Long content (2000px height)
          </div>
          <div class="sidebar" style="width: 200px; position: relative; background: lightgreen;">
            <div class="sidebar__inner" style="height: 800px; background: yellow;">
              Long sidebar inner (800px height)
            </div>
          </div>
        </div>
      </div>
    `);
    return wrapper;
  }

  beforeEach(async () => {
    const wrapper = await createCustomViewportFixture();
    customViewport = wrapper;
    contentElement = wrapper.querySelector('.content');
    sidebarElement = wrapper.querySelector('.sidebar');
    sidebarInnerElement = wrapper.querySelector('.sidebar__inner');

    // Wait a bit to ensure DOM is ready
    await nextFrame();
    await nextFrame();
  });

  afterEach(() => {
    if (floatSidebar) {
      floatSidebar.destroy();
    }
  });

  it('should initialize FloatSidebar with custom viewport', async () => {
    floatSidebar = new FloatSidebar({
      viewport: customViewport,
      sidebar: sidebarElement,
      relative: contentElement,
      topSpacing: 20,
      bottomSpacing: 0
    });

    // Wait for initialization
    await nextFrame();
    await nextFrame();
    
    // Check that elements exist
    expect(customViewport).to.not.be.null;
    expect(sidebarElement).to.not.be.null;
    expect(sidebarInnerElement).to.not.be.null;
    expect(contentElement).to.not.be.null;
    
    // The sidebar should have been initialized with proper styles
    expect(sidebarInnerElement.style.willChange).to.equal('transform');
  });

  it('should calculate dimensions correctly for custom viewport', async () => {
    floatSidebar = new FloatSidebar({
      viewport: customViewport,
      sidebar: sidebarElement,
      relative: contentElement,
      topSpacing: 20,
      bottomSpacing: 0
    });

    // Wait for initialization
    await nextFrame();
    await nextFrame();

    // Test that the dimension calculations don't produce invalid values
    floatSidebar.forceUpdate();
    await nextFrame();

    // Check that the sidebar position is a valid number
    const sidebarTop = parseFloat(sidebarInnerElement.style.top || '0');
    expect(sidebarTop).to.not.be.NaN;
    expect(Math.abs(sidebarTop)).to.be.lessThan(10000); // Reasonable bounds
  });

  it('should not jump when scrolling down with long sidebar in custom viewport', async () => {
    // This test specifically reproduces the issue described in the GitHub issue
    // where long sidebars jump when scrolling down in a custom viewport
    
    floatSidebar = new FloatSidebar({
      viewport: customViewport,
      sidebar: sidebarElement,
      relative: contentElement,
      topSpacing: 20,
      bottomSpacing: 0
    });

    // Wait for initialization
    await nextFrame();
    await nextFrame();

    // Start scrolling scenario - simulate the issue described
    // Initially, sidebar should be in normal position
    customViewport.scrollTop = 0;
    floatSidebar.forceUpdate();
    await nextFrame();
    
    let initialTop = parseFloat(sidebarInnerElement.style.top || '0');
    expect(initialTop).to.not.be.NaN;

    // Scroll down gradually (simulating user scroll)
    const scrollSteps = [50, 100, 200, 300, 400, 500, 600];
    let previousPositions = [];
    
    for (let scrollTop of scrollSteps) {
      customViewport.scrollTop = scrollTop;
      floatSidebar.forceUpdate();
      await nextFrame();
      
      let currentTop = sidebarInnerElement.style.top;
      let currentBottom = sidebarInnerElement.style.bottom;
      
      // The sidebar position should be valid - either top is a number or bottom is set
      if (currentTop !== 'auto') {
        let topValue = parseFloat(currentTop || '0');
        expect(topValue).to.not.be.NaN;
        expect(Math.abs(topValue)).to.be.lessThan(5000); // No extreme jumps
        previousPositions.push(topValue);
      } else {
        // When top is 'auto', bottom should be set (valid positioning)
        expect(currentBottom).to.not.equal('auto');
        expect(currentBottom).to.not.equal('');
        // For bottom positioning, we'll use a sentinel value to track
        previousPositions.push(-999); // Sentinel for bottom positioning
      }
    }
    
    // The positions should be reasonable and not have extreme jumps
    // Check for continuity (no position should jump more than a reasonable amount)
    // Skip checking jumps involving bottom positioning (sentinel value -999)
    for (let i = 1; i < previousPositions.length; i++) {
      if (previousPositions[i] !== -999 && previousPositions[i-1] !== -999) {
        let jumpAmount = Math.abs(previousPositions[i] - previousPositions[i-1]);
        expect(jumpAmount).to.be.lessThan(1000); // No jumps larger than 1000px
      }
    }
  });
});