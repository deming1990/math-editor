import helper from '../utils/helper'

class BasicNode {
  constructor({
    compType, 
    parent, 
    slot
  } = {}) {
    this.uid = `node-${helper.randomStr()}`
    this.compType = compType
    this.parent = parent
    this.slot = slot
  }
}

export default BasicNode
