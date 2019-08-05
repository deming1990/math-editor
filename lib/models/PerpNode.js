import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class PerpNode extends OperatorNode {
  static compType = NODE_TYPES.PERP_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.PERP_NODE
    })
  }
}

export default PerpNode
