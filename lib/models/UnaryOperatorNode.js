import {SLOT_VALUE} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class UnaryOperatorNode extends MathNode {
  constructor({
    compType,
    parent,
    slot
  } = {}) {
    super({
      compType,
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

export default UnaryOperatorNode
