import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class LessEqualNode extends OperatorNode {
  static compType = NODE_TYPES.LESS_EQUAL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.LESS_EQUAL_NODE
    })
  }
}

export default LessEqualNode
