export const SLOT_VALUE = 'value'
export const SLOT_SUPER_SCRIPT = 'super_script'
export const SLOT_SUB_SCRIPT = 'sub_script'
export const SLOT_SUPER_VALUE = 'super_value'
export const SLOT_SUB_VALUE = 'sub_value'

export const EDITOR_MODES = {
  EDIT: 'edit',
  PREVIEW: 'preview',
  HTML: 'html'
}

export const MUTATION_TYPES = {
  ADD_OR_UPDATE: 'addOrUpdate',
  DELETE: 'delete'
}

export const NODE_TYPES = {
  BASIC_NODE: 'basic-node',
  TEXT_NODE: 'text-node',
  NUMBER_NODE: 'number-node',
  ITALIC_NODE: 'italic-node',
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
  UNEQUAL_NODE: 'unequal-node',
  ANGLE_NODE: 'angle-node',
  TRIGONOMETRIC_NODE: 'trigonometric-node',
  SIN_NODE: 'sin-node',
  COS_NODE: 'cos-node',
  TAN_NODE: 'tan-node',
  BRACKET_NODE: 'bracket-node',
  SQUARE_BRACKET_NODE: 'square-bracket-node',
  CURLY_BRACE_NODE: 'curly-brace-node',
  ABSOLUTE_NODE: 'absolute-node',
  UNIT_NODE: 'unit-node',
  DEGREE_NODE: 'degree-node',
  PRECENT_NODE: 'precent-node',
  PARALLEL_NODE: 'parallel-node',
  PERP_NODE: 'perp-node',
  SWUNG_DASH_NODE: 'swung-dash-node',
  EQUAL_OR_APPROXIMATELY_EQUAL_NODE: 'equal-or-approximately-equal-node',
  TRIANGLE_NODE: 'triangle-node',
  PARALLELOGRAM_NODE: 'parallelogram-node',
  ELLIPSIS_NODE: 'ellipsis-node',
  SQUARE_NODE: 'square-node',
  SUB_SCRIPT_NODE: 'sub-script-node',
  SUPER_SCRIPT_AND_SUB_SCRIPT_NODE: 'super-script-and-sub-script-node',
  PI_NODE: 'pi-node',
  NTH_SQRT_NODE: 'nth-sqrt-node',
  SQRT_NODE: 'sqrt-node',
}

export const OPERATOR_CHARS = {
  [NODE_TYPES.PLUS_NODE]: '+',
  [NODE_TYPES.MINUS_NODE]: '-',
  [NODE_TYPES.MULTIPLICATION_NODE]: '&#215;',
  [NODE_TYPES.DIVISION_NODE]: '&#247;',
  [NODE_TYPES.GREATER_THAN_NODE]: '&#62;',
  [NODE_TYPES.LESS_THAN_NODE]: '&#60;',
  [NODE_TYPES.GREATER_EQUAL_NODE]: '&#8805;',
  [NODE_TYPES.LESS_EQUAL_NODE]: '&#8804;',
  [NODE_TYPES.EQUAL_NODE]: '=',
  [NODE_TYPES.UNEQUAL_NODE]: '&#8800;',
  [NODE_TYPES.ANGLE_NODE]: '&#8736;',
  [NODE_TYPES.SIN_NODE]: 'sin',
  [NODE_TYPES.COS_NODE]: 'cos',
  [NODE_TYPES.TAN_NODE]: 'tan',
  [NODE_TYPES.BRACKET_NODE]: '( )',
  [NODE_TYPES.SQUARE_BRACKET_NODE]: '[ ]',
  [NODE_TYPES.CURLY_BRACE_NODE]: '{ }',
  [NODE_TYPES.ABSOLUTE_NODE]: '| |',
  [NODE_TYPES.SQRT_NODE]: '√',
  [NODE_TYPES.DEGREE_NODE]: '&#176;',
  [NODE_TYPES.PRECENT_NODE]: '%',
  [NODE_TYPES.PARALLEL_NODE]: '&#8741;',
  [NODE_TYPES.PERP_NODE]: '&#10178;',
  [NODE_TYPES.SWUNG_DASH_NODE]: '&#126;',
  [NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE]: '&#8773;',
  [NODE_TYPES.TRIANGLE_NODE]: '&#9651;',
  [NODE_TYPES.PARALLELOGRAM_NODE]: '&#9649;',
  [NODE_TYPES.ELLIPSIS_NODE]: '...',
  [NODE_TYPES.PI_NODE]: '&#960;'
}

export const MATH_NODE_CATEGORYS = {
  OPERATOR: {
    code: 'OPERATOR',
    name: '运算符号'
  },
  RELATIONAL: {
    code: 'RELATIONAL',
    name: '关系符号'
  },
  ELLIPSIS: {
    code: 'ELLIPSIS',
    name: '省略符号'
  },
  BRACKET: {
    code: 'BRACKET',
    name: '结合符号'
  },
  OTHER: {
    code: 'OTHER',
    name: '其他符号'
  }
}

export const MATH_NODES = {
  [MATH_NODE_CATEGORYS.OPERATOR.code]: [
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
      compType: NODE_TYPES.SQRT_NODE,
      iconImage: require('./assets/images/math-single-sqrt.jpg')
    },
    {
      compType: NODE_TYPES.NTH_SQRT_NODE,
      iconImage: require('./assets/images/math-sqrt.jpg')
    },
    {
      compType: NODE_TYPES.FRACTIONS_NODE,
      iconImage: require('./assets/images/math-fractions.jpg')
    },
    {
      compType: NODE_TYPES.SQUARE_NODE,
      iconImage: require('./assets/images/math-square.jpg')
    }
  ],
  [MATH_NODE_CATEGORYS.RELATIONAL.code]: [
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
      compType: NODE_TYPES.UNEQUAL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.UNEQUAL_NODE]
    },
    {
      compType: NODE_TYPES.PARALLEL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.PARALLEL_NODE]
    },
    {
      compType: NODE_TYPES.PERP_NODE,
      iconImage: require('./assets/images/math-perp.png')
    },
    {
      compType: NODE_TYPES.SWUNG_DASH_NODE,
      iconImage: require('./assets/images/math-swung-dash.png')
    },
    {
      compType: NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE]
    }
  ],
  [MATH_NODE_CATEGORYS.ELLIPSIS.code]: [
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
    },
    {
      compType: NODE_TYPES.ANGLE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.ANGLE_NODE]
    },
    {
      compType: NODE_TYPES.TRIANGLE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.TRIANGLE_NODE]
    },
    {
      compType: NODE_TYPES.PARALLELOGRAM_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.PARALLELOGRAM_NODE]
    },
    {
      compType: NODE_TYPES.ELLIPSIS_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.ELLIPSIS_NODE]
    }
  ],
  [MATH_NODE_CATEGORYS.BRACKET.code]: [
    {
      compType: NODE_TYPES.BRACKET_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.BRACKET_NODE]
    },
    {
      compType: NODE_TYPES.SQUARE_BRACKET_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.SQUARE_BRACKET_NODE]
    },
    {
      compType: NODE_TYPES.CURLY_BRACE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.CURLY_BRACE_NODE]
    },
    {
      compType: NODE_TYPES.ABSOLUTE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.ABSOLUTE_NODE]
    },
    {
      compType: NODE_TYPES.ITALIC_NODE,
      iconText: 'Italic'
    }
  ],
  [MATH_NODE_CATEGORYS.OTHER.code]: [
    {
      compType: NODE_TYPES.DEGREE_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.DEGREE_NODE]
    },
    {
      compType: NODE_TYPES.PRECENT_NODE,
      iconText: OPERATOR_CHARS[NODE_TYPES.PRECENT_NODE]
    },
    {
      compType: NODE_TYPES.SUB_SCRIPT_NODE,
      iconImage: require('./assets/images/math-sub-script.jpg')
    },
    {
      compType: NODE_TYPES.SUPER_SCRIPT_AND_SUB_SCRIPT_NODE,
      iconImage: require('./assets/images/math-super-script-and-sub-script.jpg')
    },
    {
      compType: NODE_TYPES.PI_NODE,
      iconImage: require('./assets/images/math-pi.png')
    },
  ]
}
