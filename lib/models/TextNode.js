import BasicNode from './BasicNode'
import {NODE_TYPES} from '../constants'

class TextNode extends BasicNode {
  static compType = NODE_TYPES.TEXT_NODE
  constructor({
    parent,
    slot,
    value = ''
  } = {}) {
    super({
      compType: NODE_TYPES.TEXT_NODE,
      parent,
      slot
    })
    this.value = value
  }
}

export default TextNode
