<template>
  <div class="math-textarea"
    ref="mathTextarea"
    @click="onMathTextareaClick">
    <row-container 
      v-for="row in rows"
      :model="row"
      :key="row.id"
      @changeCurrentFocusNode="onChangeCurrentFocusNode"
      @deleteNode="onDeleteNode">
    </row-container>
  </div>  
</template>
<script>
import RowContianer from '../models/RowContianer'
import NodeManager from '../models/NodeManager'
import utils from '../utils'
import compMixin from './component-mixin'

export default {
  name: 'math-textarea',
  mixins: [compMixin],
  data() {
    return {
      rows: [],
      currentFocusNode: null,
      currentCursorPosition: 0
    }
  },
  methods: {
    onMathTextareaClick(evt) {
      if(!evt.target.matches('.math-textarea')) return
      const lastRowContainer = this.getLastRowContainer()
      this.focusContainer(lastRowContainer)
    },
    onChangeCurrentFocusNode({
      node,
      cursorPosition
    }) {
      this.currentFocusNode = node
      this.currentCursorPosition = cursorPosition
    },
    onDeleteNode({
      type,
      node
    }) {
      const deleteSiblingNode = (parent, index) => {
        const beforeNode = parent.children[index - 1]
        if(beforeNode.compType === NodeManager.TextNode) {
          this.currentFocusNode = beforeNode
          this.currentCursorPosition = beforeNode.value.length
          utils.setElementFocus(this.currentFocusNode.uid)
        } else {
          // 任何节点的子节点列表的第一个节点一定是TextNode
          parent.children.splice(index - 1, 1)
          deleteSiblingNode.call(this, parent, index - 1)
        }
      }
      const parent = node.parent
      const index = parent.children.indexOf(node)
      switch(type) {
        // 1 节点没有内容删除自己
        case 1:
          // 中间的节点
          if(index > 0) {
            parent.children.splice(index, 1)
            if(parent.children.length > 0) {
              // 同级节点
              deleteSiblingNode(parent, index)
            } else {
              // 不存在同级节点
              if(NodeManager.isMathNode(parent)) {
                // 父组件为MathNode
              } else {
                // 父组件为RowContainer
              }
            }
          }
          break;
        // 2 节点还有内容进入上一个节点进行删除，数学符号直接删除，文本对象删除倒数第一个字符
        case 2:
          break;
        default:
          ;
      }
    },
    getLastRowContainer() {
      if(this.rows.length === 0) {
        this.rows.push(new RowContianer())
      }
      return this.rows[this.rows.length - 1]
    },
    addMathNode(compType) {
      const mathNode = NodeManager.createNode(compType)
      if(this.currentFocusNode) {
        const currentFocusNode = this.currentFocusNode
        const currentCursorPosition = this.currentCursorPosition
        const parent = currentFocusNode.parent
        const index = parent.children.indexOf(currentFocusNode)
        mathNode.parent = parent
        mathNode.slot = currentFocusNode.slot
        if(currentCursorPosition === 0) {
          parent.children.splice(index, 0, mathNode)
        } else if(currentCursorPosition === currentFocusNode.value.length) {
          parent.children.push(index, 0, mathNode)
        } else {
          const beforeTextNode = NodeManager.createNode(NodeManager.TextNode)
          const afterTextNode = NodeManager.createNode(NodeManager.TextNode)
          
          beforeTextNode.value = currentFocusNode.value.substring(0, currentCursorPosition)
          beforeTextNode.parent = parent
          beforeTextNode.slot = currentFocusNode.slot
          
          afterTextNode.value = currentFocusNode.value.substring(currentCursorPosition)
          afterTextNode.parent = parent
          afterTextNode.slot = currentFocusNode.slot
          
          parent.children.splice(index, 1, ...[
            beforeTextNode,
            mathNode,
            afterTextNode
          ])
        }
      } else {
        const lastRow = this.getLastRow()
        lastRow.children.push(mathNode)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .math-textarea {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
