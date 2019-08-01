<template>
  <div class="unit-node" :id="model.uid">
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
    <div class="unit">{{OPERATOR_CHARS[model.compType]}}</div>
  </div>
</template>
<script>
import {NODE_TYPES, OPERATOR_CHARS} from '../constants'
export default {
  name: NODE_TYPES.DEGREE_NODE,
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
  .unit-node {
    display: inline-flex;
    align-items: center;
    .unit {
      height: @box-size;
      line-height: @box-size;
      font-family: @text-font-family;
      font-size: @normal-font-size;
    }
  }
</style>
