<template>
  <span :id="model.uid" 
    :class="{'operator-node': true, 'no-padding': noPadding, 'italic': needItalic, 'center': needCenter}">
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
        NODE_TYPES.PI_NODE,
        NODE_TYPES.ANGLE_NODE,
        NODE_TYPES.TRIANGLE_NODE,
        NODE_TYPES.PARALLELOGRAM_NODE
      ].includes(this.model.compType)
    },
    needItalic() {
      return [
        NODE_TYPES.PARALLEL_NODE
      ].includes(this.model.compType)
    },
    needCenter() {
      return [
        NODE_TYPES.ELLIPSIS_NODE
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
    &.italic {
      font-style: italic;
    }
    &.center {
      line-height: 50%;
    }
  }
</style>
