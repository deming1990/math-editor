import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class ParallelNode extends OperatorNode {
  static compType = NODE_TYPES.PARALLEL_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.PARALLEL_NODE
    })
  }
}

export default ParallelNode
