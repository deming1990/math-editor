import BasicNode from './BasicNode'

/**
 * 数学节点
 */
class MathNode extends BasicNode {
  constructor({
    compType,
    parent,
    slot,
    children
  }) {
    super({
      compType,
      parent,
      slot
    })
    this.children = children
    const that = this
    if(this.children) {
      this.children.forEach(child => {
        child.parent = that
      })
    }
  }  
}

export default MathNode
