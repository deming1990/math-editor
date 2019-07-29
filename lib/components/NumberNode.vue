<template>
  <div :id="model.uid" 
    :class="['number-node', hasNumber ? 'has-number' : '']">
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'
export default {
  name: NODE_TYPES.NUMBER_NODE,
  props: {
    model: Object
  },
  computed: {
    hasNumber(){
      return this.model.children[0].value !== ''
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .number-node {
    display: inline-flex;
    min-width: @box-size;
    border: 2px solid @border-color;
    box-sizing: border-box;
    align-items: center;
    &.has-number {
      border: none;
    }
  }
</style>
