import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class PiNode extends OperatorNode {
  static compType = NODE_TYPES.PI_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.PI_NODE
    })
  }
}

export default PiNode
