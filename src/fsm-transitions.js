import * as states from './fsm-states.js';

export default {
  [states.START]: [
    {
      to: states.FINISH,
      when: (d) => [
        d.isSideInnerWithinPath === true,
        d.viewportTop + d.sideInnerHeight + d.bottomSpacing > d.finishPoint,
        d.viewportBottom > d.finishPoint
      ]
    },
    {
      to: states.BOTTOM_FIXED,
      when: (d) => [
        d.isSideInnerWithinPath === true,
        d.isSideInnerWithinViewport === false,
        d.viewportBottom > d.sideInnerBottom + d.bottomSpacing
      ],
    },
    {
      to: states.TOP_FIXED,
      when: (d) => [
        d.isSideInnerWithinPath === true,
        d.isSideInnerWithinViewport === true,
        d.viewportTop > d.startPoint - d.topSpacing
      ]
    }
  ],

  [states.TOP_FIXED]: [
    {
      to: states.START,
      when: (d) => [d.isSideInnerWithinPath === false],
    },
    {
      to: states.START,
      when: (d) => [d.viewportTop <= d.startPoint - d.topSpacing]
    },
    {
      to: states.FINISH,
      when: (d) => [d.sideInnerBottom > d.finishPoint]
    },
    {
      to: states.UNFIXED,
      when: (d) => [
        d.scrollDirection === 'down',
        d.isSideInnerWithinViewport === false
      ]
    },
  ],

  [states.UNFIXED]: [
    {
      to: states.START,
      when: (d) => [d.isSideInnerWithinPath === false],
    },
    {
      to: states.START,
      when: (d) => [d.viewportTop <= d.startPoint - d.topSpacing]
    },
    {
      to: states.FINISH,
      when: (d) => [d.viewportBottom > d.finishPoint]
    },
    {
      to: states.TOP_FIXED,
      when: (d) => [
        d.scrollDirection === 'up',
        d.viewportTop <= d.sideInnerTop - d.topSpacing
      ]
    },
    {
      to: states.TOP_FIXED,
      when: (d) => [
        d.isSideInnerWithinViewport === true,
        d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing
      ]
    },
    {
      to: states.BOTTOM_FIXED,
      when: (d) => [
        d.isSideInnerWithinViewport === false,
        d.viewportBottom > d.sideInnerBottom + d.bottomSpacing
      ]
    }
  ],

  [states.BOTTOM_FIXED]: [
    {
      to: states.START,
      when: (d) => [d.isSideInnerWithinPath === false],
    },
    {
      to: states.START,
      when: (d) => [
        d.isSideInnerWithinPath === true,
        d.sideInnerTop <= d.startPoint - d.topSpacing
      ]
    },
    {
      to: states.UNFIXED,
      when: (d) => [d.scrollDirection === 'up']
    },
    {
      to: states.TOP_FIXED,
      when: (d) => [d.isSideInnerWithinViewport === true,]
    },
    {
      to: states.FINISH,
      when: (d) => [d.sideInnerBottom > d.finishPoint]
    }
  ],

  [states.FINISH]: [
    {
      to: states.START,
      when: (d) => [d.isSideInnerWithinPath === false],
    },
    {
      to: states.START,
      when: (d) => [d.viewportTop <= d.startPoint - d.topSpacing]
    },
    {
      to: states.BOTTOM_FIXED,
      when: (d) => [
        d.sideInnerBottom + d.bottomSpacing <= d.finishPoint,
        d.viewportBottom < d.finishPoint
      ]
    },
    {
      to: states.TOP_FIXED,
      when: (d) => [d.viewportTop <= d.sideInnerTop - d.topSpacing]
    }
  ]
}
