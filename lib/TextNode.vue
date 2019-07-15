<template>
  <div class="text-node">
    <div :class="{'cursor': true, 'active': dataSet.focus}" :style="cursorStyle"></div>
    <div class="text-node-content" @click.stop="onTextClick">{{dataSet.options.value}}</div>
  </div>
</template>
<script>
import nodeMixin from './node-mixin'

const getCursorPosition = () => {
  return window.getSelection && window.getSelection().getRangeAt
    ? window.getSelection().getRangeAt(0).endOffset
    : 0
}

export default {
  mixins: [nodeMixin],
  props: {
    dataSet: Object
  },
  computed: {
    cursorStyle() {
      return this.dataSet.focus 
        ? {left: this.dataSet.cursorPosition * 10 + 'px'} 
        : {}
    }
  },
  methods: {
    onTextClick() {
      const cursorPosition = getCursorPosition()
      this.$dispatch('tree', 'textNodeFocus', {
        node: this.dataSet,
        cursorPosition
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .text-node {
    position: relative;
    width: 100%;
    height: 100%;
    .text-node-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      letter-spacing: 2px;
    }
    .cursor {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 25px;
      width: 1px;
      background: #000;
      display: none;
      &.active {
        display: block;
      }
    }
  }
</style>
