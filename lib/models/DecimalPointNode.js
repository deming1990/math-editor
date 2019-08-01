import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class DecimalPointNode extends OperatorNode {
  static compType = NODE_TYPES.DECIMAL_POINT_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.DECIMAL_POINT_NODE
    })
  }
}

export default DecimalPointNode
