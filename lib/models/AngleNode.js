import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class AngleNode extends OperatorNode {
  static compType = NODE_TYPES.ANGLE_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.ANGLE_NODE
    })
  }
}

export default AngleNode
