import {NODE_TYPES} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

const SLOT_VALUE = 'value'

class LeftAbsoluteNode extends MathNode {
  static compType = NODE_TYPES.LEFT_ABSOLUTE_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.LEFT_ABSOLUTE_NODE,
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

export default LeftAbsoluteNode
