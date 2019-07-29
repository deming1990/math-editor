<template>
  <div :id="model.uid" class="operator-node">
    {{OPERATOR_CHARS[model.compType]}}
  </div>
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
    width: @box-size;
    line-height: @box-size;
    text-align: center;
    font-size: @text-font-size;
    display: inline-block;
  }
</style>
