import OperatorNode from './OperatorNode'
import {NODE_TYPES} from '../constants'

class SwungDashNode extends OperatorNode {
  static compType = NODE_TYPES.SWUNG_DASH_NODE
  constructor({
    parent,
    slot
  } = {}) {
    super({
      parent,
      slot,
      compType: NODE_TYPES.SWUNG_DASH_NODE
    })
  }
}

export default SwungDashNode
