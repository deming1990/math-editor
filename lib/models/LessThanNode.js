import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class LessThanNode extends OperatorNode {
  static compType = NODE_TYPES.LESS_THAN_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.LESS_THAN_NODE
    })
  }
}

export default LessThanNode
