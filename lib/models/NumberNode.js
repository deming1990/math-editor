import {
  NODE_TYPES,
  SLOT_VALUE
} from "../constants"
import MathNode from "./MathNode"
import TextNode from "./TextNode"

class NumberNode extends MathNode{
  constructor({
    compType = NODE_TYPES.NUMBER_NODE,
    parent,
    slot
  } = {}) {
    super({
      compType,
      parent,
      slot,
      children: [
        new TextNode({slot: SLOT_VALUE})
      ]
    })
  }
}

export default NumberNode
