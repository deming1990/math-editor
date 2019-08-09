import {
  SLOT_VALUE,
  SLOT_SUPER_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SuperScriptNode extends MathNode {
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
        }),
        new NumberNode({
          slot: SLOT_SUPER_SCRIPT
        })
      ]
    })
  }
}

export default SuperScriptNode
