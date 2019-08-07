import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class ParallelogramNode extends OperatorNode {
  static compType = NODE_TYPES.PARALLELOGRAM_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.PARALLELOGRAM_NODE
    })
  }
}

export default ParallelogramNode
