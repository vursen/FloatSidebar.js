export default const TRANSITIONS = {
  START: [
    {
      to: 'FINISH',
      cond: (d) => [d.innerOffsetBottom >= d.finishPoint]
    },
    {
      to: 'BOTTOM_FIXED',
      cond: (d) => [
        d.isInnerFitsContainer === true,
        d.isInnerFitsViewport === false,
        d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing - 1
      ],
    },
    {
      to: 'TOP_FIXED',
      cond: (d) => [
        d.isInnerFitsContainer === true,
        d.isInnerFitsViewport === true,
        d.viewportTop >= d.startPoint - d.topSpacing
      ]
    }
  ],

  TOP_FIXED: [
    {
      to: 'START',
      cond: (d) => [d.isInnerFitsContainer === false],
    },
    {
      to: 'START',
      cond: (d) => [d.viewportTop <= d.startPoint - d.topSpacing]
    },
    {
      to: 'FINISH',
      cond: (d) => [d.innerOffsetBottom >= d.finishPoint]
    },
    {
      to: 'UNFIXED',
      cond: (d) => [
        d.scrollDirection === 'down',
        d.isInnerFitsViewport === false
      ]
    },
  ],

  UNFIXED: [
    {
      to: 'START',
      cond: (d) => [d.isInnerFitsContainer === false],
    },
    {
      to: 'TOP_FIXED',
      cond: (d) => [d.viewportTop <= d.innerOffsetTop - d.topSpacing]
    },
    {
      to: 'TOP_FIXED',
      cond: (d) => [
        d.isInnerFitsViewport === true,
        d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing
      ]
    },
    {
      to: 'BOTTOM_FIXED',
      cond: (d) => [
        d.isInnerFitsViewport === false,
        d.viewportBottom >= d.innerOffsetBottom + d.bottomSpacing
      ]
    }
  ],

  BOTTOM_FIXED: [
    {
      to: 'START',
      cond: (d) => [d.isInnerFitsContainer === false],
    },
    {
      to: 'UNFIXED',
      cond: (d) => [d.scrollDirection === 'up']
    },
    {
      to: 'FINISH',
      cond: (d) => [
        d.scrollDirection === 'down',
        d.innerOffsetBottom >= d.finishPoint
      ]
    }
  ],

  FINISH:  [
    {
      to: 'START',
      cond: (d) => [d.isInnerFitsContainer === false],
    },
    {
      to: 'BOTTOM_FIXED',
      cond: (d) => [
        d.innerOffsetBottom + d.bottomSpacing <= d.finishPoint,
        d.viewportBottom <= d.finishPoint
      ]
    },
    {
      to: 'TOP_FIXED',
      cond: (d) => [
        d.scrollDirection === 'up',
        d.viewportTop <= d.innerOffsetTop - d.topSpacing
      ]
    }
  ]
}