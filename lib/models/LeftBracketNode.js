import {NODE_TYPES} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

const SLOT_VALUE = 'value'

class LeftBracketNode extends MathNode {
  static compType = NODE_TYPES.LEFT_BRACKET_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.LEFT_BRACKET_NODE,
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

export default LeftBracketNode
