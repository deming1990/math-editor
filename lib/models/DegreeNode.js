import {NODE_TYPES} from '../constants'
import MathNode from './MathNode'
import NumberNode from './NumberNode'

const SLOT_VALUE = 'value'

class DegreeNode extends MathNode {
  static compType = NODE_TYPES.DEGREE_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      compType: NODE_TYPES.DEGREE_NODE,
      parent,
      slot,
      children: [
        new NumberNode({
          slot: SLOT_VALUE
        })
      ]
    })
  }
}

export default DegreeNode
