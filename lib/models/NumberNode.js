import {NODE_TYPES} from "../constants"
import MathNode from "./MathNode"
import TextNode from "./TextNode"

const SLOT_NUMBER = 'number'

class NumberNode extends MathNode{
  static compType = NODE_TYPES.NUMBER_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.NUMBER_NODE,
      parent,
      slot,
      children: [new TextNode({slot: SLOT_NUMBER})]
    })
  }
}

export default NumberNode
