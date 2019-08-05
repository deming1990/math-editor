import {
  NODE_TYPES, 
  SLOT_SUPER_VALUE, 
  SLOT_SUB_VALUE
} from "../constants"
import MathNode from "./MathNode"
import NumberNode from "./NumberNode"

export default class FractionsNode extends MathNode {
  static compType = NODE_TYPES.FRACTIONS_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.FRACTIONS_NODE,
      parent,
      slot,
      children: [
        new NumberNode({slot: SLOT_SUPER_VALUE}),
        new NumberNode({slot: SLOT_SUB_VALUE})
      ]
    })
  }
}
