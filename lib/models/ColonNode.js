import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class ColonNode extends OperatorNode {
  static compType = NODE_TYPES.COLON_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.COLON_NODE
    })
  }
}

export default ColonNode
