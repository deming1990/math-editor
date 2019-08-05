import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class EqualOrApproximatelyEqualNode extends OperatorNode {
  static compType = NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE
    })
  }
}

export default EqualOrApproximatelyEqualNode
