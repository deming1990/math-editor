<template>
  <div :id="model.uid" 
    :class="{'number-node': true, 'italic-node': isItalicNode}"
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
  mixins: [compMixin],
  props: {
    model: Object
  },
  computed: {
    isEmpty() {
      return !(this.model.children.length > 1 
        || this.model.children[0].value !== '')
    },
    nodeStyles() {
      const styles = {}
      const minWidth = `${this._isScriptChild ? this._smallHeight : this._normalHeight}px`
      this.isEmpty && (styles['minWidth'] = minWidth)
      return Object.assign({}, this._numberNodeStyles, styles)
    },
    isItalicNode() {
      return this.model.compType === NODE_TYPES.ITALIC_NODE
    }
  },
  mounted() {
    this._addFormatListener(this.$refs.numberNode)
  },
  destroyed() {
    this._removeFormatListener()
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
<style lang="less">
  @import '../styles/variables.less';
  .italic-node {
    .text-node {
      .backend {
        font-family: @italic-font-family!important;
      }
      input {
        font-family: @italic-font-family!important;
      }
    }
  }
</style>
<style lang="less" scoped>
  @import '../styles/variables.less';
  @border-color: #333;
  .number-node {
    position: relative;
    height: fit-content;
    border: 1px dashed @border-color;
    display: inline-flex;
  }
  .preview-mode, .html-mode {
    .number-node {
      border: none;
    }
  }
</style>
