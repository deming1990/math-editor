<template>
  <div class="input-section" @click="focusInputSection">
    <input ref="hiddenInput" type="text" class="hidden-input" @input="onInputText" @blur="blurHiddenInput">
    <Tree :nodes="nodes" @textNodeFocus="onTextNodeFocus"/>
  </div>
</template>
<script>
import Tree from './Tree.vue'
import { NODE_TYPES } from './ constants'
import { createMathSymbol, createTextNode } from './model'

export default {
  name: 'math-editor',
  components: {
    Tree,
  },
  data() {
    return {
      nodes: [],
      focusTextNodeCursorPosition: 0,
      focusTextNode: null
    }
  },
  methods: {
    focusInputSection() {
      const len = this.nodes.length
      if (len > 0 && this.nodes[len - 1].type === NODE_TYPES.TEXT_NODE) {
        this.focusTextNode = this.nodes[len - 1]
        this.focusTextNodeCursorPosition = this.nodes[len - 1].options.value.length
      } else {
        const newTextNode = createTextNode()
        this.focusTextNode = newTextNode
        this.focusTextNodeCursorPosition = 0
        this.nodes.push(newTextNode)
      }
      this.focusHiddenInput()
    },
    focusHiddenInput() {
      this.focusTextNode.focus = true
      this.focusTextNode.cursorPosition = this.focusTextNodeCursorPosition
      this.$refs.hiddenInput.value = ''
      this.$refs.hiddenInput.focus()
    },
    blurHiddenInput() {
      this.focusTextNode.focus = false
      const len = this.$refs.hiddenInput.value.length
      this.focusTextNodeCursorPosition += len
    },
    onInputText(evt) {
      const value = evt.target.value
      const oldValue = this.focusTextNode.options.value
      this.focusTextNode.options.value = [
        oldValue.substring(0, this.focusTextNodeCursorPosition),
        value,
        oldValue.substring(this.focusTextNodeCursorPosition)
      ].join('')
      this.focusTextNodeCursorPosition += 1
      this.focusTextNode.cursorPosition = this.focusTextNodeCursorPosition
      this.$refs.hiddenInput.value = ''
    },
    onTextNodeFocus(data) {
      const {
        node,
        cursorPosition
      } = data
      this.focusTextNode = node
      this.focusTextNodeCursorPosition = cursorPosition
      this.focusHiddenInput()
    },
    createMathSymbol(type) {
      return {
        id: genId(),
        type
      }
    },
    addMathSymbol(type) {
      const mathSymbol = createMathSymbol(type)
      if(!this.focusTextNode) {
        this.nodes.push(mathSymbol)
      } else {
        const nodes = (this.focusTextNode.parent &&  this.focusTextNode.parent.children) || this.nodes
        const index = nodes.findIndex(item => item === this.focusTextNode)
        const oldValue = this.focusTextNode.options.value
        const slotName = this.focusTextNode.options.slotName
        if(slotName) {
          mathSymbol.options.slotName = slotName
        }
        if(this.focusTextNodeCursorPosition === 0 
          || oldValue.length === this.focusTextNodeCursorPosition) {
          this.focusTextNodeCursorPosition === 0 
            ? nodes.splice(index, 0, mathSymbol)
            : nodes.splice(index + 1, 0, mathSymbol)
        } else {
          const cursorPosition = this.focusTextNodeCursorPosition
          nodes.splice(index, 0, ...[
            createTextNode(oldValue.substring(0, cursorPosition)),
            mathSymbol,
            createTextNode(oldValue.substring(cursorPosition))
          ])
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .input-section {
    position: relative;
  }
  .hidden-input {
    position: absolute;
    top: -10px;
    left: -10px;
    height: 0;
    width: 0;
    border: none;
  }
</style>


