import {
  SLOT_VALUE,
  SLOT_SUB_SCRIPT
} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

class SubScriptNode extends MathNode {
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
        })
      ]
    })
  }
}

export default SubScriptNode
