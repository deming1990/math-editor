import TextNode from './TextNode'
import FractionsNode from './FractionsNode'
import MathNode from './MathNode'

const NODE_CONTRS = {
  [TextNode.compType]: TextNode,
  [FractionsNode.compType]: FractionsNode
}

class NodeManager {
  static TextNode = TextNode.compType
  static FractionsNode = FractionsNode.compType
  static createNode(compType) {
    return new NODE_CONTRS[compType]()
  }
  static isMathNode(node) {
    return node && node instanceof MathNode
  }
  static isTextNode(node) {
    return node && node instanceof TextNode
  }
}

export default NodeManager
