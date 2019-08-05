import {
  NODE_TYPES,
  SLOT_VALUE,
  SLOT_SUPER_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SqrtNode extends MathNode {
  static compType = NODE_TYPES.SQRT_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.SQRT_NODE,
      parent,
      slot,
      children: [
        new NumberNode({
          slot: SLOT_VALUE
        }),
        new NumberNode({
          slot: SLOT_SUPER_SCRIPT
        })
      ]
    })
  }
}

export default SqrtNode
