<template>
  <div :id="model.uid" :class="bracketStyles">
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'

export default {
  name: NODE_TYPES.BRACKET_NODE,
  props: {
    model: Object
  },
  computed: {
    hasLeft() {
      return [
        NODE_TYPES.BRACKET_NODE,
        NODE_TYPES.LEFT_BRACKET_NODE,
        NODE_TYPES.ABSOLUTE_NODE,
        NODE_TYPES.LEFT_ABSOLUTE_NODE
      ].includes(this.model.compType)
    },
    hasRight() {
      return [
        NODE_TYPES.BRACKET_NODE,
        NODE_TYPES.RIGHT_BRACKET_NODE,
        NODE_TYPES.ABSOLUTE_NODE,
        NODE_TYPES.RIGHT_ABSOLUTE_NODE
      ].includes(this.model.compType)
    },
    isAbsolute() {
      return [
        NODE_TYPES.ABSOLUTE_NODE,
        NODE_TYPES.LEFT_ABSOLUTE_NODE,
        NODE_TYPES.RIGHT_ABSOLUTE_NODE
      ].includes(this.model.compType)
    },
    bracketStyles() {
      return {
        'bracket-node': true,
        'left-bracket': this.hasLeft && !this.isAbsolute,
        'right-bracket': this.hasRight && !this.isAbsolute,
        'left-absolute': this.hasLeft && this.isAbsolute,
        'right-absolute': this.hasRight && this.isAbsolute
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .bracket-node {
    position: relative;
    margin: 0 8px;
    padding-top: 4px;
    display: inline-flex;
    align-items: center;
    font-size: @normal-font-size;
    &.left-bracket:before, 
    &.right-bracket:after,
    &.left-absolute:before,
    &.right-absolute:after {
      content: "";
      position: absolute;
      top: 0;
      width: 6px;
      height: 100%;
    }
    &.left-bracket:before, 
    &.left-absolute:before {
        left: -6px;
        border-left: 2px solid #000;
        border-radius: 50%;
    }
    &.right-bracket:after,
    &.right-absolute:after  {
        right: -6px;
        border-right: 2px solid #000;
        border-radius: 50%;
    }
    &.left-absolute:before,
    &.right-absolute:after {
      border-radius: 0;
    }
  }
</style>
