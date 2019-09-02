<template>
  <div class="math-node-panel">
    <div class="close" @click="onClose">x</div>
    <div class="math-node-list">
      <div v-for="node in nodeList" 
        class="math-node-item"
        :key="node.compType"
        @click="onNodeClick(node.compType)">
        <template>
          <img v-if="node.iconImage" :src="node.iconImage" />
        </template>
        <span v-if="node.iconText" v-html="node.iconText"></span>
      </div>
    </div>
  </div>
</template>
<script>
import {MATH_NODES} from '../constants'

export default {
  name: 'math-node-panel',
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
      this.$emit('mathNodeSelect', compType)
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';

  .math-node-panel {
    position: absolute;
    top: 60%;
    right: 0;
    left: 0;
    bottom: 0;
    padding-top: 15px;
    padding-right: 15px;
    border-top: 1px solid #d3d3d3;
    background: #fff;
    .close {
      position: absolute;
      top: 0;
      right: 0;
      height: 15px;
      width: 15px;
      font-size: 14px;
      line-height: 15px;
      text-align: center;
      color: #333;
      cursor: pointer;
    }
    .math-node-list {
      position: relative;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .math-node-item {
      height: 30px;
      width: 30px;
      float: left;
      margin: 5px;
      border: 1px solid #d3d3d3;
      font-size: 16px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
