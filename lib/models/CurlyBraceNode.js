import {
  NODE_TYPES, 
  SLOT_VALUE
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class CurlyBraceNode extends MathNode {
  static compType = NODE_TYPES.CURLY_BRACE_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.CURLY_BRACE_NODE,
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

export default CurlyBraceNode
