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

// 存在组件间循环引用的场景，因此在外部统一注册
import RowContainer from './components/RowContianer.vue'
import BasicNode from './components/BasicNode.vue'
import TextNode from './components/TextNode.vue'
import FractionsNode from './components/FractionsNode.vue'

Vue.component(BasicNode.name, BasicNode)
Vue.component(TextNode.name, TextNode)
Vue.component(FractionsNode.name, FractionsNode)
Vue.component(RowContainer.name, RowContainer)

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
