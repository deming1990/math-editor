<template>
  <div :class="mathEditorStyles">
    <div class="math-editor-header">
      <math-toolbar @categoryClick="onMathToolbarCategoryClick">
      </math-toolbar>
    </div>
    <div class="math-editor-body" ref="mathEditorBody">
      <math-textarea ref="mathTextarea"></math-textarea>
      <math-node-panel v-if="panelVisible" 
        :category="currCategory" 
        @mathNodeSelect="onMathNodeSelect"
        @close="onMathNodePanelClose">
      </math-node-panel>
    </div>
  </div>  
</template>
<script>
import Vue from 'vue'
import {NODE_TYPES, EDITOR_MODES} from './constants'
import MathTextarea from './components/MathTextarea.vue'
import MathToolbar from './components/MathToolbar.vue'
import MathNodePanel from './components/MathNodePanel.vue'

// 存在组件间循环引用的场景，因此在外部统一注册
import RowContainer from './components/RowContianer.vue'
import BasicNode from './components/BasicNode.vue'
import TextNode from './components/TextNode.vue'
import FractionsNode from './components/FractionsNode.vue'
import NumberNode from './components/NumberNode.vue'
import OperatorNode from './components/OperatorNode.vue'
import TrigonometricNode from './components/TrigonometricNode.vue'
import BracketNode from './components/BracketNode.vue'
import SqrtNode from './components/SqrtNode.vue'
import UnitNode from './components/UnitNode.vue'

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
Vue.component(NODE_TYPES.UNEQUAL_NODE, OperatorNode)
Vue.component(NODE_TYPES.PARALLEL_NODE, OperatorNode)
Vue.component(NODE_TYPES.ANGLE_NODE, OperatorNode)
Vue.component(NODE_TYPES.DECIMAL_POINT_NODE, OperatorNode)
Vue.component(NODE_TYPES.COLON_NODE, OperatorNode)
Vue.component(NODE_TYPES.SEMICOLON_NODE, OperatorNode)
Vue.component(NODE_TYPES.PERP_NODE, OperatorNode)
Vue.component(NODE_TYPES.SWUNG_DASH_NODE, OperatorNode)
Vue.component(NODE_TYPES.EQUAL_OR_APPROXIMATELY_EQUAL_NODE, OperatorNode)
Vue.component(NODE_TYPES.SIN_NODE, TrigonometricNode)
Vue.component(NODE_TYPES.COS_NODE, TrigonometricNode)
Vue.component(NODE_TYPES.TAN_NODE, TrigonometricNode)
Vue.component(NODE_TYPES.BRACKET_NODE, BracketNode)
Vue.component(NODE_TYPES.SQUARE_BRACKET_NODE, BracketNode)
Vue.component(NODE_TYPES.CURLY_BRACE_NODE, BracketNode)
Vue.component(NODE_TYPES.ABSOLUTE_NODE, BracketNode)
Vue.component(NODE_TYPES.SQRT_NODE, SqrtNode)
Vue.component(NODE_TYPES.DEGREE_NODE, UnitNode)
Vue.component(NODE_TYPES.PRECENT_NODE, UnitNode)

export default {
  components: {
    [MathTextarea.name]: MathTextarea,
    [MathToolbar.name]: MathToolbar,
    [MathNodePanel.name]: MathNodePanel
  },
  props: {
    mode: {
      type: String,
      default: EDITOR_MODES.PREVIEW
    }
  },
  data() {
    return {
      EDITOR_MODES,
      currCategory: '',
      panelVisible: false
    }
  },
  computed: {
    isEditMode() {
      return this.mode === EDITOR_MODES.EDIT
    },
    isPreviewMode() {
      return this.mode === EDITOR_MODES.PREVIEW
    },
    mathEditorStyles() {
      return {
        'math-editor': true,
        'edit-mode': this.isEditMode,
        'preview-mode': this.isPreviewMode
      }
    }
  },
  provide() {
    return {
      isPreviewMode: this.isPreviewMode
    }
  },
  methods: {
    getValue() {
      return this.$refs.mathTextarea.getValue()  
    },
    setValue(str) {
      this.$refs.mathTextarea.setValue(str)
    },
    onMathToolbarCategoryClick(code) {
      this.currCategory = code
      this.panelVisible = true
    },
    onMathNodeSelect(compType) {
      this.$refs.mathTextarea.addMathNode(compType)
    },
    onMathNodePanelClose() {
      this.panelVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
  @border-color: #d3d3d3;

  .math-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &.edit-mode {
      border: 1px solid @border-color;
      border-radius: 4px;
    }
    &.preview-mode {
      .math-editor-header {
        display: none;
      }
    }
    .math-editor-header {
      position: relative;
      border-bottom: 1px solid @border-color;
    }
    .math-editor-body {
      position: relative;
      flex: 1 1 0;
      overflow: hidden;
    }
  }
</style>
