<template>
  <div class="text-node">
    <input type="text"
      :id="model.uid"
      :value="model.value"
      autocomplete="off"
      @blur="onBlur"
      @focus="onFocus"
      @keyup="onKeyUp"
      @input="onInput">
    <div class="hidden">{{model.value}}</div>
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'
import compMixin from './component-mixin'

export default {
  name: NODE_TYPES.TEXT_NODE,
  mixins: [compMixin],
  props: {
    model: Object
  },
  methods: {
    onBlur(evt) {
      this.dispatchCurrentFocusNode(evt.target.selectionStart)
    },
    onFocus(evt) {
      this.dispatchCurrentFocusNode(evt.target.selectionStart)
    },
    onKeyUp(evt) {
      switch(evt.keyCode) {
        // BackSpace
        case 8:
          this.dispatchDeleteNode(evt)
          break
        // Enter 
        case 13:
          this.dispatchLineFeed(evt)
          break
      }
    },
    onInput(evt) {
      this.model.value = evt.target.value
      this.dispatchBoundaryDetection(this.model)
    },
    dispatchDeleteNode(evt) {
      const cursorPosition = evt.target.selectionStart
      if(cursorPosition === 0) {
        // 1 节点没有内容删除自己 
        // 2 节点还有内容进入上一个节点进行删除，数学符号直接删除，文本对象删除倒数第一个字符
        this.$dispatch('.row-container', 'deleteNode', {
          node: this.model,
          type: this.model.value.length === 0 ? 1 : 2
        })
      }
    },
    dispatchLineFeed(evt) {
      const cursorPosition = evt.target.selectionStart
      this.$dispatch('.row-container', 'lineFeed', {
        node: this.model,
        cursorPosition
      })
    },
    dispatchCurrentFocusNode(cursorPosition) {
      this.$dispatch('.row-container', 'changeCurrentFocusNode', {
        node: this.model,
        cursorPosition
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .text-node {
    position: relative;
    width: fit-content;
    display: inline-block;
    input {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      font-size: @text-font-size;
      border: none;
      outline: none;
      z-index: 10;
    }
    .hidden {
      height: @box-size;
      margin: 0 2px;
      line-height: @box-size;
      font-size: @text-font-size;
      visibility: hidden;
      display: inline-block;
    }
  }
</style>
