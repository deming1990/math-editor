import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class GreaterThanNode extends OperatorNode {
  static compType = NODE_TYPES.GREATER_THAN_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.GREATER_THAN_NODE
    })
  }
}

export default GreaterThanNode
