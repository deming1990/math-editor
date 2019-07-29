import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class PlusNode extends OperatorNode {
  static compType = NODE_TYPES.MINUS_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.MINUS_NODE
    })
  }
}

export default PlusNode
