<template>
  <div :class="{'text-node': true, 'no-content': noContent}">
    <input type="text"
      :disabled="isPreviewMode"
      :id="model.uid"
      :value="model.value"
      autocomplete="off"
      @blur="onBlur"
      @focus="onFocus"
      @keydown="onKeyDown"
      @input="onInput">
    <span class="hidden">{{model.value}}</span>
  </div>
</template>
<script>
import {NODE_TYPES} from '../constants'
import compMixin from './component-mixin'

export default {
  name: NODE_TYPES.TEXT_NODE,
  mixins: [compMixin],
  inject: ['isPreviewMode'],
  props: {
    model: Object
  },
  computed: {
    noContent() {
      return this.model.value === ''
    }
  },
  methods: {
    onBlur(evt) {
      this.dispatchCurrentFocusNode(evt.target.selectionStart)
    },
    onFocus(evt) {
      this.dispatchCurrentFocusNode(evt.target.selectionStart)
    },
    onKeyDown(evt) {
      const cursorPosition = evt.target.selectionStart
      switch(evt.keyCode) {
        // BackSpace
        case 8:
          this.dispatchDeleteNode(evt)
          break
        // Enter 
        case 13:
          this.dispatchLineFeed(evt)
          break
        // left
        case 37:
          this.dispatchMoveCursor('left', cursorPosition)
          break
        // right
        case 39:
          this.dispatchMoveCursor('right', cursorPosition)
          break
        // up
        case 38:
          this.dispatchMoveCursor('up', cursorPosition)
          break
        // down
        case 40:
          this.dispatchMoveCursor('down', cursorPosition)
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
    },
    dispatchMoveCursor(direction, cursorPosition) {
      if((direction === 'right' && cursorPosition < this.model.value.length)
        || (direction === 'left' && cursorPosition > 0)) return;
      this.$dispatch('.row-container', 'moveCursor', {
        node: this.model,
        direction
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .text-node {
    position: relative;
    height: @box-size;
    width: fit-content;
    display: inline-block;
    &.no-content {
      min-width: 1px;
    }
    input {
      position: absolute;
      top: 0px;
      left: 0px;
      height: @normal-input-height;
      width: 100%;
      padding: 0;
      margin: 0;
      line-height: @normal-input-height;
      font-size: @normal-font-size;
      border: none;
      outline: none;
      z-index: 10;
      font-family: @text-font-family;
    }
    .hidden {
      height: @normal-input-height;
      line-height: @normal-input-height;
      font-size: @normal-font-size;
      font-family: @text-font-family;
      visibility: hidden;
    }
  }
</style>
