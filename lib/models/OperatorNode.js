import BasicNode from './BasicNode'

class OperatorNode extends BasicNode {
  constructor({
    parent,
    slot,
    compType
  } = {}){
    super({
      parent,
      slot,
      compType
    })
  }
}

export default OperatorNode
