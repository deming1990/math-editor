<template>
  <span :id="model.uid" 
    :class="{'operator-node': true, 'no-padding': noPadding}">
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
  },
  computed: {
    noPadding() {
      return [
        NODE_TYPES.ANGLE_NODE
      ].includes(this.model.compType)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .operator-node {
    position: relative;
    height: @box-size;
    padding: 0 5px;
    line-height: @box-size;
    font-size: @normal-font-size;
    font-family: @text-font-family;
    display: inline-flex;
    &.no-padding {
      padding: 0;
    }
  }
</style>
