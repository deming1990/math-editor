import { NODE_TYPES } from './ constants'

const genId = () => {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export const createTextNode = (value = '') => {
  return {
    id: genId(),
    type: NODE_TYPES.TEXT_NODE,
    parent: null,
    options: {
      value
    },
    focus: false,
    cursorPosition: 0
  }
}

const createFractionsNode = () => {
  const numerator = createTextNode()
  const denominator = createTextNode()
  const fractionsNode = {
    id: genId(),
    type: NODE_TYPES.FRACTIONS_NODE,
    parent: null,
    options: {},
    children: [
      numerator,
      denominator
    ]
  }
  numerator.options.slotName ='numerator'
  denominator.options.slotName = 'denominator'
  numerator.parent = fractionsNode
  denominator.parent = fractionsNode
  return fractionsNode
}

const MathSymbolFactory = {
  [NODE_TYPES.FRACTIONS_NODE]: createFractionsNode
}

export const createMathSymbol = (type) => {
  return MathSymbolFactory[type]()
}
