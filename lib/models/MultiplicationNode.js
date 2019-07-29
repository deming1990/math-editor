import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class MultiplicationNode extends OperatorNode {
  static compType = NODE_TYPES.MULTIPLICATION_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.MULTIPLICATION_NODE
    })
  }
}

export default MultiplicationNode
