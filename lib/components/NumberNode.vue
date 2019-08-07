<template>
  <div :id="model.uid" 
    :class="['number-node', hasNumber ? 'has-number' : '']"
    :style="nodeStyles"
    @click="onClick" ref="numberNode">
    <basic-node v-for="item in model.children" 
      :model="item"
      :key="item.uid"
      :ref="'basic-node-' + item.uid" />
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'
import NodeManager from '../models/NodeManager'
import helper from '../utils/helper.js'
import compMixin from './component-mixin'
export default {
  name: NODE_TYPES.NUMBER_NODE,
  mixins: [compMixin],
  inject: ['isPreviewMode'],
  props: {
    model: Object
  },
  computed: {
    hasNumber() {
      return this.model.children[0].value !== ''
    },
    nodeStyles() {
      return this.isPreviewMode 
        ? {border: 'none!important', minWidth: '0'}
        : {}
    }
  },
  mounted() {
    this.addFormatListener(this.$refs.numberNode)
  },
  destroyed() {
    this.removeFormatListener()
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
    position: relative;
    display: inline-flex;
    min-height: @normal-number-node-height;
    min-width: @normal-number-node-width;
    border: 1px dashed @border-color;
    box-sizing: border-box;
    &.has-number {
      border: none;
      min-width: 0;
    }
  }
</style>