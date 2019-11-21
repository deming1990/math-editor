import { 
  SLOT_SUPER_VALUE, 
  SLOT_SUB_VALUE
} from "../constants"
import MathNode from "./MathNode"
import NumberNode from "./NumberNode"

export default class FractionsNode extends MathNode {
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
        new NumberNode({slot: SLOT_SUPER_VALUE}),
        new NumberNode({slot: SLOT_SUB_VALUE})
      ]
    })
  }
}
