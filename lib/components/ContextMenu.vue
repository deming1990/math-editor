<template>
  <ul class="context-menu" v-if="visible">
    <li class="context-menu-item" @click="onPasteClick">粘贴</li>
  </ul>
</template>
<script>
import helper from '../utils/helper'

export default {
  props: {
    visible: Boolean,
    focusNode: Object,
    focusPosition: Number
  },
  methods: {
    onPasteClick() {
      if(this.focusNode) {
        const element = document.getElementById(this.focusNode.uid)
        helper.setElementFocus(this.focusNode.uid, this.focusPosition).then(() => {
          setTimeout(() => {
            document.execCommand('insertText')
          })
        })
      }
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
  .context-menu {
    position: fixed;
    list-style: none;
    padding: 5px;
    margin: 0;
    background: rgba(0,0,0, 0.6);
    border-radius: 4px;
    z-index: 100;
  }
  .context-menu-item {
    min-width: 200px;
    padding: 5px;
    margin: 0;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
</style>
