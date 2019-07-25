import {NODE_TYPES} from '../constants'
import MathNode from "./MathNode"
import TextNode from "./TextNode"

// 分子
const SLOT_NUMERATOR = 'numerator'
// 分母
const SLOT_DENOMINATOR = 'denominator'

export default class FractionsNode extends MathNode {
  static compType = NODE_TYPES.FRACTIONS_NODE
  constructor({
    parent,
    slot,
    children = [
      new TextNode({slot: SLOT_NUMERATOR}),
      new TextNode({slot: SLOT_DENOMINATOR})
    ]
  } = {}) {
    super({
      compType: NODE_TYPES.FRACTIONS_NODE,
      parent,
      slot,
      children
    })
  }
}
