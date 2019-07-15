export const NODE_TYPES = {
  TEXT_NODE: 'TextNode',
  FRACTIONS_NODE: 'FractionsNode',
  SQUARE_ROOT_NODE: 'SquareRootNode'
}

export const MATH_SYMBOLS = {
  FRACTIONS: {
    nodeType: NODE_TYPES.FRACTIONS_NODE,
    icon: require('./images/fractions.png')
  },
  SQUARE_ROOT: {
    nodeType: NODE_TYPES.SQUARE_ROOT_NODE,
    icon: require('./images/squareRoot.png')
  }
}
