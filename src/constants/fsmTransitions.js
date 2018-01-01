import {
  STATE_START,
  STATE_TOP_FIXED,
  STATE_UNFIXED,
  STATE_BOTTOM_FIXED,
  STATE_FINISH
} from './fsmStates.js';

export default {
  [STATE_START]: [
    {
      to: STATE_FINISH,
      when: (d) => [
        d.isSideInnerFitsPath === true,
        d.viewportTop + d.sideInnerHeight >= d.finishPoint
      ]
    },
    {
      to: STATE_BOTTOM_FIXED,
      when: (d) => [
        d.isSideInnerFitsPath === true,
        d.isSideInnerFitsViewport === false,
        d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing
      ],
    },
    {
      to: STATE_TOP_FIXED,
      when: (d) => [
        d.isSideInnerFitsPath === true,
        d.isSideInnerFitsViewport === true,
        d.viewportTop >= d.startPoint - d.topSpacing
      ]
    }
  ],

  [STATE_TOP_FIXED]: [
    {
      to: STATE_START,
      when: (d) => [d.isSideInnerFitsPath === false],
    },
    {
      to: STATE_START,
      when: (d) => [d.viewportTop <= d.startPoint - d.topSpacing]
    },
    {
      to: STATE_FINISH,
      when: (d) => [d.sideInnerBottom >= d.finishPoint]
    },
    {
      to: STATE_UNFIXED,
      when: (d) => [
        d.scrollDirection === 'down',
        d.isSideInnerFitsViewport === false
      ]
    },
  ],

  [STATE_UNFIXED]: [
    {
      to: STATE_START,
      when: (d) => [d.isSideInnerFitsPath === false],
    },
    {
      to: STATE_TOP_FIXED,
      when: (d) => [d.viewportTop <= d.sideInnerTop - d.topSpacing]
    },
    {
      to: STATE_TOP_FIXED,
      when: (d) => [
        d.isSideInnerFitsViewport === true,
        d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing
      ]
    },
    {
      to: STATE_BOTTOM_FIXED,
      when: (d) => [
        d.isSideInnerFitsViewport === false,
        d.viewportBottom >= d.sideInnerBottom + d.bottomSpacing
      ]
    }
  ],

  [STATE_BOTTOM_FIXED]: [
    {
      to: STATE_START,
      when: (d) => [d.isSideInnerFitsPath === false],
    },
    {
      to: STATE_UNFIXED,
      when: (d) => [d.scrollDirection === 'up']
    },
    {
      to: STATE_TOP_FIXED,
      when: (d) => [d.isSideInnerFitsViewport === true,]
    },
    {
      to: STATE_FINISH,
      when: (d) => [d.sideInnerBottom >= d.finishPoint]
    }
  ],

  [STATE_FINISH]: [
    {
      to: STATE_START,
      when: (d) => [d.isSideInnerFitsPath === false],
    },
    {
      to: STATE_BOTTOM_FIXED,
      when: (d) => [
        d.sideInnerBottom + d.bottomSpacing <= d.finishPoint,
        d.viewportBottom <= d.finishPoint
      ]
    },
    {
      to: STATE_TOP_FIXED,
      when: (d) => [d.viewportTop <= d.sideInnerTop - d.topSpacing]
    }
  ]
}
