let counter = Date.now()

class BasicNode {
  constructor({
    compType, 
    parent, 
    slot
  } = {}) {
    this.uid = `node-${counter++}`
    this.compType = compType
    this.parent = parent
    this.slot = slot
  }
}

export default BasicNode
