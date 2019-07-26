<template>
  <div class="text-node">
    <input type="text"
      :id="model.uid"
      :value="model.value"
      :autocomplete="false"
      @blur="onBlur"
      @focus="onFocus"
      @keyup="onKeyUp"
      @input="onInput">
    <div class="hidden">{{model.value}}</div>
  </div>
</template>
<script>
import compMixin from './component-mixin'

export default {
  name: 'text-node',
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
  .text-node {
    position: relative;
    display: inline-block;
    height: 20px;
    width: fit-content;
    padding: 0 5px;
    input {
      position: absolute;
      top: 1px;
      left: 1px;
      height: 20px;
      width: 100%;
      line-height: 20px;
      font-size: 14px;
      border: none;
      z-index: 10;
      &:focus {
        outline: none;
      }
    }
    .hidden {
      height: 100%;
      font-size: 14px;
      visibility: hidden;
    }
  }
</style>
