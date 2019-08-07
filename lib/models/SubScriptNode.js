import {
  NODE_TYPES,
  SLOT_VALUE,
  SLOT_SUB_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SubScriptNode extends MathNode {
  static compType = NODE_TYPES.SUB_SCRIPT_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.SUB_SCRIPT_NODE,
      parent,
      slot,
      children: [
        new NumberNode({
          slot: SLOT_VALUE
        }),
        new NumberNode({
          slot: SLOT_SUB_SCRIPT
        })
      ]
    })
  }
}

export default SubScriptNode
