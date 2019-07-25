export const NODE_TYPES = {
  TEXT_NODE: 'text-node',
  FRACTIONS_NODE: 'fractions-node'
}

export const MATH_NODE_CATEGORYS = {
  COMMON: {
    code: 'COMMON',
    name: '常用符号'
  }
}

export const MATH_NODES = {
  [MATH_NODE_CATEGORYS.COMMON.code]: [
    {
      compType: NODE_TYPES.FRACTIONS_NODE,
      icon: require('./assets/images/math-fractions.png')
    }
  ]
}
