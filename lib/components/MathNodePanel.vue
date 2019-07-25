<template>
  <div class="math-node-panel">
    <div v-for="node in nodeList" 
      class="math-node-item"
      :key="node.compType"
      @click="onNodeClick(node.compType)">
      <img :src="node.icon" />
    </div>
  </div>
</template>
<script>
import {MATH_NODES} from '../constants'

export default {
  props: {
    category: String
  },
  computed: {
    nodeList() {
      return MATH_NODES[this.category] || []
    }
  },
  methods: {
    onNodeClick(compType) {
      this.onMathNodeSelect && this.onMathNodeSelect(compType)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';

  .math-node-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    border-top: 1px solid @border-color;
    overflow: auto;
    .math-node-item {
      height: 30px;
      width: 30px;
      float: left;
      padding: 5px;
      border-right: 1px solid @border-color;
      border-bottom: 1px solid @border-color;
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
</style>
