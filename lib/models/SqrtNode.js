import {NODE_TYPES} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

const SLOT_VALUE = 'value'
const SLOT_NTH = 'nth'

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
          slot: SLOT_NTH
        })
      ]
    })
  }
}

export default SqrtNode
