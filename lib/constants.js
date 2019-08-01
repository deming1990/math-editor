export const EDITOR_MODES = {
  EDIT: 'edit',
  PREVIEW: 'preview'
}

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
  TAN_NODE: 'tan-node',
  BRACKET_NODE: 'bracket-node',
  LEFT_BRACKET_NODE: 'left-bracket-node',
  RIGHT_BRACKET_NODE: 'right-bracket-node',
  ABSOLUTE_NODE: 'absolute-node',
  LEFT_ABSOLUTE_NODE: 'left-absolute-node',
  RIGHT_ABSOLUTE_NODE: 'right-absolute-node',
  SQRT_NODE: 'sqrt-node',
  UNIT_NODE: 'unit-node',
  DEGREE_NODE: 'degree-node',
  PRECENT_NODE: 'precent-node',
  DECIMAL_POINT_NODE: 'decimal-point-node',
  COLON_NODE: 'colon-node',
  SEMICOLON_NODE: 'semicolon-node'
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
  [NODE_TYPES.BRACKET_NODE]: '( )',
  [NODE_TYPES.LEFT_BRACKET_NODE]: '( ',
  [NODE_TYPES.RIGHT_BRACKET_NODE]: ' )',
  [NODE_TYPES.ABSOLUTE_NODE]: '| |',
  [NODE_TYPES.LEFT_ABSOLUTE_NODE]: '| ',
  [NODE_TYPES.RIGHT_ABSOLUTE_NODE]: ' |',
  [NODE_TYPES.SQRT_NODE]: '√',
  [NODE_TYPES.DEGREE_NODE]: '°',
  [NODE_TYPES.PRECENT_NODE]: '%',
  [NODE_TYPES.DECIMAL_POINT_NODE]: '.',
  [NODE_TYPES.COLON_NODE]: ':',
  [NODE_TYPES.SEMICOLON_NODE]: ';'
}

export const MATH_NODE_CATEGORYS = {
  COMMON: {
    code: 'COMMON',
    name: '常用'
  },
  TRIGONOMETRIC: {
    code: 'TRIGONOMETRIC',
    name: '三角'
  },
  BRACKET: {
    code: 'BRACKET',
    name: '括号'
  },
  UNIT: {
    code: 'UNIT',
    name: '单位'
  },
  OTHER: {
    code: 'OTHER',
    name: '其他'
  }
}

export const MATH_NODES = {
  [MATH_NODE_CATEGORYS.COMMON.code]: [
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
    }
  ],
  [MATH_NODE_CATEGORYS.TRIGONOMETRIC.code]: [
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
  ],
  [MATH_NODE_CATEGORYS.BRACKET.code]: [
    {
      compType: NODE_TYPES.BRACKET_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.BRACKET_NODE]
    },
    {
      compType: NODE_TYPES.LEFT_BRACKET_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.LEFT_BRACKET_NODE]
    },
    {
      compType: NODE_TYPES.RIGHT_BRACKET_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.RIGHT_BRACKET_NODE]
    },
    {
      compType: NODE_TYPES.ABSOLUTE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.ABSOLUTE_NODE]
    },
    {
      compType: NODE_TYPES.LEFT_ABSOLUTE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.LEFT_ABSOLUTE_NODE]
    },
    {
      compType: NODE_TYPES.RIGHT_ABSOLUTE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.RIGHT_ABSOLUTE_NODE]
    },
    {
      compType: NODE_TYPES.NUMBER_NODE,
      iconText: 'num'
    }
  ],
  [MATH_NODE_CATEGORYS.UNIT.code]: [
    {
      compType: NODE_TYPES.DEGREE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.DEGREE_NODE]
    },
    {
      compType: NODE_TYPES.PRECENT_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.PRECENT_NODE]
    },
    {
      compType: NODE_TYPES.DECIMAL_POINT_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.DECIMAL_POINT_NODE]
    },
    {
      compType: NODE_TYPES.COLON_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.COLON_NODE]
    },
    {
      compType: NODE_TYPES.SEMICOLON_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.SEMICOLON_NODE]
    }
  ],
  [MATH_NODE_CATEGORYS.OTHER.code]: [
    {
      compType: NODE_TYPES.SQRT_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.SQRT_NODE]
    },
    {
      compType: NODE_TYPES.FRACTIONS_NODE,
      iconImage: require('./assets/images/math-fractions.png')
    }
  ]
}
