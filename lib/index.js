import RowContainer from './components/RowContianer.vue'
import BasicNode from './components/BasicNode.vue'
import TextNode from './components/TextNode.vue'
import FractionsNode from './components/FractionsNode.vue'
import NumberNode from './components/NumberNode.vue'
import BracketNode from './components/BracketNode.vue'
import SqrtNode from './components/SqrtNode.vue'
import ScriptNode from './components/ScriptNode.vue'
import MathEditor from './MathEditor.vue'
import OperatorNode from './components/OperatorNode.vue'
import {NODE_TYPES} from './constants'

// 存在组件间循环引用的场景，因此在外部统一注册

const install = (Vue) => {
  Vue.component(RowContainer.name, RowContainer)
  Vue.component(NODE_TYPES.BASIC_NODE, BasicNode)
  Vue.component(NODE_TYPES.TEXT_NODE, TextNode)
  Vue.component(NODE_TYPES.NUMBER_NODE, NumberNode)
  Vue.component(NODE_TYPES.ITALIC_NODE, NumberNode)
  Vue.component(NODE_TYPES.FRACTIONS_NODE, FractionsNode)
  Vue.component(NODE_TYPES.OPERATOR_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PLUS_NODE, OperatorNode)
  Vue.component(NODE_TYPES.MINUS_NODE, OperatorNode)
  Vue.component(NODE_TYPES.MULTIPLICATION_NODE, OperatorNode)
  Vue.component(NODE_TYPES.DIVISION_NODE, OperatorNode)
  Vue.component(NODE_TYPES.GREATER_THAN_NODE, OperatorNode)
  Vue.component(NODE_TYPES.LESS_THAN_NODE, OperatorNode)
  Vue.component(NODE_TYPES.GREATER_EQUAL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.LESS_EQUAL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.EQUAL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.UNEQUAL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PARALLEL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.ANGLE_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PERP_NODE, OperatorNode)
  Vue.component(NODE_TYPES.SWUNG_DASH_NODE, OperatorNode)
  Vue.component(NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE, OperatorNode)
  Vue.component(NODE_TYPES.TRIANGLE_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PARALLELOGRAM_NODE, OperatorNode)
  Vue.component(NODE_TYPES.ELLIPSIS_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PI_NODE, OperatorNode)
  Vue.component(NODE_TYPES.SIN_NODE, OperatorNode)
  Vue.component(NODE_TYPES.COS_NODE, OperatorNode)
  Vue.component(NODE_TYPES.TAN_NODE, OperatorNode)
  Vue.component(NODE_TYPES.BRACKET_NODE, BracketNode)
  Vue.component(NODE_TYPES.SQUARE_BRACKET_NODE, BracketNode)
  Vue.component(NODE_TYPES.CURLY_BRACE_NODE, BracketNode)
  Vue.component(NODE_TYPES.ABSOLUTE_NODE, BracketNode)
  Vue.component(NODE_TYPES.DEGREE_NODE, OperatorNode)
  Vue.component(NODE_TYPES.PRECENT_NODE, OperatorNode)
  Vue.component(NODE_TYPES.SQUARE_NODE, ScriptNode)
  Vue.component(NODE_TYPES.SUB_SCRIPT_NODE, ScriptNode)
  Vue.component(NODE_TYPES.SUPER_SCRIPT_AND_SUB_SCRIPT_NODE, ScriptNode)
  Vue.component(NODE_TYPES.NTH_SQRT_NODE, SqrtNode)
  Vue.component(NODE_TYPES.SQRT_NODE, SqrtNode)
  Vue.component(MathEditor.name, MathEditor)
}

export default {
  version: '1.0.0',
  install
}
