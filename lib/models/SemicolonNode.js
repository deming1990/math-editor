import {NODE_TYPES} from '../constants'
import OperatorNode from './OperatorNode'

class SemicolonNode extends OperatorNode {
  static compType = NODE_TYPES.SEMICOLON_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.SEMICOLON_NODE
    })
  }
}

export default SemicolonNode
