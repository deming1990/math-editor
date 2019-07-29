import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class DivisionNode extends OperatorNode {
  static compType = NODE_TYPES.DIVISION_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.DIVISION_NODE
    })
  }
}

export default DivisionNode
