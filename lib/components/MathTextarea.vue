<template>
  <div class="math-textarea"
    ref="mathTextarea"
    @click="onMathTextareaClick">
    <row-container 
      v-for="row in rows"
      :model="row"
      :key="row.id"
      @changeCurrentFocusNode="onChangeCurrentFocusNode"
      @deleteNode="onDeleteNode"
      @lineFeed="onLineFeed"
      @boundaryDetection="onBoundaryDetection">
    </row-container>
  </div>  
</template>
<script>
import RowContianer from '../models/RowContianer'
import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import compMixin from './component-mixin'
import boundaryDetection from '../utils/boundaryDetection'

const isRowContainer = (node) => {
  return node && node instanceof RowContianer
}

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
    /**
     * 处理删除节点
     */
    onDeleteNode({
      type,
      node
    }) {
      const deleteSiblingNode = (parent, index) => {
        const beforeNode = parent.children[index - 1]
        if(NodeManager.isTextNode(beforeNode)) {
          helper.setElementFocus(beforeNode.uid, beforeNode.value.length)
        } else {
          // 任何节点的子节点列表的第一个节点一定是TextNode
          parent.children.splice(index - 1, 1)
          deleteSiblingNode(parent, index - 1)
        }
      }
      const parent = node.parent
      const index = parent.children.indexOf(node)
      if(isRowContainer(parent)) {
        const row = parent
        if(index > 0) {
          // 当前节点已经没有内容
          type === 1 && row.removeChild(index)
          deleteSiblingNode(row, index)
        } else {
          // 行首节点
          if(parent.size() > 1) {
            while(node.isEmpty()) {
              row.removeChild(index)
              node = row.getChild(index)
            }
            const rowIndex = this.getRowIndex(row)
            if(this.getRowCount() > 1 
              && rowIndex > 0) {
              const beforeRow = this.getRow(rowIndex - 1)
              const afterRow = this.getRow(rowIndex)
              this.concatRow(beforeRow, afterRow)
            }
          } else {
            this.deleteRow(parent)
          }
        }
      } else {

      }
    },
    concatRow(beforeRow, afterRow) {
      const nodes = afterRow.children
      beforeRow.appendChild(nodes)
      nodes.forEach((item) => {
        item.parent = beforeRow
      })
      this.deleteRow(afterRow)
      this.onBoundaryDetection({
        target: beforeRow.getLastChild()
      })
    },
    deleteRow(row) {
      if(this.rows.length > 1) {
        boundaryDetection.removeBoundary(row.uid)
        let idx = this.rows.indexOf(row)
        this.rows.splice(idx, 1)
        if(idx > 0) idx -= 1
        let lastChild = this.rows[idx].getLastChild()
        if(!NodeManager.isTextNode(lastChild)) {
          lastChild = NodeManager.createNode(NodeManager.TextNode)
          this.rows[idx].appendChild(lastChild)
        }
        this.$nextTick(() => {
          helper.setElementFocus(lastChild.uid, lastChild.value.length)
        })
      }
    },
    getRow(index) {
      return this.rows[index]
    },
    getRowIndex(row) {
      return this.rows.indexOf(row)
    },
    getRowCount() {
      return this.rows.length
    },
    // 去除首尾多余空文本节点
    trimLine(nodes) {
      if(nodes.length<2) return;
      const start = 0
      const end = nodes.length - 1
      let curr = start
      while(NodeManager.isTextNode(nodes[curr])
        && nodes[curr].isEmpty()
        && NodeManager.isTextNode(nodes[curr + 1])) {
          nodes.splice(curr,1)
      }
      if(nodes.length<2) return;
      curr = end
      while(NodeManager.isTextNode(nodes[curr])
        && nodes[curr].isEmpty()
        && NodeManager.isTextNode(nodes[curr - 1])) {
          nodes.splice(curr,1)
          curr -= 1
      }
    },
    /**
     * 处理换行
     */
    onLineFeed({
      node,
      cursorPosition
    }) {
      const handleTextNode = (beforeChildren, afterChildren, node, nodeIndex, cursorPosition) => {
        if(cursorPosition === 0) {
          beforeChildren.splice(nodeIndex, 1, NodeManager.createNode(NodeManager.TextNode))
          afterChildren.unshift(node)
        } else if (cursorPosition > 0 && cursorPosition < node.value.length) {
          const beforeNode = NodeManager.createNode(NodeManager.TextNode)
          const afterNode = NodeManager.createNode(NodeManager.TextNode)
          beforeNode.value = node.value.slice(0, cursorPosition)
          afterNode.value = node.value.slice(cursorPosition)
          beforeChildren.splice(nodeIndex, 1, beforeNode)
          afterChildren.unshift(afterNode)
        }
      }
      if(!isRowContainer(node.parent)) return
      const row = node.parent
      const rowIndex = this.rows.indexOf(row)
      const children = row.children
      const nodeIndex = children.indexOf(node)
      const beforeChildren = children.slice(0, nodeIndex + 1)
      const afterChildren = children.slice(nodeIndex + 1)
      if(NodeManager.isTextNode(node)) {
        handleTextNode(beforeChildren, afterChildren, node, nodeIndex, cursorPosition)
      }
      const newRow = new RowContianer()
      newRow.children.push(...afterChildren)
      afterChildren.forEach(child => {
        child.parent = newRow
      })
      row.children.splice(0, children.length, ...beforeChildren)
      beforeChildren.forEach(child => {
        child.parent = row
      })
      this.trimLine(row.children)
      this.trimLine(newRow.children)
      this.rows.splice(rowIndex, 1, row, newRow)
      this.$nextTick(() => {
        helper.setElementFocus(newRow.children[0].uid, 0)
      })
    },
    onBoundaryDetection({
      target
    }) {
      let row = target.parent
      while(!isRowContainer(row)) {
        target = target.parent
        row = target.parent
      }
      const point = boundaryDetection.detectBoundary(row, target)
      if(point) {
        this.onLineFeed({
          node: point,
          cursorPosition: (NodeManager.isTextNode(point) && point.value.length) || 0
        })
      }
    },
    getLastRowContainer() {
      if(this.rows.length === 0) {
        this.rows.push(new RowContianer())
      }
      return this.rows[this.rows.length - 1]
    },
    /**
     * 添加数学节点
     */
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
          parent.children.push(mathNode)
        } else {
          const beforeTextNode = NodeManager.createNode(NodeManager.TextNode)
          const afterTextNode = NodeManager.createNode(NodeManager.TextNode)
          
          beforeTextNode.value = currentFocusNode.value.substring(0, currentCursorPosition)
          beforeTextNode.parent = parent
          beforeTextNode.slot = currentFocusNode.slot
          
          afterTextNode.value = currentFocusNode.value.substring(currentCursorPosition)
          afterTextNode.parent = parent
          afterTextNode.slot = currentFocusNode.slot
          
          parent.children.splice(index, 1, beforeTextNode, mathNode, afterTextNode)
        }
      } else {
        const lastRow = this.getLastRow()
        lastRow.children.push(mathNode)
      }
      this.$nextTick(() => {
        this.onBoundaryDetection({
          target: mathNode
        })
      })
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
