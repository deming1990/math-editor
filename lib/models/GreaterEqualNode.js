import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class GreaterEqualNode extends OperatorNode {
  static compType = NODE_TYPES.GREATER_EQUAL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.GREATER_EQUAL_NODE
    })
  }
}

export default GreaterEqualNode
