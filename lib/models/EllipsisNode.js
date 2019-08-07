import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class EllipsisNode extends OperatorNode {
  static compType = NODE_TYPES.ELLIPSIS_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.ELLIPSIS_NODE
    })
  }
}

export default EllipsisNode
