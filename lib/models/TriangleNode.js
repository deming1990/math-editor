import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class TriangleNode extends OperatorNode {
  static compType = NODE_TYPES.TRIANGLE_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.TRIANGLE_NODE
    })
  }
}

export default TriangleNode
