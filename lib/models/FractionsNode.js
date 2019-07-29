import {NODE_TYPES} from "../constants"
import MathNode from "./MathNode"
import NumberNode from "./NumberNode"

// 分子
const SLOT_NUMERATOR = 'numerator'
// 分母
const SLOT_DENOMINATOR = 'denominator'

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
        new NumberNode({slot: SLOT_NUMERATOR}),
        new NumberNode({slot: SLOT_DENOMINATOR})
      ]
    })
  }
}
