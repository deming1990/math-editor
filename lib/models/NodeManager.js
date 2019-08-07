import TextNode from './TextNode'
import FractionsNode from './FractionsNode'
import NumberNode from './NumberNode'
import MathNode from './MathNode'
import PlusNode from './PlusNode'
import MinusNode from './MinusNode'
import MultiplicationNode from './MultiplicationNode'
import DivisionNode from './DivisionNode'
import GreaterThanNode from './GreaterThanNode'
import GreaterEqualNode from './GreaterEqualNode'
import LessThanNode from './LessThanNode'
import LessEqualNode from './LessEqualNode'
import EqualNode from './EqualNode'
import AngleNode from './AngleNode'
import SinNode from './SinNode'
import CosNode from './CosNode'
import TanNode from './TanNode'
import BracketNode from './BracketNode'
import AbsoluteNode from './AbsoluteNode'
import SqrtNode from './SqrtNode'
import DegreeNode from './DegreeNode'
import PrecentNode from './PrecentNode'
import OperatorNode from './OperatorNode'
import SquareBracketNode from './SquareBracketNode'
import CurlyBraceNode from './CurlyBraceNode'
import UnequalNode from './UnequalNode'
import ParallelNode from './ParallelNode'
import PerpNode from './PerpNode'
import SwungDashNode from './SwungDashNode'
import EqualOrApproximatelyEqualNode from './EqualOrApproximatelyEqualNode'
import TriangleNode from './TriangleNode'
import ParallelogramNode from './ParallelogramNode'
import EllipsisNode from './EllipsisNode'
import SquareNode from './SquareNode'
import SubScriptNode from './SubScriptNode'
import SuperScriptAndSubScriptNode from './SuperScriptAndSubScriptNode'
import PiNode from './PiNode'
import SingleSqrtNode from './SingleSqrtNode'

const NODE_CONTRS = {
  [TextNode.compType]: TextNode,
  [FractionsNode.compType]: FractionsNode,
  [NumberNode.compType]: NumberNode,
  [PlusNode.compType]: PlusNode,
  [MinusNode.compType]: MinusNode,
  [MultiplicationNode.compType]: MultiplicationNode,
  [DivisionNode.compType]: DivisionNode,
  [GreaterThanNode.compType]: GreaterThanNode,
  [GreaterEqualNode.compType]: GreaterEqualNode,
  [LessThanNode.compType]: LessThanNode,
  [LessEqualNode.compType]: LessEqualNode,
  [EqualNode.compType]: EqualNode,
  [AngleNode.compType]: AngleNode,
  [SinNode.compType]: SinNode,
  [CosNode.compType]: CosNode,
  [TanNode.compType]: TanNode,
  [BracketNode.compType]: BracketNode,
  [AbsoluteNode.compType]: AbsoluteNode,
  [SqrtNode.compType]: SqrtNode,
  [DegreeNode.compType]: DegreeNode,
  [PrecentNode.compType]: PrecentNode,
  [SquareBracketNode.compType]: SquareBracketNode,
  [CurlyBraceNode.compType]: CurlyBraceNode,
  [UnequalNode.compType]: UnequalNode,
  [ParallelNode.compType]: ParallelNode,
  [PerpNode.compType]: PerpNode,
  [SwungDashNode.compType]: SwungDashNode,
  [EqualOrApproximatelyEqualNode.compType]: EqualOrApproximatelyEqualNode,
  [TriangleNode.compType]: TriangleNode,
  [ParallelogramNode.compType]: ParallelogramNode,
  [EllipsisNode.compType]: EllipsisNode,
  [SquareNode.compType]: SquareNode,
  [SubScriptNode.compType]: SubScriptNode,
  [SuperScriptAndSubScriptNode.compType]: SuperScriptAndSubScriptNode,
  [PiNode.compType]: PiNode,
  [SingleSqrtNode.compType]: SingleSqrtNode
}

class NodeManager {
  static TextNode = TextNode.compType
  static FractionsNode = FractionsNode.compType
  static NumberNode = NumberNode.compType
  static PlusNode = PlusNode.compType
  static MinusNode = MinusNode.compType
  static MultiplicationNode = MultiplicationNode.compType
  static DivisionNode = DivisionNode.compType
  static GreaterThanNode = GreaterThanNode.compType
  static GreaterEqualNode = GreaterEqualNode.compType
  static LessThanNode = LessThanNode.compType
  static LessEqualNode = LessEqualNode.compType
  static EqualNode = EqualNode.compType
  static EqualNode = EqualNode.compType
  static AngleNode = AngleNode.compType
  static SinNode = SinNode.compType
  static CosNode = CosNode.compType
  static TanNode = TanNode.compType
  static BracketNode = BracketNode.compType
  static AbsoluteNode = AbsoluteNode.compType
  static SqrtNode = SqrtNode.compType
  static DegreeNode = DegreeNode.compType
  static PrecentNode = PrecentNode.compType
  static SquareBracketNode = SquareBracketNode.compType
  static CurlyBraceNode = CurlyBraceNode.compType
  static UnequalNode = UnequalNode.compType
  static ParallelNode = ParallelNode.compType
  static PerpNode = PerpNode.compType
  static SwungDashNode = SwungDashNode.compType
  static EqualOrApproximatelyEqualNode = EqualOrApproximatelyEqualNode.compType
  static TriangleNode = TriangleNode.compType
  static ParallelogramNode = ParallelogramNode.compType
  static EllipsisNode = EllipsisNode.compType
  static SquareNode = SquareNode.compType
  static SubScriptNode = SubScriptNode.compType
  static SuperScriptAndSubScriptNode = SuperScriptAndSubScriptNode.compType
  static PiNode = PiNode.compType
  static SingleSqrtNode = SingleSqrtNode.compType
  
  static createNode(compType) {
    return new NODE_CONTRS[compType]()
  }
  static isMathNode(node) {
    return node && node instanceof MathNode
  }
  static isTextNode(node) {
    return node && node instanceof TextNode
  }
  static isOperatorNode(node) {
    return node && node instanceof OperatorNode
  }
  static isNumberNode(node) {
    return node && (
      node instanceof NumberNode
        || [NumberNode.compType].includes(node.compType)
    )
  }
  static isFractionsNode(node) {
    return node && (
      node instanceof FractionsNode 
        || [FractionsNode.compType].includes(node.compType)
    )
  }
  static isSqrtNode(node) {
    return node && (
      node instanceof SqrtNode 
        || [SqrtNode.compType].includes(node.compType)
    )
  }
}

export default NodeManager