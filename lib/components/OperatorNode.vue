<template>
  <span :id="model.uid" class="operator-node">
    {{OPERATOR_CHARS[model.compType]}}
  </span>
</template>
<script>
import {NODE_TYPES, OPERATOR_CHARS} from '../constants'

export default {
  name: NODE_TYPES.OPERATOR_NODE,
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
  .operator-node {
    height: @box-size;
    padding: 0 5px;
    line-height: @box-size;
    font-size: @normal-font-size;
    font-family: @text-font-family;
    display: inline-flex;
  }
</style>
