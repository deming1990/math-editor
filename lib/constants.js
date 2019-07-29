export const NODE_TYPES = {
  BASIC_NODE: 'basic-node',
  TEXT_NODE: 'text-node',
  NUMBER_NODE: 'number-node',
  FRACTIONS_NODE: 'fractions-node',
  OPERATOR_NODE: 'operator-node',
  PLUS_NODE: 'plus-node',
  MINUS_NODE: 'minus-node',
  MULTIPLICATION_NODE: 'multiplication-node',
  DIVISION_NODE: 'division-node',
  GREATER_THAN_NODE: 'greater-than-node',
  LESS_THAN_NODE: 'less-than-node',
  GREATER_EQUAL_NODE: 'greater-equal-node',
  LESS_EQUAL_NODE: 'less-equal-node',
  EQUAL_NODE: 'equal-node',
  ANGLE_NODE: 'angle-node',
  TRIGONOMETRIC_NODE: 'trigonometric-node',
  SIN_NODE: 'sin-node',
  COS_NODE: 'cos-node',
  TAN_NODE: 'tan-node'
}

export const OPERATOR_CHARS = {
  [NODE_TYPES.PLUS_NODE]: '+',
  [NODE_TYPES.MINUS_NODE]: '-',
  [NODE_TYPES.MULTIPLICATION_NODE]: '×',
  [NODE_TYPES.DIVISION_NODE]: '÷',
  [NODE_TYPES.GREATER_THAN_NODE]: '>',
  [NODE_TYPES.LESS_THAN_NODE]: '<',
  [NODE_TYPES.GREATER_EQUAL_NODE]: '≥',
  [NODE_TYPES.LESS_EQUAL_NODE]: '≤',
  [NODE_TYPES.EQUAL_NODE]: '=',
  [NODE_TYPES.ANGLE_NODE]: '∠',
  [NODE_TYPES.SIN_NODE]: 'sin',
  [NODE_TYPES.COS_NODE]: 'cos',
  [NODE_TYPES.TAN_NODE]: 'tan',
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
      iconImage: require('./assets/images/math-fractions.png')
    },
    {
      compType: NODE_TYPES.NUMBER_NODE,
      iconText: 'num'
    },
    {
      compType: NODE_TYPES.PLUS_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.PLUS_NODE]
    },
    {
      compType: NODE_TYPES.MINUS_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.MINUS_NODE]
    },
    {
      compType: NODE_TYPES.MULTIPLICATION_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.MULTIPLICATION_NODE]
    },
    {
      compType: NODE_TYPES.DIVISION_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.DIVISION_NODE]
    },
    {
      compType: NODE_TYPES.GREATER_THAN_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.GREATER_THAN_NODE]
    },
    {
      compType: NODE_TYPES.LESS_THAN_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.LESS_THAN_NODE]
    },
    {
      compType: NODE_TYPES.GREATER_EQUAL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.GREATER_EQUAL_NODE]
    },
    {
      compType: NODE_TYPES.LESS_EQUAL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.LESS_EQUAL_NODE]
    },
    {
      compType: NODE_TYPES.EQUAL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.EQUAL_NODE]
    },
    {
      compType: NODE_TYPES.ANGLE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.ANGLE_NODE]
    },
    {
      compType: NODE_TYPES.SIN_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.SIN_NODE]
    },
    {
      compType: NODE_TYPES.COS_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.COS_NODE]
    },
    {
      compType: NODE_TYPES.TAN_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.TAN_NODE]
    }
  ]
}
