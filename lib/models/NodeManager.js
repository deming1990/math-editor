import RowContainer from './RowContianer'
import { NODE_TYPES } from '../constants';
import TextNode from './TextNode'
import NumberNode from './NumberNode'
import OperatorNode from './OperatorNode'
import UnaryOperatorNode from './UnaryOperatorNode'
import FractionsNode from './FractionsNode'
import SuperScriptNode from './SuperScriptNode'
import SubScriptNode from './SubScriptNode'
import SuperScriptAndSubScriptNode from './SuperScriptAndSubScriptNode'

const NODE_CONTRS = {
  [RowContainer.compType]: RowContainer,
  [NODE_TYPES.TEXT_NODE]: TextNode,
  [NODE_TYPES.FRACTIONS_NODE]: FractionsNode,
  [NODE_TYPES.NUMBER_NODE]: NumberNode,
  [NODE_TYPES.ITALIC_NODE]: NumberNode,
  [NODE_TYPES.PLUS_NODE]: OperatorNode,
  [NODE_TYPES.MINUS_NODE]: OperatorNode,
  [NODE_TYPES.MULTIPLICATION_NODE]: OperatorNode,
  [NODE_TYPES.DIVISION_NODE]: OperatorNode,
  [NODE_TYPES.GREATER_THAN_NODE]: OperatorNode,
  [NODE_TYPES.GREATER_EQUAL_NODE]: OperatorNode,
  [NODE_TYPES.LESS_THAN_NODE]: OperatorNode,
  [NODE_TYPES.LESS_EQUAL_NODE]: OperatorNode,
  [NODE_TYPES.EQUAL_NODE]: OperatorNode,
  [NODE_TYPES.UNEQUAL_NODE]: OperatorNode,
  [NODE_TYPES.PI_NODE]: OperatorNode,
  [NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE]: OperatorNode,
  [NODE_TYPES.ANGLE_NODE]: OperatorNode,
  [NODE_TYPES.SIN_NODE]: UnaryOperatorNode,
  [NODE_TYPES.COS_NODE]: UnaryOperatorNode,
  [NODE_TYPES.TAN_NODE]: UnaryOperatorNode,
  [NODE_TYPES.BRACKET_NODE]: UnaryOperatorNode,
  [NODE_TYPES.ABSOLUTE_NODE]: UnaryOperatorNode,
  [NODE_TYPES.DEGREE_NODE]: UnaryOperatorNode,
  [NODE_TYPES.PRECENT_NODE]: UnaryOperatorNode,
  [NODE_TYPES.SQUARE_BRACKET_NODE]: UnaryOperatorNode,
  [NODE_TYPES.CURLY_BRACE_NODE]: UnaryOperatorNode,
  [NODE_TYPES.SQRT_NODE]: UnaryOperatorNode,
  [NODE_TYPES.NTH_SQRT_NODE]: SuperScriptNode,
  [NODE_TYPES.PARALLEL_NODE]: OperatorNode,
  [NODE_TYPES.PERP_NODE]: OperatorNode,
  [NODE_TYPES.SWUNG_DASH_NODE]: OperatorNode,
  [NODE_TYPES.TRIANGLE_NODE]: OperatorNode,
  [NODE_TYPES.PARALLELOGRAM_NODE]: OperatorNode,
  [NODE_TYPES.ELLIPSIS_NODE]: OperatorNode,
  [NODE_TYPES.SQUARE_NODE]: SuperScriptNode,
  [NODE_TYPES.SUB_SCRIPT_NODE]: SubScriptNode,
  [NODE_TYPES.SUPER_SCRIPT_AND_SUB_SCRIPT_NODE]: SuperScriptAndSubScriptNode
}

class NodeManager {  
  static createNode(compType) {
    return new NODE_CONTRS[compType]({
      compType
    })
  }
  static cloneRows(rows) {
    const cloneNode = (node) => {
      let newNode = NodeManager.createNode(node.compType)
      Object.assign(newNode, node)
      newNode.parent = node.parent
      const nodeIndex = node.parent.children.indexOf(node)
      node.parent.children.splice(nodeIndex, 1, newNode)
      newNode.children
        && newNode.children.length > 0
        && newNode.children.forEach(node => {
          cloneNode(node)
        })
    }
    return rows.map(row => {
      let newRow = NodeManager.createNode(row.compType)
      Object.assign(newRow, row)
      newRow.children 
        && newRow.children.length > 0 
        && newRow.children.forEach(node => {
        node.parent = newRow
        cloneNode(node)
      })
      return newRow
    })
  }
  static isTextNode(node) {
    return node && node.compType === NODE_TYPES.TEXT_NODE
  }
  static createTextNode() {
    return NodeManager.createNode(NODE_TYPES.TEXT_NODE)
  }
}

export default NodeManager
