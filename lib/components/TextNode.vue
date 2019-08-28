<template>
  <div  
    :class="{'text-node': true, 'empty': isEmpty}"
    :style="_fontStyles">
    <input 
      type="text"
      autocomplete="nope"
      :id="model.uid"
      :value="model.value"
      :disabled="isPreviewMode"
      :style="inputStyles"
      @input="onInput"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur">
    <!-- 注意，不要在span中插入任何空格和换行符 -->
    <span 
      class="hidden" 
      :style="_fontStyles">{{model.value}}</span>
  </div>
</template>
<script>
import {
  SLOT_SUPER_SCRIPT, 
  SLOT_SUB_SCRIPT
} from '../constants'
import compMixin from './component-mixin'

export default {
  mixins: [compMixin],
  props: {
    model: Object
  },
  computed: {
    isEmpty() {
      return this.model.value === ''
    },
    inputStyles() {
      return Object.assign({}, this._fontStyles, {
        background: this.isPreviewMode ? 'none' : '#fff'
      })
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
          this.dispatchDeleteNode(evt, 1)
          break
        case 46:
          this.dispatchDeleteNode(evt, 2)
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
    },
    dispatchDeleteNode(evt, direction) {
      const cursorPosition = evt.target.selectionStart
      
      if(direction === 1) {
      // backspace
        if(cursorPosition === 0) {
          // 1 节点没有内容删除自己 
          // 2 节点还有内容进入上一个节点进行删除，数学符号直接删除，文本对象删除倒数第一个字符
          this._dispatch('.row-container', 'deleteNode', {
            node: this.model,
            type: this.model.value.length === 0 ? 1 : 2,
            direction
          })
        }
      } else {
      // del
        if(cursorPosition >= this.model.value.length) {
          // 1 节点没有内容删除自己 
          // 2 节点还有内容进入下一个节点进行删除，数学符号直接删除，文本对象删除第一个字符
          this._dispatch('.row-container', 'deleteNode', {
            node: this.model,
            type: this.model.value.length === 0 ? 1 : 2,
            direction
          })
        }
      }
    },
    dispatchLineFeed(evt) {
      const cursorPosition = evt.target.selectionStart
      this._dispatch('.row-container', 'lineFeed', {
        node: this.model,
        cursorPosition
      })
    },
    dispatchCurrentFocusNode(cursorPosition) {
      this._dispatch('.row-container', 'changeCurrentFocusNode', {
        node: this.model,
        cursorPosition
      })
    },
    dispatchMoveCursor(direction, cursorPosition) {
      if((direction === 'right' && cursorPosition < this.model.value.length)
        || (direction === 'left' && cursorPosition > 0)) return;
      this._dispatch('.row-container', 'moveCursor', {
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
    width: fit-content;
    display: inline-flex;
    &.empty {
      // 保留显示光标的空间
      min-width: 1px;
    }
    input {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      padding: 0;
      margin: 0;
      border: none;
      outline: none;
      z-index: 10;
      font-family: @text-font-family;
      &:disabled {
        // 解决ios input disabled时input变成透明
        opacity: 1;
        -webkit-user-select: none;
        -webkit-text-fill-color: #333;
        color: #333;
      }
    }
    .hidden {
      font-family: @text-font-family;
      // 保留span中内容的空格与换行符
      white-space: pre;
      visibility: hidden;
    }
  }
</style>
