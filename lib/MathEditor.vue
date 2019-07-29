<template>
  <div class="math-editor">
    <div class="math-toolbar">
      <math-toolbar 
        @categoryClick="onMathToolbarCategoryClick"></math-toolbar>
    </div>
    <div class="math-textarea">
      <math-textarea ref="mathTextarea"></math-textarea>
    </div>
  </div>  
</template>
<script>
import Vue from 'vue'
import MathTextarea from './components/MathTextarea.vue'
import MathToolbar from './components/MathToolbar.vue'
import mathNodePanel from './components/mathNodePanel'
import {NODE_TYPES} from './constants'

// 存在组件间循环引用的场景，因此在外部统一注册
import RowContainer from './components/RowContianer.vue'
import BasicNode from './components/BasicNode.vue'
import TextNode from './components/TextNode.vue'
import FractionsNode from './components/FractionsNode.vue'
import NumberNode from './components/NumberNode.vue'
import OperatorNode from './components/OperatorNode.vue'
import TrigonometricNode from './components/TrigonometricNode.vue'

Vue.component(RowContainer.name, RowContainer)
Vue.component(NODE_TYPES.BASIC_NODE, BasicNode)
Vue.component(NODE_TYPES.TEXT_NODE, TextNode)
Vue.component(NODE_TYPES.NUMBER_NODE, NumberNode)
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
Vue.component(NODE_TYPES.ANGLE_NODE, OperatorNode)
Vue.component(NODE_TYPES.SIN_NODE, TrigonometricNode)
Vue.component(NODE_TYPES.COS_NODE, TrigonometricNode)
Vue.component(NODE_TYPES.TAN_NODE, TrigonometricNode)

export default {
  components: {
    [MathTextarea.name]: MathTextarea,
    [MathToolbar.name]: MathToolbar
  },
  methods: {
    onMathToolbarCategoryClick(code) {
      const that = this;
      mathNodePanel(this.$refs.mathTextarea.$el, {
        category: code,
        onMathNodeSelect(compType) {
          that.$refs.mathTextarea.addMathNode(compType)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import './styles/variables.less';
  .math-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid @border-color;
    .math-toolbar {
      height: 40px;
      border-bottom: 1px solid @border-color;
    }
    .math-textarea {
      flex: 1;
    }
  }
</style>
