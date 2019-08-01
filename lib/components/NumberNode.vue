<template>
  <div :id="model.uid" 
    :class="['number-node', hasNumber ? 'has-number' : '']" @click="onClick">
    <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'
import helper from '../utils/helper.js'
export default {
  name: NODE_TYPES.NUMBER_NODE,
  props: {
    model: Object
  },
  computed: {
    hasNumber(){
      return this.model.children[0].value !== ''
    }
  },
  methods: {
    onClick(evt) {
      if(evt.currentTarget === evt.target) {
        if(!this.hasNumber) {
          helper.setElementFocus(this.model.children[0].uid, 0)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  @border-color: #333;
  .number-node {
    display: inline-flex;
    height: @normal-number-node-height;
    min-width: @normal-number-node-width;
    border: 2px dashed @border-color;
    box-sizing: border-box;
    align-items: center;
    &.has-number {
      border: none;
      min-width: 0;
    }
  }
</style>
