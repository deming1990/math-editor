<template>
  <div :id="model.uid" class="trigonometric-node">
    {{OPERATOR_CHARS[model.compType]}}
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
    display: inline-flex;
    align-items: center;
    font-size: @text-font-size;
  }
</style>
