import BasicNode from './BasicNode'
import {NODE_TYPES} from '../constants'

class TextNode extends BasicNode {
  constructor({
    compType = NODE_TYPES.TEXT_NODE,
    parent,
    slot,
    value = ''
  } = {}) {
    super({
      compType,
      parent,
      slot
    })
    this.value = value
  }
  isEmpty() {
    return this.value === ''
  }
}

export default TextNode
