import {
  NODE_TYPES, 
  SLOT_VALUE
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SquareBracketNode extends MathNode {
  static compType = NODE_TYPES.SQUARE_BRACKET_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.SQUARE_BRACKET_NODE,
      parent,
      slot,
      children: [
        new NumberNode({
          slot: SLOT_VALUE
        })
      ]
    })
  }
}

export default SquareBracketNode
