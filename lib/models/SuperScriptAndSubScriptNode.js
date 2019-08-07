import {
  NODE_TYPES,
  SLOT_VALUE,
  SLOT_SUB_SCRIPT,
  SLOT_SUPER_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SuperScriptAndSubScriptNode extends MathNode {
  static compType = NODE_TYPES.SUPER_SCRIPT_AND_SUB_SCRIPT_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.SUPER_SCRIPT_AND_SUB_SCRIPT_NODE,
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
