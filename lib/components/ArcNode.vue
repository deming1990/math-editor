<template>
  <div class="arc-node" :id="model.uid" ref="arcNode">
    <div :class="arcClazz"></div>
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
  </div>
</template>
<script>
import {
  NODE_TYPES
} from '../constants'
import compMixin from './component-mixin'
export default {
  mixins: [compMixin],
  props: {
    model: Object
  },
  computed: {
    arcClazz() {
      const compType = this.model.compType 
      return {
        'arc': compType === NODE_TYPES.ARC_NODE,
        'top-line': compType === NODE_TYPES.TOP_LINE_NODE,
        'top-right-arrow': compType === NODE_TYPES.TOP_RIGHT_ARROW_NODE,
        'top-dot': compType === NODE_TYPES.TOP_DOT_NODE
      }
    }
  },
  mounted() {
    if(this.isEditMode) {
      this._addFormatListener(this.$refs.arcNode)
    }
  },
  destroyed() {
    this._removeFormatListener()
  }
}
</script>
<style lang="less" scoped>
  .arc-node {
    position: relative;
    display: inline-flex;
    .arc {
      position: absolute;
      top: -3px;
      left: 5px;
      right: 5px;
      height: 8px;
      border-top: 1px solid #000;
      border-radius: 50%;
    }
    .top-line {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      height: 1px;
      background: #000;
    }
    .top-right-arrow {
      position: absolute;
      top: -2px;
      left: 0px;
      right: 0px;
      height: 1px;
      background: #000;
      &::after {
        content: " ";
        position: absolute;
        top: -4px;
        right: -5px;
        border: 4px solid transparent;
        border-left-color: #000;
        display: block;
      }
    }
    .top-dot {
      position: absolute;
      top: -2px;
      left: 30%;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      transform: translate3d(0,-50%,0);
      background: #000;
    }
  }
</style>
