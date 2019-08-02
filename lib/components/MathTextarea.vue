<template>
  <div class="math-textarea"
    ref="mathTextarea"
    @click="onMathTextareaClick">
    <row-container 
      v-for="row in rows"
      :model="row"
      :key="row.id"
      @changeCurrentFocusNode="onChangeCurrentFocusNode"
      @moveCursor="onMoveCursor"
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
import { setTimeout } from 'timers';

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
    getValue() {
      return helper.arrToStr(this.rows)
    },
    setValue(val) {
      this.rows = helper.strToArr(val)
    },
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
    onMoveCursor({
      node,
      direction
    }) {
      const getPrevOrNextRow = (node, direction) => {
        const currRow = this.getBelongRow(node)
        const rowIndex = this.getRowIndex(currRow)
        const rowCount = this.getRowCount()
        if(direction === 'prev' && rowIndex > 0) {
          const prevRow = this.getRow(rowIndex - 1)
          return prevRow.getLastChild()
        } else if(direction === 'next' && rowIndex < rowCount - 1) {
          const nextRow = this.getRow(rowIndex + 1)
          return nextRow.getFirstChild()
        }
      }
      let currNode
      switch(direction) {
        case 'left':
          currNode = this.getPrevTextNode(node)
          currNode && helper.setElementFocus(currNode.uid)
          break
        case 'right':
          currNode = this.getNextTextNode(node)
          currNode && helper.setElementFocus(currNode.uid, 0)
          break
        case 'up':
          currNode = getPrevOrNextRow(node, 'prev')
          currNode && helper.setElementFocus(currNode.uid)
          break
        case 'down':
          currNode = getPrevOrNextRow(node, 'next')
          currNode && helper.setElementFocus(currNode.uid, 0)
          break
      }
    },
    /**
     * 处理删除节点
     */
    onDeleteNode({
      type,
      node
    }) {
      const deleteSiblingNode = (node, type) => {
        const parent = node.parent
        const children = parent.children
        const nodeIndex = children.indexOf(node)
        if(nodeIndex > 0) {
          let prevIndex = nodeIndex - 1
          let prevNode = children[prevIndex]
          if(NodeManager.isOperatorNode(prevNode) || NodeManager.isMathNode(prevNode)) {
            children.splice(prevIndex, 1)
          } else if(NodeManager.isTextNode(prevNode)) {
            type === 1 && children.splice(nodeIndex, 1)
            helper.setElementFocus(prevNode.uid)
          }
        } else {
          if(isRowContainer(parent)) {
            const rowIndex = this.getRowIndex(parent)
            if(parent.size() === 1 && type === 1) {
              rowIndex > 0 && this.deleteRow(parent)
            } else {
              if(rowIndex > 0) {
                const prevRow = this.getRow(rowIndex - 1)
                this.concatRow(prevRow, parent)
              }
            }
          }
        }
      }
      deleteSiblingNode(node, type)
    },
    concatRow(beforeRow, afterRow) {
      const nodes = afterRow.children
      const middleNode = nodes[0]
      beforeRow.appendChild(nodes)
      nodes.forEach((item) => {
        item.parent = beforeRow
      })
      this.deleteRow(afterRow)
      this.onBoundaryDetection({
        target: middleNode
      })
    },
    deleteRow(row) {
      if(this.getRowCount() > 1) {
        boundaryDetection.removeBoundary(row.uid)
        let idx = this.getRowIndex(row)
        this.rows.splice(idx, 1)
        if(idx > 0) idx -= 1
        let lastChild = this.getRow(idx).getLastChild()
        if(!NodeManager.isTextNode(lastChild)) {
          lastChild = NodeManager.createNode(NodeManager.TextNode)
          this.getRow(idx).appendChild(lastChild)
        }
        this.$nextTick(() => {
          helper.setElementFocus(lastChild.uid)
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
    getBelongRow(node) {
      let parent = node.parent
      while(!isRowContainer(parent)) {
        parent = parent.parent
      }
      return parent
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
          parent.children.splice(index + 1, 0, mathNode)
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
    },
    getNextTextNode(node) {
      const getNextChildTextNode = (parent) => {
        const children = parent.children;
        if(children && children.length > 0) {
          const subNode = children[0]
          if(NodeManager.isTextNode(subNode)) {
            return subNode
          } else {
            return getNextChildTextNode(subNode)
          }
        }
      }
      const getNextSiblingTextNode = (node) => {
        let children = node.parent.children
        let nodeIndex = children.indexOf(node)
        while(nodeIndex < children.length - 1) {
          nodeIndex += 1
          let nextNode = children[nodeIndex]
          if(NodeManager.isTextNode(nextNode)) {
            return nextNode
          } else {
            nextNode = getNextChildTextNode(nextNode)
            if(NodeManager.isTextNode(nextNode)) {
              return nextNode
            }
          }
        }
        if(node.parent.parent) {
          return getNextSiblingTextNode(node.parent)
        }
      }
      let nextTextNode
      if(NodeManager.isTextNode(node)) {
        nextTextNode = getNextSiblingTextNode(node)
      } else {
        nextTextNode = getNextChildTextNode(node)
        if(!nextTextNode) {
          nextTextNode = getNextSiblingTextNode(node)
        }
      }
      if(nextTextNode) {
        return nextTextNode
      } else {
        let row = this.getBelongRow(node)
        let rowIndex = this.getRowIndex(row)
        if(rowIndex < this.getRowCount() - 1) {
          row = this.getRow(rowIndex + 1)
          let firstChild = row.getFirstChild()
          if(NodeManager.isTextNode(firstChild)) {
            return firstChild
          } else {
            return this.getNextTextNode(firstChild)
          }
        }
      }
    },
    getPrevTextNode(node) {
      const getPrevChildTextNode = (parent) => {
        const children = parent.children;
        if(children && children.length > 0) {
          const subNode = children[children.length - 1]
          if(NodeManager.isTextNode(subNode)) {
            return subNode
          } else {
            return getPrevChildTextNode(subNode)
          }
        }
      }
      const getPrevSiblingTextNode = (node) => {
        let children = node.parent.children
        let nodeIndex = children.indexOf(node)
        while(nodeIndex > 0) {
          nodeIndex -= 1
          let prevNode = children[nodeIndex]
          if(NodeManager.isTextNode(prevNode)) {
            return prevNode
          } else {
            prevNode = getPrevChildTextNode(prevNode)
            if(NodeManager.isTextNode(prevNode)) {
              return prevNode
            }
          }
        }
        if(node.parent.parent) {
          return getPrevSiblingTextNode(node.parent)
        }
      }
      let prevTextNode
      if(NodeManager.isTextNode(node)) {
        prevTextNode = getPrevSiblingTextNode(node)
      } else {
        prevTextNode = getPrevChildTextNode(node)
        if(!prevTextNode) {
          prevTextNode = getPrevSiblingTextNode(node)
        }
      }
      if(prevTextNode) {
        return prevTextNode
      } else {
        let row = this.getBelongRow(node)
        let rowIndex = this.getRowIndex(row)
        if(rowIndex > 0) {
          row = this.getRow(rowIndex - 1)
          let lastChild = row.getLastChild()
          if(NodeManager.isTextNode(lastChild)) {
            return lastChild
          } else {
            return this.getPrevTextNode(lastChild)
          }
        }
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
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
