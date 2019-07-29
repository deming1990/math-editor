import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class EqualNode extends OperatorNode {
  static compType = NODE_TYPES.EQUAL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.EQUAL_NODE
    })
  }
}

export default EqualNode
