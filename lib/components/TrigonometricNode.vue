<template>
  <div :id="model.uid" class="trigonometric-node">
    <span class="trigonometric">{{OPERATOR_CHARS[model.compType]}}</span>
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
  </div>
</template>
<script>
import {NODE_TYPES, OPERATOR_CHARS} from '../constants'

export default {
  name: NODE_TYPES.TRIGONOMETRIC_NODE,
  props: {
    model: Object
  },
  data() {
    return {
      OPERATOR_CHARS
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .trigonometric-node {
    position: relative;
    display: inline-flex;
    align-items: center;
    .trigonometric {
      display: inline-block;
      height: @box-size;
      line-height: @box-size;
      font-size: @normal-font-size;
      font-family: @text-font-family;
    }
  }
</style>
