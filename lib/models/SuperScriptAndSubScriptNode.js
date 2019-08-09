import {
  SLOT_VALUE,
  SLOT_SUB_SCRIPT,
  SLOT_SUPER_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SuperScriptAndSubScriptNode extends MathNode {
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
          slot: SLOT_SUB_SCRIPT
        }),
        new NumberNode({
          slot: SLOT_SUPER_SCRIPT
        })
      ]
    })
  }
}

export default SuperScriptAndSubScriptNode
