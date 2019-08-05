import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class UnequalNode extends OperatorNode {
  static compType = NODE_TYPES.UNEQUAL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.UNEQUAL_NODE
    })
  }
}

export default UnequalNode
